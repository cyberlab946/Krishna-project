// CyberLab Supabase configuration
const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';
const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

(function loadCourseFix() {
    function load() {
        if (document.getElementById('stage13CourseLauncher')) return;
        const s = document.createElement('script');
        s.id = 'stage13CourseLauncher';
        s.src = 'stage13-course-launch-fix.js?v=1';
        s.async = false;
        s.onerror = function () { console.error('CyberLab: failed to load unified course launcher.'); };
        document.head.appendChild(s);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, { once: true });
    else load();
    window.addEventListener('load', load, { once: true });
})();
