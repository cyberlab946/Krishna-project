// CyberLab Supabase configuration
// Only the browser-safe Supabase URL and publishable key belong here.
// NEVER put a service_role or secret key in this public file.

const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';

// Prevent the whole website JavaScript from crashing if the CDN is unavailable.
const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;

// Load the Supabase-backed expansion course player after the existing course system.
window.addEventListener('load', function () {
    if (document.getElementById('stage12CourseScript')) return;
    const s = document.createElement('script');
    s.id = 'stage12CourseScript';
    s.src = 'stage12-supabase-courses.js?v=1';
    s.async = false;
    document.head.appendChild(s);
});
