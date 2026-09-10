document.addEventListener('DOMContentLoaded', async function () {
  const link = document.getElementById('adminLink');
  if (!link || typeof supabaseClient === 'undefined') return;
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const role = session?.user?.app_metadata?.role;
    link.hidden = role !== 'admin';
  } catch (error) {
    link.hidden = true;
    console.warn('Admin link check failed:', error);
  }
});
