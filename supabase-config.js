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
    function addStage12() {
        if (document.getElementById('stage12CourseScript')) return;
        const s = document.createElement('script');
        s.id = 'stage12CourseScript';
        s.src = 'stage12-supabase-courses.js?v=2';
        s.async = false;
        s.onload = function () {
            // Give the course cards one more chance after the script is ready.
            setTimeout(function () {
                if (typeof window.stage12ActivateCourses === 'function') {
                    window.stage12ActivateCourses();
                }
            }, 100);
        };
        s.onerror = function () {
            console.error('CyberLab: could not load the expansion course system.');
        };
        document.head.appendChild(s);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addStage12, { once: true });
    } else {
        addStage12();
    }
    window.addEventListener('load', addStage12, { once: true });
})();
