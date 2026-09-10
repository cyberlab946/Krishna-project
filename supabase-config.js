// CyberLab Supabase configuration
// Only the browser-safe Supabase URL and publishable key belong here.
// NEVER put a service_role or secret key in this public file.

const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';

// Prevent the whole website JavaScript from crashing if the CDN is unavailable.
const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;

// CyberLab course-access fix: turn placeholder cards into usable starter lessons.
(function () {
    const topics = {
        'Python':['Variables and Data Types','Conditions and Loops','Functions','Lists and Dictionaries','Files and Automation'],
        'C':['C Syntax and Variables','Conditions and Loops','Functions and Arrays','Pointers and Memory','Files and System Basics'],
        'C++':['C++ Syntax and Classes','Objects and Encapsulation','STL and Containers','Memory and Pointers','Secure C++ Practices'],
        'Java':['Java Syntax and Types','Classes and Objects','Collections','Exceptions and Files','Secure Java Practices'],
        'JavaScript':['JavaScript Basics','Functions and Events','DOM Manipulation','Async JavaScript','Secure JavaScript'],
        'SQL':['SQL Basics','SELECT and Filtering','JOINs and Aggregation','INSERT UPDATE DELETE','SQL Security'],
        'Penetration Testing':['Authorization and Scope','Reconnaissance','Scanning Concepts','Finding and Prioritizing Weaknesses','Reporting and Remediation'],
        'Web Security':['Web Architecture','Authentication and Sessions','Input Validation','XSS and CSRF','Secure Web APIs'],
        'Digital Forensics':['Evidence and Chain of Custody','Disk and File Artifacts','Logs and Timelines','Memory and Network Evidence','Forensic Reporting'],
        'Cryptography':['Security Goals','Encoding vs Encryption','Symmetric Encryption','Public-Key Cryptography','Hashing and Passwords'],
        'Data Analyst':['Data Collection','Data Cleaning','Exploratory Analysis','Visualization','Communicating Results'],
        'Data Science':['Data Science Workflow','Python Data Handling','Statistics Basics','Machine Learning Concepts','Model Evaluation'],
        'Database & SQL':['Database Concepts','Tables and Relationships','SQL Queries','Indexes and Transactions','Database Security'],
        'Cloud Computing':['Cloud Concepts','Compute and Storage','Networking in Cloud','Identity and Access','Cloud Security'],
        'AI Fundamentals':['What is AI','Machine Learning Basics','Training Data','Neural Network Concepts','Responsible AI'],
        'Nmap Lab':['Nmap and Authorization','Host Discovery','Service Enumeration','Safe Scan Interpretation','Lab Reporting'],
        'CTF Practice':['CTF Rules and Scope','Web Challenges','Linux Challenges','Crypto and Encoding Challenges','Writeups and Lessons Learned']
    };

    function text(course, topic) {
        return `${topic} is an important part of ${course}. Start by understanding the purpose of the topic, the terminology used by professionals, and the problems it is designed to solve. A good learner does not only memorize commands or syntax; they understand why a technique works, when it should be used, and what risks can appear when it is used incorrectly. For example, create a small practice task related to ${topic} inside your own computer, virtual machine, or authorized CyberLab environment. Observe the result, write down what changed, and compare it with the expected behavior. In cybersecurity-related courses, perform testing only against systems you own or have explicit permission to assess. A useful habit is to document assumptions, inputs, outputs, errors, and security implications. After completing this lesson, explain the concept in your own words and identify one practical situation where it would be useful. This builds understanding rather than simple memorization.`;
    }

    function style() {
        if (document.getElementById('cyberlab-extra-style')) return;
        const s = document.createElement('style');
        s.id = 'cyberlab-extra-style';
        s.textContent = `#cyberExtraModal{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:99999;display:none;align-items:center;justify-content:center;padding:16px}#cyberExtraModal.open{display:flex}.cyber-extra-box{width:min(900px,100%);max-height:90vh;overflow:auto;background:#07111f;border:1px solid rgba(0,255,157,.45);border-radius:18px;padding:24px;color:#eef7f4;box-shadow:0 0 40px rgba(0,255,157,.12)}.cyber-extra-head{display:flex;justify-content:space-between;gap:15px;align-items:flex-start}.cyber-extra-close{background:none!important;border:1px solid rgba(255,255,255,.25)!important;color:white!important;font-size:22px!important;padding:4px 10px!important}.cyber-extra-progress{height:10px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden;margin:14px 0}.cyber-extra-fill{height:100%;width:0;background:#00ff9d}.cyber-extra-lesson{padding:18px;border:1px solid rgba(0,255,157,.16);border-radius:14px;background:rgba(255,255,255,.025);margin:15px 0}.cyber-extra-lesson p{line-height:1.75}.cyber-extra-nav{display:flex;gap:10px;flex-wrap:wrap}.cyber-extra-nav button{flex:1;min-width:140px}@media(max-width:600px){.cyber-extra-box{padding:16px}.cyber-extra-head h2{font-size:1.2rem}}`;
        document.head.appendChild(s);
    }

    function modal() {
        let m = document.getElementById('cyberExtraModal');
        if (m) return m;
        m = document.createElement('div'); m.id='cyberExtraModal';
        m.innerHTML='<div class="cyber-extra-box"><div class="cyber-extra-head"><div><h2 id="ceTitle"></h2><p id="ceSub">CyberLab Starter Course</p></div><button class="cyber-extra-close" id="ceClose">×</button></div><div class="cyber-extra-progress"><div id="ceFill" class="cyber-extra-fill"></div></div><p id="ceProgress"></p><div id="ceLesson" class="cyber-extra-lesson"></div><div class="cyber-extra-nav"><button id="cePrev">← Previous</button><button id="ceComplete">✓ Mark Complete</button><button id="ceNext">Next →</button></div></div>';
        document.body.appendChild(m); m.querySelector('#ceClose').onclick=()=>m.classList.remove('open'); return m;
    }

    function openCourse(course) {
        const list = topics[course]; if (!list) return;
        const m=modal(), key='cyberlab_extra_'+course.replace(/\W+/g,'_'), state=JSON.parse(localStorage.getItem(key)||'{"done":[],"n":0}');
        let n=Math.min(state.n||0,list.length-1);
        const render=()=>{const topic=list[n], done=state.done.includes(n), pct=Math.round(state.done.length/list.length*100);m.querySelector('#ceTitle').textContent=course;m.querySelector('#ceProgress').textContent=`Lesson ${n+1} of ${list.length} • ${pct}% complete`;m.querySelector('#ceFill').style.width=pct+'%';m.querySelector('#ceLesson').innerHTML=`<h3>📖 ${topic}</h3><p>${text(course,topic)}</p><p><strong>Example:</strong> Build a small authorized practice exercise for <b>${topic}</b>, record the input and result, and explain why the result occurred.</p><p><strong>Practice:</strong> Repeat the exercise safely, change one variable, and document what you observe.</p>${done?'<p>✅ Lesson completed.</p>':''}`;m.querySelector('#ceComplete').textContent=done?'✓ Completed':'✓ Mark Complete';m.querySelector('#cePrev').disabled=n===0;m.querySelector('#ceNext').disabled=n===list.length-1;};
        m.querySelector('#cePrev').onclick=()=>{n--;state.n=n;localStorage.setItem(key,JSON.stringify(state));render()};m.querySelector('#ceNext').onclick=()=>{n++;state.n=n;localStorage.setItem(key,JSON.stringify(state));render()};m.querySelector('#ceComplete').onclick=()=>{if(!state.done.includes(n))state.done.push(n);state.n=Math.min(n+1,list.length-1);localStorage.setItem(key,JSON.stringify(state));render()};m.classList.add('open');render();
    }

    function activate() {
        style();
        document.querySelectorAll('#courses .dashboard-course button').forEach(btn=>{
            if (!btn.disabled || btn.textContent.trim()!=='Coming Soon') return;
            const card=btn.closest('.dashboard-course'), title=card&&card.querySelector('h4')?card.querySelector('h4').textContent.trim():'';
            if (!topics[title]) return;
            btn.disabled=false; btn.textContent='Start →'; btn.removeAttribute('onclick'); btn.addEventListener('click',()=>openCourse(title));
        });
    }

    if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',activate); else activate();
})();