const state={user:null,courses:[],profiles:[],enrollments:[],progress:[],quizzes:[],certificates:[]};
const $=id=>document.getElementById(id);
function esc(v){const d=document.createElement('div');d.textContent=v==null?'':String(v);return d.innerHTML;}
function msg(text){$('formMessage').textContent=text||'';}
async function init(){
 if(!window.supabase||!supabaseClient){return deny('Supabase is not configured.');}
 const {data:{session}}=await supabaseClient.auth.getSession();
 if(!session){return deny('Please log in to a CyberLab administrator account.');}
 state.user=session.user;$('adminEmail').textContent=session.user.email||'';
 const {data:profile}=await supabaseClient.from('profiles').select('full_name').eq('id',session.user.id).maybeSingle();
 const {data:{user}}=await supabaseClient.auth.getUser();
 const role=user?.app_metadata?.role;
 if(role!=='admin'){return deny('Access denied. This account is not a CyberLab administrator.');}
 $('accessState').hidden=true;$('dashboard').hidden=false;await loadAll();
}
function deny(text){$('accessState').innerHTML='<h1>🔒 Admin Access Required</h1><p>'+esc(text)+'</p><p><a class="back" href="index.html">← Back to CyberLab</a></p>';}
async function loadAll(){
 const queries=await Promise.all([
  supabaseClient.from('profiles').select('id,full_name,created_at').order('created_at',{ascending:false}),
  supabaseClient.from('courses').select('id,name,level,lesson_count,description,created_at').order('id'),
  supabaseClient.from('enrollments').select('user_id,course_id,enrolled_at'),
  supabaseClient.from('lesson_progress').select('user_id,course_id,lesson_number,completed_at'),
  supabaseClient.from('quiz_attempts').select('id,user_id,course_id,score,attempted_at').order('attempted_at',{ascending:false}).limit(100),
  supabaseClient.from('certificates').select('certificate_id,user_id,course_id,student_name,course_name,quiz_score,issued_at').order('issued_at',{ascending:false})
 ]);
 const error=queries.find(x=>x.error)?.error;if(error){alert('Admin data error: '+error.message);return;}
 [state.profiles,state.courses,state.enrollments,state.progress,state.quizzes,state.certificates]=queries.map(x=>x.data||[]);render();
}
function nameOf(id){return state.profiles.find(p=>p.id===id)?.full_name||'Student';}
function courseOf(id){return state.courses.find(c=>String(c.id)===String(id))?.name||'Course';}
function render(){
 $('stats').innerHTML=[['Students',state.profiles.length],['Courses',state.courses.length],['Quiz Attempts',state.quizzes.length],['Certificates',state.certificates.length]].map(x=>'<div class="stat"><strong>'+x[1]+'</strong><span>'+x[0]+'</span></div>').join('');
 $('students').innerHTML=table(['Student','Joined','Enrollments','Certificates'],state.profiles.map(p=>[esc(p.full_name||'Student'),new Date(p.created_at).toLocaleDateString(),state.enrollments.filter(e=>e.user_id===p.id).length,state.certificates.filter(c=>c.user_id===p.id).length]));
 $('courses').innerHTML=table(['Course','Level','Lessons','Action'],state.courses.map(c=>[esc(c.name),esc(c.level),c.lesson_count,'<button class="ghost" onclick="editCourse('+c.id+')">Edit</button> <button class="ghost" onclick="deleteCourse('+c.id+')">Delete</button>']));
 $('quizzes').innerHTML=table(['Student','Course','Score','Attempted'],state.quizzes.map(q=>[esc(nameOf(q.user_id)),esc(courseOf(q.course_id)),q.score+'%',new Date(q.attempted_at).toLocaleString()]));
 $('certificates').innerHTML=table(['Certificate ID','Student','Course','Score','Issued'],state.certificates.map(c=>[esc(c.certificate_id),esc(c.student_name||nameOf(c.user_id)),esc(c.course_name||courseOf(c.course_id)),esc(c.quiz_score)+'%',new Date(c.issued_at).toLocaleDateString()]));
}
function table(headers,rows){if(!rows.length)return '<p class="muted">No records yet.</p>';return '<table><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table>';}
function openModal(course){$('courseModal').hidden=false;$('modalTitle').textContent=course?'Edit Course':'Add Course';$('courseId').value=course?.id||'';$('courseName').value=course?.name||'';$('courseLevel').value=course?.level||'Beginner';$('lessonCount').value=course?.lesson_count||1;$('courseDescription').value=course?.description||'';msg('');}
window.editCourse=id=>openModal(state.courses.find(c=>c.id===id));
async function deleteCourse(id){if(!confirm('Delete this course? Related enrollments/progress may also be removed by database foreign keys.'))return;const {error}=await supabaseClient.from('courses').delete().eq('id',id);if(error)alert(error.message);else await loadAll();}
$('newCourseBtn').onclick=()=>openModal(null);$('closeModal').onclick=()=>{$('courseModal').hidden=true};$('refreshBtn').onclick=loadAll;
$('courseForm').onsubmit=async e=>{e.preventDefault();const id=$('courseId').value;const row={name:$('courseName').value.trim(),level:$('courseLevel').value,lesson_count:Number($('lessonCount').value),description:$('courseDescription').value.trim()};msg('Saving...');const result=id?await supabaseClient.from('courses').update(row).eq('id',id):await supabaseClient.from('courses').insert(row);if(result.error){msg(result.error.message);return;}msg('Saved.');$('courseModal').hidden=true;await loadAll();};
$('logoutBtn').onclick=async()=>{await supabaseClient.auth.signOut();location.href='index.html';};
init();
