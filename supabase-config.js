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
        s.onload = function(){
            if (document.getElementById('stage14ProfessionalUI')) return;
            const ui = document.createElement('script');
            ui.id = 'stage14ProfessionalUI';
            ui.src = 'stage14-professional-ui.js?v=1';
            ui.async = false;
            ui.onload = function(){
                if (document.getElementById('stage15DashboardUpgrade')) return;
                const dash = document.createElement('script');
                dash.id = 'stage15DashboardUpgrade';
                dash.src = 'stage15-dashboard-upgrade.js?v=1';
                dash.async = false;
                document.head.appendChild(dash);
            };
            document.head.appendChild(ui);
        };
        s.onerror = function () { console.error('CyberLab: failed to load course launcher.'); };
        document.head.appendChild(s);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, { once: true });
    else load();
    window.addEventListener('load', load, { once: true });
})();
