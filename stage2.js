// CyberLab Stage 2: real course enrollment and learning progress
(function () {
    const LESSONS = {
        'Cybersecurity Fundamentals': [
            'Introduction to Cybersecurity','CIA Triad','Threats and Vulnerabilities','Authentication and Access Control','Malware and Phishing','Security Controls','Incident Response Basics','Security Best Practices'
        ],
        'Linux & Termux': ['Linux Basics','Files and Directories','Essential Commands','Permissions','Processes','Package Management','Users and Groups','Shell Basics','Networking Commands','Safe Termux Practice'],
        'Networking Fundamentals': ['What is a Network?','IP Addresses','MAC Addresses','TCP and UDP','DNS','HTTP and HTTPS','Routing and Switching','Ports and Services','Network Security Basics'],
        'Ethical Hacking': ['Ethics and Authorization','Security Testing Lifecycle','Reconnaissance Concepts','Scanning Concepts','Vulnerability Assessment','Web Security Basics','Password Security','Social Engineering Awareness','Logging and Evidence','Reporting Findings','Remediation','Final Review'],
        'Wireshark & Traffic Analysis': ['Packet Analysis Basics','Capture Filters','Display Filters','Ethernet and ARP','IP Traffic','TCP Analysis','DNS and HTTP Traffic'],
        'Secure Web Development': ['Security by Design','Input Validation','Output Encoding','Authentication','Session Security','Access Control','Password Security','CSRF and XSS','Secure APIs','Final Security Review']
    };

    function ready() {
        return typeof supabaseClient !== 'undefined' && supabaseClient && typeof currentUser !== 'undefined' && currentUser;
    }

    async function refreshDashboard() {
        if (!ready()) return;
        try {
            const userId = currentUser.id;
            const [{ data: enrollments, error: enrollmentError }, { data: progressRows, error: progressError }, { data: quizRows, error: quizError }, { data: certRows, error: certError }] = await Promise.all([
                supabaseClient.from('enrollments').select('course_id').eq('user_id', userId),
                supabaseClient.from('lesson_progress').select('course_id, lesson_number').eq('user_id', userId),
                supabaseClient.from('quiz_attempts').select('score').eq('user_id', userId),
                supabaseClient.from('certificates').select('id').eq('user_id', userId)
            ]);
            if (enrollmentError || progressError || quizError || certError) return;

            const courseIds = (enrollments || []).map(e => e.course_id);
            const completedCourses = new Set();
            let totalLessons = 0, completedLessons = 0;
            if (courseIds.length) {
                const { data: courses } = await supabaseClient.from('courses').select('id, lesson_count').in('id', courseIds);
                const counts = {};
                (progressRows || []).forEach(row => { counts[row.course_id] = (counts[row.course_id] || 0) + 1; });
                (courses || []).forEach(course => {
                    totalLessons += course.lesson_count;
                    completedLessons += Math.min(counts[course.id] || 0, course.lesson_count);
                    if ((counts[course.id] || 0) >= course.lesson_count) completedCourses.add(course.id);
                });
            }
            const overall = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const progress = document.getElementById('progress');
            const progressText = document.getElementById('progressText');
            const coursesCompleted = document.getElementById('coursesCompleted');
            const quizScore = document.getElementById('quizScore');
            const certificates = document.getElementById('certificates');
            if (progress) progress.style.width = overall + '%';
            if (progressText) progressText.textContent = overall + '%';
            if (coursesCompleted) coursesCompleted.textContent = completedCourses.size;
            if (certificates) certificates.textContent = (certRows || []).length;
            if (quizScore) {
                const scores = (quizRows || []).map(q => q.score);
                quizScore.textContent = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) + '%' : '0';
            }
        } catch (error) { console.warn('Could not load dashboard data:', error); }
    }

    function lessonModal(courseName, courseId, completed) {
        let modal = document.getElementById('courseLessonModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'courseLessonModal';
            modal.className = 'course-lesson-modal';
            document.body.appendChild(modal);
        }
        const lessons = LESSONS[courseName] || [];
        const done = new Set((completed || []).map(Number));
        modal.innerHTML = `<div class="course-lesson-box"><button class="lesson-close" onclick="closeCourseLessons()" aria-label="Close">×</button><p class="section-tag">&gt; COURSE LESSONS</p><h2>${escapeText(courseName)}</h2><p class="lesson-subtitle">Complete each lesson to update your real progress.</p><div class="lesson-list">${lessons.map((title, i) => `<div class="lesson-item ${done.has(i + 1) ? 'completed' : ''}"><span class="lesson-number">${done.has(i + 1) ? '✓' : i + 1}</span><div><strong>${escapeText(title)}</strong><small>${done.has(i + 1) ? 'Completed' : 'Not completed'}</small></div>${done.has(i + 1) ? '<span class="lesson-status">DONE</span>' : `<button onclick="completeLesson('${escapeAttr(courseName)}',${i + 1})">Mark Complete</button>`}</div>`).join('')}</div><div class="lesson-footer"><span>${done.size} / ${lessons.length} lessons completed</span><div class="lesson-progress"><div style="width:${lessons.length ? Math.round(done.size / lessons.length * 100) : 0}%"></div></div></div></div>`;
        modal.classList.add('active');
    }

    window.closeCourseLessons = function () {
        const modal = document.getElementById('courseLessonModal');
        if (modal) modal.classList.remove('active');
    };

    window.startCourse = async function (courseName) {
        if (!ready()) { if (typeof openLogin === 'function') openLogin(); alert('Please log in before starting a course.'); return; }
        try {
            const { data: course, error: courseError } = await supabaseClient.from('courses').select('id, name, lesson_count').eq('name', courseName).single();
            if (courseError || !course) throw courseError || new Error('Course not found. Run supabase-schema.sql first.');
            const { error } = await supabaseClient.from('enrollments').upsert({ user_id: currentUser.id, course_id: course.id }, { onConflict: 'user_id,course_id' });
            if (error) throw error;
            const { data: progressRows } = await supabaseClient.from('lesson_progress').select('lesson_number').eq('user_id', currentUser.id).eq('course_id', course.id);
            lessonModal(course.name, course.id, (progressRows || []).map(r => r.lesson_number));
            await refreshDashboard();
        } catch (error) { alert('Could not start course: ' + (error.message || 'Please run supabase-schema.sql first.')); }
    };

    window.completeLesson = async function (courseName, lessonNumber) {
        if (!ready()) { openLogin(); return false; }
        try {
            const { data: course, error: courseError } = await supabaseClient.from('courses').select('id, lesson_count').eq('name', courseName).single();
            if (courseError || !course) throw courseError || new Error('Course not found');
            const { error } = await supabaseClient.from('lesson_progress').upsert({ user_id: currentUser.id, course_id: course.id, lesson_number: lessonNumber }, { onConflict: 'user_id,course_id,lesson_number' });
            if (error) throw error;
            const { data: progressRows } = await supabaseClient.from('lesson_progress').select('lesson_number').eq('user_id', currentUser.id).eq('course_id', course.id);
            lessonModal(courseName, course.id, (progressRows || []).map(r => r.lesson_number));
            await refreshDashboard();
            return true;
        } catch (error) { alert('Could not save lesson progress: ' + (error.message || 'Check your Supabase policies.')); return false; }
    };

    function escapeText(value) { const d = document.createElement('div'); d.textContent = value; return d.innerHTML; }
    function escapeAttr(value) { return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

    window.addEventListener('load', function () { setTimeout(refreshDashboard, 700); });
})();
