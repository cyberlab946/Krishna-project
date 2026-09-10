const $=id=>document.getElementById(id); const esc=v=>{const d=document.createElement('div');d.textContent=v??'';return d.innerHTML;};
async function loadBadges(){
 if(!supabaseClient)return $('badgeGrid').innerHTML='<p>Supabase is not configured.</p>';
 const {data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return $('badgeGrid').innerHTML='<p>Please log in to view your achievements.</p>';
 try{await supabaseClient.rpc('award_eligible_badges');}catch(e){}
 const [{data:badges,error:bErr},{data:earned,error:eErr}]=await Promise.all([
  supabaseClient.from('badges').select('id,code,name,description,icon').order('id'),
  supabaseClient.from('user_badges').select('badge_id,awarded_at').eq('user_id',session.user.id)
 ]);
 if(bErr||eErr)return $('badgeGrid').innerHTML='<p>Unable to load badges right now.</p>';
 const map=new Map((earned||[]).map(x=>[x.badge_id,x]));
 $('badgeGrid').innerHTML=(badges||[]).map(b=>{const a=map.get(b.id);return `<article class="badge-card ${a?'earned':'locked'}"><div class="badge-icon">${esc(b.icon)}</div><h2>${esc(b.name)}</h2><p>${esc(b.description)}</p><span class="badge-status">${a?'✓ EARNED':'🔒 LOCKED'}</span></article>`}).join('')||'<p>No badges configured yet.</p>';
}
loadBadges();
