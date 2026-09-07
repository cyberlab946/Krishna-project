// CyberLab Supabase configuration
// IMPORTANT: Put ONLY your Supabase project URL and publishable key here.
// NEVER put a Supabase service_role/secret key in this file or in browser code.

const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_PUBLISHABLE_KEY = 'YOUR_SUPABASE_PUBLISHABLE_KEY';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
