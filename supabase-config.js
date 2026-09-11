// CyberLab Supabase configuration
const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';
const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

(function loadCourseFix() {
    function addScript(id, src, next) {
        if (document.getElementById(id)) { if (next) next(); return; }
        const s = document.createElement('script'); s.id = id; s.src = src; s.async = false;
        s.onload = function(){ if(next) next(); };
        s.onerror = function () { console.error('CyberLab: failed to load ' + src); };
        document.head.appendChild(s);
    }
    function load() {
        addScript('stage13CourseLauncher', 'stage13-course-launch-fix.js?v=2', function(){
            addScript('stage14ProfessionalUI', 'stage14-professional-ui.js?v=2', function(){
                addScript('stage16CertificateQR', 'stage16-certificate-qr-fix.js?v=1', function(){
                    addScript('stage17CertificateDownload', 'stage17-certificate-download.js?v=1');
                });
            });
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, { once: true });
    else load();
    window.addEventListener('load', load, { once: true });
})();
