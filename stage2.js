// CyberLab Stage 2: real course enrollment and learning progress
(function () {
    function ready() {
        return typeof supabaseClient !== 'undefined' && supabaseClient &&
            typeof currentUser !== 'undefined' && currentUser;
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

            if (enrollmentError || progressError || quizError || certError) {
                console.warn('Stage 2 database is not ready. Run supabase-schema.sql in Supabase SQL Editor.');
                return;
            }

            const courseIds = (enrollments || []).map(e => e.course_id);
            const completedCourses = new Set();
            let totalLessons = 0;
            let completedLessons = 0;

            if (courseIds.length) {
                const { data: courses } = await supabaseClient.from('courses').select('id, lesson_count').in('id', courseIds);
                const counts = {};
                (progressRows || []).forEach(row => {
                    counts[row.course_id] = (counts[row.course_id] || 0) + 1;
                });
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
        } catch (error) {
            console.warn('Could not load Stage 2 dashboard data:', error);
        }
    }

    window.startCourse = async function (courseName) {
        if (!ready()) {
            if (typeof openLogin === 'function') openLogin();
            alert('Please log in before starting a course.');
            return;
        }

        try {
            const { data: course, error: courseError } = await supabaseClient
                .from('courses').select('id, name, lesson_count').eq('name', courseName).single();
            if (courseError || !course) throw courseError || new Error('Course not found');

            const { error } = await supabaseClient.from('enrollments').upsert({
                user_id: currentUser.id,
                course_id: course.id
            }, { onConflict: 'user_id,course_id' });

            if (error) throw error;
            await refreshDashboard();
            alert('Enrolled in ' + course.name + '! Your progress will now be tracked.');
        } catch (error) {
            alert('Could not enroll: ' + (error.message || 'Please run supabase-schema.sql first.'));
        }
    };

    // Expose a safe way for future lesson pages to mark a lesson complete.
    window.completeLesson = async function (courseName, lessonNumber) {
        if (!ready()) return false;
        const { data: course, error: courseError } = await supabaseClient.from('courses').select('id').eq('name', courseName).single();
        if (courseError || !course) return false;
        const { error } = await supabaseClient.from('lesson_progress').upsert({
            user_id: currentUser.id,
            course_id: course.id,
            lesson_number: lessonNumber
        }, { onConflict: 'user_id,course_id,lesson_number' });
        if (!error) await refreshDashboard();
        return !error;
    };

    window.addEventListener('load', function () {
        setTimeout(refreshDashboard, 700);
    });
})();
