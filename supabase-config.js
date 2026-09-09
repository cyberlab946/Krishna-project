// CyberLab Supabase configuration
// IMPORTANT: Put ONLY your Supabase project URL and publishable key here.
// NEVER put a Supabase service_role/secret key in this file or in browser code.

const SUPABASE_URL = 'https://fnxpempdarqlnfeoudzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__1XTVgh6xSlkhgN9fPfX4Q_BrteZa-E';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
