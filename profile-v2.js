const profileState={user:null,profile:null,enrollments:[],quizzes:[],certificates:[],courses:[]};
const P=id=>document.getElementById(id);
function safe(v){const d=document.createElement('div');d.textContent=v??'';return d.innerHTML;}
function fmt(date){return date?new Date(date).toLocaleDateString():'';}
async function loadProfile(){
 if(!window.supabase||!supabaseClient){return fail('Supabase is not configured.');}
 const {data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return fail('Please log in to view your profile.');
 profileState.user=session.user;
 const [p,e,q,c,courses]=await Promise.all([
  supabaseClient.from('profiles').select('id,full_name,bio,avatar_emoji,created_at').eq('id',session.user.id).maybeSingle(),
  supabaseClient.from('enrollments').select('course_id,enrolled_at').eq('user_id',session.user.id),
  supabaseClient.from('quiz_attempts').select('course_id,score,attempted_at').eq('user_id',session.user.id).order('attempted_at',{ascending:false}),
  supabaseClient.from('certificates').select('certificate_id,course_id,course_name,quiz_score,issued_at').eq('user_id',session.user.id).order('issued_at',{ascending:false}),
  supabaseClient.from('courses').select('id,name,level,lesson_count').order('id')
 ]);
 const err=[p,e,q,c,courses].find(x=>x.error)?.error;if(err)return fail(err.message);
 profileState.profile=p.data||{full_name:session.user.user_metadata?.full_name||'CyberLab Student',bio:'CyberLab student',avatar_emoji:'🧑‍💻'};
 profileState.enrollments=e.data||[];profileState.quizzes=q.data||[];profileState.certificates=c.data||[];profileState.courses=courses.data||[];
 renderProfile();
}
function courseName(id){return profileState.courses.find(c=>String(c.id)===String(id))?.name||'Course';}
function renderProfile(){
 const p=profileState.profile;
 P('avatar').textContent=p.avatar_emoji||'🧑‍💻';P('profileName').textContent=p.full_name||'CyberLab Student';P('profileEmail').textContent=profileState.user.email||'';P('bio').textContent=p.bio||'No bio added yet.';P('joined').textContent='Member since '+fmt(p.created_at||profileState.user.created_at);
 P('enrollmentCount').textContent=profileState.enrollments.length;P('quizCount').textContent=profileState.quizzes.length;P('certificateCount').textContent=profileState.certificates.length;
 P('nameInput').value=p.full_name||'';P('bioInput').value=p.bio||'';P('avatarInput').value=p.avatar_emoji||'🧑‍💻';
 P('courseHistory').innerHTML=profileState.enrollments.length?profileState.enrollments.map(e=>'<div class="history-item"><strong>'+safe(courseName(e.course_id))+'</strong><small>Enrolled '+fmt(e.enrolled_at)+'</small></div>').join(''):'<p class="empty">No enrolled courses yet.</p>';
 P('quizHistory').innerHTML=profileState.quizzes.length?profileState.quizzes.slice(0,10).map(q=>'<div class="history-item"><strong>'+safe(courseName(q.course_id))+' — '+q.score+'%</strong><small>Attempted '+fmt(q.attempted_at)+'</small></div>').join(''):'<p class="empty">No quiz attempts yet.</p>';
 P('certificateHistory').innerHTML=profileState.certificates.length?profileState.certificates.map(c=>'<div class="history-item"><strong>'+safe(c.course_name||courseName(c.course_id))+'</strong><small>'+safe(c.certificate_id)+' · '+c.quiz_score+'% · Issued '+fmt(c.issued_at)+'</small></div>').join(''):'<p class="empty">No certificates yet.</p>';
}
P('profileForm').onsubmit=async e=>{e.preventDefault();const name=P('nameInput').value.trim(),bio=P('bioInput').value.trim(),avatar=P('avatarInput').value.trim();if(name.length<2)return P('message').textContent='Name must contain at least 2 characters.';if(bio.length>300)return P('message').textContent='Bio must be 300 characters or less.';P('message').textContent='Saving...';
 const auth=await supabaseClient.auth.updateUser({data:{full_name:name}});if(auth.error)return P('message').textContent=auth.error.message;
 const result=await supabaseClient.from('profiles').upsert({id:profileState.user.id,full_name:name,bio,avatar_emoji:avatar||'🧑‍💻',updated_at:new Date().toISOString()},{onConflict:'id'});if(result.error)return P('message').textContent=result.error.message;P('message').textContent='Profile saved successfully.';await loadProfile();};
P('logoutBtn').onclick=async()=>{await supabaseClient.auth.signOut();location.href='index.html';};
function fail(text){document.body.innerHTML='<main class="profile-shell"><div class="profile-card"><h1>Profile</h1><p>'+safe(text)+'</p><a class="back-link" href="index.html">← Back to CyberLab</a></div></main>';}
loadProfile();
