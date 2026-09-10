// CyberLab Supabase configuration
// Only the browser-safe Supabase URL and publishable key belong here.
// NEVER put a service_role or secret key in this public file.

const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';

const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;

// Load the expansion course system reliably before/after DOM ready.
// Version bump prevents Chrome from using an older cached copy.
(function loadStage12() {
    function addScript(id, src, onload) {
        if (document.getElementById(id)) return;
        const s = document.createElement('script');
        s.id = id;
        s.src = src;
        s.async = false;
        if (onload) s.onload = onload;
        s.onerror = function () { console.error('CyberLab: failed to load ' + src); };
        document.head.appendChild(s);
    }

    function addStage12() {
        addScript('stage12CourseScript', 'stage12-supabase-courses.js?v=2', function () {
            setTimeout(function () {
                addScript('courseButtonFixScript', 'course-button-fix.js?v=1');
            }, 100);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addStage12, { once: true });
    } else {
        addStage12();
    }
    window.addEventListener('load', addStage12, { once: true });
})();
