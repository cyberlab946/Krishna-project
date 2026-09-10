// CyberLab course button compatibility fix
// Activates all Stage 12 course cards after the course system is available.
(function () {
    const courseNames = [
        'Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL',
        'Penetration Testing', 'Web Security', 'Digital Forensics',
        'Cryptography', 'Data Analyst', 'Data Science', 'Database & SQL',
        'Cloud Computing', 'AI Fundamentals', 'Nmap Lab', 'CTF Practice'
    ];

    function activate() {
        if (typeof window.startCourse !== 'function') return false;
        document.querySelectorAll('#courses .dashboard-course').forEach(function (card) {
            const title = card.querySelector('h4');
            const button = card.querySelector('button');
            if (!title || !button) return;
            const name = title.textContent.trim();
            if (!courseNames.includes(name)) return;

            button.disabled = false;
            button.removeAttribute('disabled');
            button.textContent = name === 'Nmap Lab' ? 'Open Lab →' :
                name === 'CTF Practice' ? 'Start →' : 'Start →';
            button.onclick = function (event) {
                event.preventDefault();
                window.startCourse(name);
            };
        });
        return true;
    }

    function boot() {
        if (activate()) return;
        let tries = 0;
        const timer = setInterval(function () {
            tries++;
            if (activate() || tries >= 30) clearInterval(timer);
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
