// CyberLab Stage 14 - Professional UI polish
(function(){
  if(document.getElementById('stage14-ui')) return;
  const s=document.createElement('style'); s.id='stage14-ui';
  s.textContent=`
  :root{--cyber-green:#00ff9d;--cyber-blue:#36a8ff;--cyber-bg:#050a12;--cyber-card:rgba(10,18,29,.88)}
  body{background:radial-gradient(circle at 20% 0%,rgba(0,255,157,.07),transparent 28%),radial-gradient(circle at 90% 20%,rgba(54,168,255,.07),transparent 30%),var(--cyber-bg);}
  header{backdrop-filter:blur(14px);background:rgba(3,8,15,.88)!important;border-bottom:1px solid rgba(0,255,157,.18)!important;box-shadow:0 8px 30px rgba(0,0,0,.25);position:sticky;top:0;z-index:10000}
  .logo{letter-spacing:-.5px;text-shadow:0 0 18px rgba(0,255,157,.28)}
  .hero{position:relative;overflow:hidden}
  .hero:before{content:'';position:absolute;width:360px;height:360px;border:1px solid rgba(0,255,157,.08);border-radius:50%;right:-140px;top:-100px;box-shadow:0 0 80px rgba(0,255,157,.06)}
  #courses .learning-dashboard{padding-top:32px}
  #courses .learning-hero{background:linear-gradient(135deg,rgba(0,255,157,.09),rgba(54,168,255,.05) 55%,rgba(10,20,30,.8));box-shadow:0 18px 45px rgba(0,0,0,.22);position:relative;overflow:hidden}
  #courses .learning-hero:after{content:'SECURE • LEARN • BUILD';position:absolute;right:18px;bottom:12px;font-size:.65rem;letter-spacing:2px;opacity:.28}
  #courses .course-category h3{display:flex;align-items:center;gap:8px;border-left:3px solid var(--cyber-green);padding-left:10px}
  #courses .dashboard-course{background:linear-gradient(160deg,rgba(13,24,36,.94),rgba(7,14,23,.94));box-shadow:0 10px 28px rgba(0,0,0,.18);position:relative;overflow:hidden}
  #courses .dashboard-course:before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,rgba(0,255,157,.05),transparent 45%);pointer-events:none}
  #courses .dashboard-course:hover{box-shadow:0 16px 36px rgba(0,255,157,.09);transform:translateY(-5px)}
  #courses .dashboard-course .course-icon{filter:drop-shadow(0 0 8px rgba(54,168,255,.22))}
  #courses .dashboard-course button{border:1px solid rgba(0,255,157,.45)!important;background:linear-gradient(90deg,rgba(0,255,157,.12),rgba(54,168,255,.08))!important;color:#eafff7!important;font-weight:700;transition:.2s}
  #courses .dashboard-course button:hover{background:rgba(0,255,157,.18)!important;box-shadow:0 0 18px rgba(0,255,157,.12)}
  #courses .learning-progress{background:linear-gradient(135deg,rgba(12,23,34,.94),rgba(7,14,23,.94));box-shadow:0 12px 30px rgba(0,0,0,.2)}
  .terminal{box-shadow:0 18px 50px rgba(0,0,0,.3),0 0 35px rgba(0,255,157,.05)}
  @media(max-width:700px){header{padding-left:14px!important;padding-right:14px!important}.hero{padding-top:35px}.hero:before{display:none}#courses .learning-hero{padding:22px 16px}#courses .dashboard-course{min-height:190px}}
  `;
  document.head.appendChild(s);
})();
