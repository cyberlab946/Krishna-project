// CyberLab Stage 12 - Supabase-backed expansion courses
(function () {
    const COURSES = {
        'Python': {
            level: 'Beginner',
            lessons: ['Variables and Data Types','Conditions and Loops','Functions','Lists and Dictionaries','Files and Automation'],
            description: 'Python programming foundations for automation, scripting and security learning.'
        },
        'C': {
            level: 'Beginner',
            lessons: ['C Syntax and Variables','Conditions and Loops','Functions and Arrays','Pointers and Memory','Files and System Basics'],
            description: 'C programming foundations with memory and system concepts.'
        },
        'C++': {
            level: 'Beginner',
            lessons: ['C++ Syntax and Classes','Objects and Encapsulation','STL and Containers','Memory and Pointers','Secure C++ Practices'],
            description: 'C++ programming, object-oriented design and safe coding fundamentals.'
        },
        'Java': {
            level: 'Beginner',
            lessons: ['Java Syntax and Types','Classes and Objects','Collections','Exceptions and Files','Secure Java Practices'],
            description: 'Java programming fundamentals and secure application practices.'
        },
        'JavaScript': {
            level: 'Beginner',
            lessons: ['JavaScript Basics','Functions and Events','DOM Manipulation','Async JavaScript','Secure JavaScript'],
            description: 'JavaScript fundamentals for interactive and safer web applications.'
        },
        'SQL': {
            level: 'Beginner',
            lessons: ['SQL Basics','SELECT and Filtering','JOINs and Aggregation','INSERT UPDATE DELETE','SQL Security'],
            description: 'SQL queries, relational data and database security fundamentals.'
        },
        'Penetration Testing': {
            level: 'Intermediate',
            lessons: ['Authorization and Scope','Reconnaissance','Scanning Concepts','Finding and Prioritizing Weaknesses','Reporting and Remediation'],
            description: 'Structured penetration-testing methodology for authorized lab environments.'
        },
        'Web Security': {
            level: 'Intermediate',
            lessons: ['Web Architecture','Authentication and Sessions','Input Validation','XSS and CSRF','Secure Web APIs'],
            description: 'Common web security risks and defensive development techniques.'
        },
        'Digital Forensics': {
            level: 'Intermediate',
            lessons: ['Evidence and Chain of Custody','Disk and File Artifacts','Logs and Timelines','Memory and Network Evidence','Forensic Reporting'],
            description: 'Digital evidence handling, artifact analysis and forensic reporting.'
        },
        'Cryptography': {
            level: 'Intermediate',
            lessons: ['Security Goals','Encoding vs Encryption','Symmetric Encryption','Public-Key Cryptography','Hashing and Passwords'],
            description: 'Core cryptography concepts, encryption, public keys and hashing.'
        },
        'Data Analyst': {
            level: 'Beginner',
            lessons: ['Data Collection','Data Cleaning','Exploratory Analysis','Visualization','Communicating Results'],
            description: 'Data analysis workflow, cleaning, exploration and visualization.'
        },
        'Data Science': {
            level: 'Beginner',
            lessons: ['Data Science Workflow','Python Data Handling','Statistics Basics','Machine Learning Concepts','Model Evaluation'],
            description: 'Foundations of data science, statistics and machine learning.'
        },
        'Database & SQL': {
            level: 'Beginner',
            lessons: ['Database Concepts','Tables and Relationships','SQL Queries','Indexes and Transactions','Database Security'],
            description: 'Relational database concepts, SQL and database security.'
        },
        'Cloud Computing': {
            level: 'Beginner',
            lessons: ['Cloud Concepts','Compute and Storage','Networking in Cloud','Identity and Access','Cloud Security'],
            description: 'Cloud infrastructure concepts with identity and security fundamentals.'
        },
        'AI Fundamentals': {
            level: 'Beginner',
            lessons: ['What is AI','Machine Learning Basics','Training Data','Neural Network Concepts','Responsible AI'],
            description: 'An introduction to artificial intelligence and responsible AI concepts.'
        },
        'Nmap Lab': {
            level: 'Intermediate',
            lessons: ['Nmap and Authorization','Host Discovery','Service Enumeration','Safe Scan Interpretation','Lab Reporting'],
            description: 'Authorized Nmap practice for network discovery and service identification.'
        },
        'CTF Practice': {
            level: 'Intermediate',
            lessons: ['CTF Rules and Scope','Web Challenges','Linux Challenges','Crypto and Encoding Challenges','Writeups and Lessons Learned'],
            description: 'Controlled Capture-the-Flag practice with safe challenge-solving skills.'
        }
    };

    const QUIZ = {
        'Python': [['Which keyword defines a Python function?',['def','func','function','define'],'A'],['Which type stores ordered mutable items?',['list','tuple','set','int'],'A'],['What is a safe place to practice scripts?',['Your own lab environment','A random public server','Someone else\'s account','An unknown website'],'A']],
        'C': [['Which symbol ends a normal C statement?',[';','.',':',','],'A'],['What does a pointer store?',['An address','Only text','A loop','A file name'],'A'],['Where should system-level experiments be performed?',['An authorized lab','A stranger\'s computer','A public server','A stolen account'],'A']],
        'C++': [['Which feature supports object-oriented programming?',['Classes','Only macros','Only comments','HTML tags'],'A'],['Which container stores a dynamic sequence?',['vector','window','socket','header'],'A'],['What is important when using raw memory?',['Bounds and lifetime safety','Ignoring errors','Removing validation','Using unknown pointers'],'A']],
        'Java': [['Which keyword creates a class?',['class','object','newclass','type'],'A'],['Which structure stores key-value pairs?',['Map','Loop','Thread','Package'],'A'],['What is a secure practice for exceptions?',['Handle errors without leaking sensitive data','Print passwords','Ignore all errors','Expose stack traces publicly'],'A']],
        'JavaScript': [['Which keyword declares a block-scoped variable?',['let','varx','define','newvar'],'A'],['What does the DOM represent?',['The document structure','A database password','A network cable','A compiler'],'A'],['What helps reduce XSS risk?',['Context-appropriate output encoding','Trusting all HTML','Disabling backups','Putting secrets in URLs'],'A']],
        'SQL': [['Which command retrieves rows?',['SELECT','PULL','GETROWS','READTABLE'],'A'],['What combines related rows from tables?',['JOIN','MERGEFILE','CONNECT','LINK'],'A'],['What helps prevent SQL injection?',['Parameterized queries','String concatenation of input','Disabling logs','Using plaintext passwords'],'A']],
        'Penetration Testing': [['What must exist before a penetration test?',['Permission and scope','A guessed password','A public target','An anonymous account'],'A'],['Why perform reconnaissance?',['To understand the authorized target','To steal data','To bypass permission','To publish secrets'],'A'],['What should a final report contain?',['Evidence, risk and remediation','Only attack commands','Unverified accusations','Private unrelated data'],'A']],
        'Web Security': [['Where should authorization be enforced?',['Server-side','Only in CSS','Only by hiding a button','Only in a comment'],'A'],['What is a common XSS defense?',['Output encoding','Plaintext passwords','Open redirects everywhere','Trusting browser input'],'A'],['What helps protect sessions?',['Secure cookie settings and server-side checks','Putting tokens in page titles','Sharing session IDs','Disabling authentication'],'A']],
        'Digital Forensics': [['Why is chain of custody important?',['To document evidence handling','To change evidence','To delete logs','To skip authorization'],'A'],['What can a timeline help show?',['The sequence of events','A password','A firewall rule only','A programming syntax'],'A'],['What should forensic reporting be?',['Accurate and reproducible','Speculative','Secretly edited','Based only on guesses'],'A']],
        'Cryptography': [['What does encryption primarily provide?',['Confidentiality when correctly used','Guaranteed anonymity','Automatic authorization','Faster CPU speed'],'A'],['What is hashing normally used for?',['One-way integrity or password-verification purposes','Reversible storage of plaintext','Network routing','Screen rendering'],'A'],['What is a public key used with?',['Public-key cryptography','File deletion','CSS styling','CPU scheduling'],'A']],
        'Data Analyst': [['What is data cleaning?',['Fixing quality issues in data','Deleting every row','Encrypting a network','Compiling code'],'A'],['What does visualization help with?',['Communicating patterns','Changing passwords','Creating accounts','Routing packets'],'A'],['Why document analysis steps?',['For reproducibility and clarity','To hide mistakes','To remove evidence','To avoid validation'],'A']],
        'Data Science': [['What is a model trained from?',['Data and a learning procedure','Only a password','A web page title','A MAC address'],'A'],['Why split datasets?',['To evaluate generalization','To make files larger','To disable statistics','To remove all features'],'A'],['What is overfitting?',['A model learning training data too specifically','A network outage','A database backup','A compiler warning'],'A']],
        'Database & SQL': [['What is a table made of?',['Rows and columns','Only images','Only passwords','Network packets'],'A'],['What is an index for?',['Improving lookup performance when appropriate','Replacing authentication','Encrypting every password','Rendering HTML'],'A'],['What is least privilege in a database?',['Granting only required permissions','Giving every user admin access','Sharing one password','Disabling audit logs'],'A']],
        'Cloud Computing': [['What is cloud computing?',['On-demand computing resources delivered as a service','Only local storage','A programming language','A firewall rule'],'A'],['What controls cloud access?',['Identity and access management','CSS','Screen brightness','HTML comments'],'A'],['Why protect cloud credentials?',['They can grant access to resources','They only affect colors','They are harmless','They cannot be reused'],'A']],
        'AI Fundamentals': [['What is machine learning?',['Learning patterns from data','Only writing HTML','Routing packets','Compressing passwords'],'A'],['Why is training data important?',['It influences model behavior and quality','It only changes colors','It disables CPUs','It replaces authentication'],'A'],['What is responsible AI concerned with?',['Safety, fairness, privacy and accountability','Only speed','Only screen size','Only file names'],'A']],
        'Nmap Lab': [['What is required before scanning a target?',['Authorization','A random IP','A guessed password','A public Wi-Fi name'],'A'],['What can service detection help identify?',['Services and versions exposed by a host','Private passwords','User emotions','Browser themes'],'A'],['Where should Nmap practice occur?',['An authorized lab','Random Internet targets','Someone else\'s server','Unknown devices'],'A']],
        'CTF Practice': [['What is the first CTF rule?',['Follow the challenge scope and rules','Attack anything online','Steal real credentials','Ignore instructions'],'A'],['What is a writeup useful for?',['Explaining the solution and lessons learned','Publishing secrets','Hiding evidence','Changing challenge rules'],'A'],['Where should unsafe techniques be practiced?',['Only in authorized labs','Against random targets','On public infrastructure','On other students\' accounts'],'A']]
    };

    function ready() {
        return typeof supabaseClient !== 'undefined' && supabaseClient && typeof currentUser !== 'undefined' && currentUser;
    }

    function esc(v) {
        const d = document.createElement('div');
        d.textContent = String(v == null ? '' : v);
        return d.innerHTML;
    }

    function safeName(v) {
        return String(v).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function lessonText(course, topic) {
        return `${topic} is a core topic in ${course}. Begin with the terminology and understand what the concept is designed to accomplish. Then connect the idea to a small, controlled exercise in your own computer, virtual machine, or authorized CyberLab environment. A useful learning method is to make one change at a time, observe the result, and write down why it happened. For programming and data topics, focus on inputs, outputs, data types, errors, and maintainable structure. For cybersecurity topics, focus on assets, trust boundaries, security controls, evidence, and safe testing. Never use security techniques against systems you do not own or have explicit permission to test. After the exercise, review the result and identify one common mistake and one defensive or best-practice approach. This turns the lesson from memorization into practical understanding and gives you a reusable mental model for future projects.`;
    }

    async function getCourse(name) {
        const r = await supabaseClient.from('courses').select('id,name,level,lesson_count,description').eq('name', name).single();
        if (r.error) throw r.error;
        return r.data;
    }

    async function getProgress(courseId) {
        const r = await supabaseClient.from('lesson_progress').select('lesson_number').eq('user_id', currentUser.id).eq('course_id', courseId).order('lesson_number');
        if (r.error) throw r.error;
        return (r.data || []).map(x => Number(x.lesson_number));
    }

    async function enroll(courseId) {
        const r = await supabaseClient.from('enrollments').upsert({user_id: currentUser.id, course_id: courseId}, {onConflict:'user_id,course_id'});
        if (r.error) throw r.error;
    }

    function styles() {
        if (document.getElementById('stage12-style')) return;
        const s = document.createElement('style');
        s.id = 'stage12-style';
        s.textContent = '#stage12Modal{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.86);display:none;align-items:center;justify-content:center;padding:12px}#stage12Modal.active{display:flex}.s12-box{width:min(1000px,100%);max-height:94vh;overflow:auto;background:#07111f;color:#eef7f4;border:1px solid rgba(0,255,157,.4);border-radius:18px;padding:22px;box-shadow:0 0 45px rgba(0,255,157,.12)}.s12-head{display:flex;justify-content:space-between;gap:15px}.s12-head h2{margin:0 0 5px}.s12-close{font-size:24px!important;padding:5px 12px!important}.s12-bar{height:11px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden;margin:15px 0}.s12-fill{height:100%;width:0;background:#00ff9d;transition:width .25s}.s12-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(220px,1fr);gap:18px}.s12-card{background:rgba(255,255,255,.025);border:1px solid rgba(0,255,157,.16);border-radius:14px;padding:17px;margin-bottom:16px}.s12-card h3{margin-top:0}.s12-lesson{display:flex;align-items:center;gap:10px;width:100%;text-align:left;margin:7px 0;padding:12px;border-radius:10px;background:rgba(255,255,255,.04);color:inherit;border:1px solid rgba(255,255,255,.08);cursor:pointer}.s12-lesson.done{border-color:rgba(0,255,157,.5)}.s12-content{line-height:1.75}.s12-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}.s12-actions button{flex:1;min-width:130px}.s12-quiz label{display:block;padding:8px 0}.s12-quiz input{margin-right:8px}.s12-result{padding:12px;border-radius:10px;margin-top:12px}.s12-pass{border:1px solid #00ff9d}.s12-fail{border:1px solid #ff6b6b}.s12-muted{opacity:.75}@media(max-width:720px){.s12-box{padding:14px}.s12-grid{grid-template-columns:1fr}.s12-head h2{font-size:1.2rem}}
';
        document.head.appendChild(s);
    }

    function modal() {
        let m = document.getElementById('stage12Modal');
        if (m) return m;
        m = document.createElement('div');
        m.id = 'stage12Modal';
        m.innerHTML = '<div class="s12-box"><div class="s12-head"><div><h2 id="s12Title"></h2><p id="s12Sub" class="s12-muted"></p></div><button class="s12-close" id="s12Close">×</button></div><div class="s12-bar"><div id="s12Fill" class="s12-fill"></div></div><p id="s12Pct"></p><div class="s12-grid"><main><div class="s12-card"><h3>📚 Lessons</h3><div id="s12Lessons"></div></div><div class="s12-card s12-quiz"><h3>🧠 Course Quiz</h3><p class="s12-muted">You need 70% or higher. Attempts are saved to Supabase.</p><div id="s12Quiz"></div><button id="s12Submit">Submit Quiz</button><div id="s12Feedback"></div></div><div class="s12-card"><h3>🏆 Certificate</h3><p id="s12CertMsg">Complete all lessons and pass the quiz with 70% or higher.</p><button id="s12Cert" disabled>Generate Certificate</button></div></main><aside><div class="s12-card"><h3>Course Status</h3><p id="s12Status">Loading...</p><p><b id="s12Done">0</b> / <span id="s12Total">0</span> lessons</p><p>Quiz questions: <b id="s12QCount">0</b></p><p class="s12-muted">Progress is stored in your CyberLab Supabase account.</p></div></aside></div></div>';
        document.body.appendChild(m);
        m.querySelector('#s12Close').onclick = () => m.classList.remove('active');
        return m;
    }

    async function openCourse(name) {
        if (!ready()) {
            if (typeof openLogin === 'function') openLogin();
            alert('Please log in before starting a course.');
            return;
        }
        const def = COURSES[name];
        if (!def) return;
        try {
            const course = await getCourse(name);
            await enroll(course.id);
            const done = await getProgress(course.id);
            styles();
            const m = modal();
            m.dataset.courseId = course.id;
            m.dataset.courseName = name;
            m.classList.add('active');
            render(m, course, def, done);
        } catch (e) {
            alert('Could not open ' + name + ': ' + (e.message || 'Check the Supabase course migration and policies.'));
        }
    }

    async function render(m, course, def, done) {
        const pct = Math.round(done.length / def.lessons.length * 100);
        m.querySelector('#s12Title').textContent = course.name;
        m.querySelector('#s12Sub').textContent = `${course.level} • ${course.description || def.description}`;
        m.querySelector('#s12Pct').textContent = `${pct}% complete`;
        m.querySelector('#s12Fill').style.width = pct + '%';
        m.querySelector('#s12Done').textContent = done.length;
        m.querySelector('#s12Total').textContent = def.lessons.length;
        m.querySelector('#s12QCount').textContent = (QUIZ[course.name] || []).length;
        m.querySelector('#s12Status').textContent = done.length === def.lessons.length ? 'All lessons completed' : 'In progress';
        m.querySelector('#s12Lessons').innerHTML = def.lessons.map((topic, i) => {
            const n = i + 1, isDone = done.includes(n);
            return `<button class="s12-lesson ${isDone ? 'done' : ''}" data-n="${n}"><b>${isDone ? '✓' : n}</b><span><strong>${esc(topic)}</strong><br><small>${isDone ? 'Completed' : 'Open lesson'}</small></span></button><div id="s12Lesson${n}" class="s12-content" style="display:none"></div>`;
        }).join('');
        m.querySelectorAll('.s12-lesson').forEach(btn => btn.addEventListener('click', () => showLesson(m, course, def, done, Number(btn.dataset.n))));
        renderQuiz(m, QUIZ[course.name] || []);
        m.querySelector('#s12Submit').onclick = () => submitQuiz(m, course, def);
        m.querySelector('#s12Cert').onclick = () => generateCertificate(m, course, def);
        await updateCertificateState(m, course, def, done);
    }

    function showLesson(m, course, def, done, n) {
        const box = m.querySelector('#s12Lesson' + n);
        if (!box) return;
        const topic = def.lessons[n - 1];
        document.querySelectorAll('#stage12Modal .s12-content').forEach(x => { if (x !== box) x.style.display = 'none'; });
        if (box.style.display === 'block') { box.style.display = 'none'; return; }
        box.innerHTML = `<p><strong>📖 ${esc(topic)}</strong></p><p>${esc(lessonText(course.name, topic))}</p><p><b>Example:</b> Create a small authorized practice exercise for <b>${esc(topic)}</b>. Record the input, expected result, actual result, and one security or quality observation.</p><p><b>Practice:</b> Change one variable, repeat the exercise, and explain the difference. Keep all security testing inside your own or explicitly authorized lab.</p><button class="s12-mark" ${done.includes(n) ? 'disabled' : ''}>${done.includes(n) ? '✓ Completed' : 'Mark Complete'}</button>`;
        box.style.display = 'block';
        const mark = box.querySelector('.s12-mark');
        if (mark && !done.includes(n)) mark.onclick = async () => {
            mark.disabled = true;
            mark.textContent = 'Saving...';
            try {
                const r = await supabaseClient.from('lesson_progress').upsert({user_id: currentUser.id, course_id: course.id, lesson_number:n}, {onConflict:'user_id,course_id,lesson_number'});
                if (r.error) throw r.error;
                const fresh = await getProgress(course.id);
                await render(m, course, def, fresh);
                if (typeof refresh === 'function') await refresh();
            } catch (e) {
                mark.disabled = false;
                mark.textContent = 'Mark Complete';
                alert('Could not save lesson progress: ' + (e.message || 'Check Supabase policies.'));
            }
        };
    }

    function renderQuiz(m, qs) {
        m.querySelector('#s12Quiz').innerHTML = qs.map((q, i) => `<div><h4>${i + 1}. ${esc(q[0])}</h4>${q[1].map((a,j) => `<label><input type="radio" name="s12q${i}" value="${String.fromCharCode(65+j)}"><span>${esc(a)}</span></label>`).join('')}</div>`).join('');
        m.querySelector('#s12Feedback').innerHTML = '';
    }

    async function submitQuiz(m, course, def) {
        const qs = QUIZ[course.name] || [];
        if (!qs.length) return;
        let score = 0;
        for (let i = 0; i < qs.length; i++) {
            const chosen = m.querySelector(`input[name="s12q${i}"]:checked`);
            if (!chosen) { alert('Please answer all quiz questions.'); return; }
            if (chosen.value === qs[i][2]) score++;
        }
        const pct = Math.round(score / qs.length * 100);
        const r = await supabaseClient.from('quiz_attempts').insert({user_id:currentUser.id, course_id:course.id, score:pct});
        if (r.error) { alert('Could not save quiz attempt: ' + r.error.message); return; }
        m.querySelector('#s12Feedback').innerHTML = `<div class="s12-result ${pct >= 70 ? 's12-pass' : 's12-fail'}"><b>${pct >= 70 ? '✓ Quiz Passed' : '✗ Quiz Not Passed'}</b><br>Score: ${pct}% (${score}/${qs.length})</div>`;
        const done = await getProgress(course.id);
        await updateCertificateState(m, course, def, done, pct);
        if (typeof refresh === 'function') await refresh();
    }

    async function latestQuiz(courseId) {
        const r = await supabaseClient.from('quiz_attempts').select('score,attempted_at').eq('user_id',currentUser.id).eq('course_id',courseId).order('attempted_at',{ascending:false}).limit(1);
        if (r.error) throw r.error;
        return r.data && r.data[0] ? Number(r.data[0].score) : 0;
    }

    async function updateCertificateState(m, course, def, done, knownScore) {
        const score = knownScore == null ? await latestQuiz(course.id) : knownScore;
        const readyForCert = done.length >= def.lessons.length && score >= 70;
        m.querySelector('#s12Cert').disabled = !readyForCert;
        m.querySelector('#s12CertMsg').textContent = readyForCert ? `Congratulations! Course complete and latest quiz score is ${score}%.` : `Finish all ${def.lessons.length} lessons and pass the quiz with 70% or higher. Latest quiz: ${score}%.`;
    }

    async function generateCertificate(m, course, def) {
        try {
            const done = await getProgress(course.id);
            const score = await latestQuiz(course.id);
            if (done.length < def.lessons.length || score < 70) { alert('Complete all lessons and pass the quiz with 70% or higher.'); return; }
            const certificateId = 'CL-' + course.id + '-' + currentUser.id.slice(0,8).toUpperCase();
            const r = await supabaseClient.from('certificates').upsert({user_id:currentUser.id,course_id:course.id,certificate_id:certificateId},{onConflict:'user_id,course_id'});
            if (r.error) throw r.error;
            const student = (currentUser.user_metadata && currentUser.user_metadata.full_name) || currentUser.email || 'CyberLab Student';
            const w = window.open('', '_blank');
            if (!w) { alert('Allow pop-ups to generate your certificate.'); return; }
            w.document.write(`<!doctype html><html><head><title>CyberLab Certificate</title><style>body{font-family:Arial;background:#07111f;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh}.cert{width:80%;padding:65px;text-align:center;background:#0a1625;color:white;border:6px solid #00ff9d;outline:2px solid #00ff9d;outline-offset:-20px}.brand,.course{color:#00ff9d}.tag{letter-spacing:5px}.name{font-size:42px}.course{font-size:30px}.id{margin-top:30px;color:#9aa8bb}@media print{body{background:white}.cert{background:white;color:black}.brand,.course{color:black}}</style></head><body><div class="cert"><div class="brand">&lt;CyberLab/&gt;</div><p class="tag">CERTIFICATE OF COMPLETION</p><h1 class="name">${esc(student)}</h1><p>has successfully completed</p><h2 class="course">${esc(course.name)}</h2><p>and passed the CyberLab knowledge assessment with <b>${score}%</b>.</p><p class="id">Certificate ID: ${certificateId}<br>Issued: ${new Date().toLocaleDateString()}</p><p>Learn • Practice • Build • Secure 🔐</p></div><script>setTimeout(()=>window.print(),600)<\\/script></body></html>`);
            w.document.close();
            if (typeof refresh === 'function') await refresh();
        } catch (e) { alert('Certificate error: ' + (e.message || 'Please try again.')); }
    }

    function activateCards() {
        Object.keys(COURSES).forEach(name => {
            document.querySelectorAll('#courses .dashboard-course').forEach(card => {
                const h = card.querySelector('h4');
                const btn = card.querySelector('button');
                if (!h || !btn || h.textContent.trim() !== name) return;
                btn.disabled = false;
                btn.textContent = btn.textContent.includes('Lab') || name.includes('Lab') || name === 'CTF Practice' ? (name.includes('Lab') ? 'Open Lab →' : 'Start →') : 'Start →';
                btn.onclick = () => openCourse(name);
            });
        });
    }

    window.startCourse = function (name) {
        if (COURSES[name]) return openCourse(name);
        alert('Course is not configured: ' + name);
    };

    function init() {
        styles();
        activateCards();
        setTimeout(activateCards, 800);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
