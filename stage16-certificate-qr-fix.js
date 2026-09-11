// CyberLab Stage 16 - QR certificate fix
// Replaces the Stage 13 certificate action with a printable certificate
// containing a real QR code that points to the public verification page.
(function () {
    function esc(v) {
        const d = document.createElement('div');
        d.textContent = v == null ? '' : String(v);
        return d.innerHTML;
    }

    async function makeCertificate(btn) {
        const modal = document.getElementById('stage13Modal');
        if (!modal || typeof supabaseClient === 'undefined' || !window.currentUser) {
            alert('Please log in before generating a certificate.');
            return;
        }
        const courseId = modal.dataset.courseId;
        const courseName = modal.dataset.dbName;
        if (!courseId || !courseName) return;

        btn.disabled = true;
        try {
            const c = await supabaseClient.from('courses').select('id,name,lesson_count').eq('id', courseId).single();
            if (c.error) throw c.error;
            const done = await supabaseClient.from('lesson_progress').select('lesson_number').eq('user_id', currentUser.id).eq('course_id', courseId);
            if (done.error) throw done.error;
            const q = await supabaseClient.from('quiz_attempts').select('score').eq('user_id', currentUser.id).eq('course_id', courseId).order('attempted_at', { ascending: false }).limit(1);
            if (q.error) throw q.error;
            const score = q.data && q.data[0] ? Number(q.data[0].score) : 0;
            if ((done.data || []).length < Number(c.data.lesson_count) || score < 70) {
                alert('Complete all lessons and pass the quiz with 70% or higher.');
                btn.disabled = false;
                return;
            }

            const id = 'CL-' + c.data.id + '-' + currentUser.id.slice(0, 8).toUpperCase();
            const student = (currentUser.user_metadata && currentUser.user_metadata.full_name) || currentUser.email || 'CyberLab Student';
            const issued = new Date();
            const saved = await supabaseClient.from('certificates').upsert({
                user_id: currentUser.id,
                course_id: c.data.id,
                certificate_id: id,
                student_name: student,
                course_name: c.data.name,
                quiz_score: score,
                issued_at: issued.toISOString()
            }, { onConflict: 'user_id,course_id' });
            if (saved.error) throw saved.error;

            const verifyUrl = new URL('verify.html', window.location.href);
            verifyUrl.searchParams.set('id', id);
            const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(verifyUrl.href);
            const w = window.open('', '_blank');
            if (!w) {
                alert('Allow pop-ups to generate your certificate.');
                btn.disabled = false;
                return;
            }
            w.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CyberLab Certificate - ${esc(id)}</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#07111f;font-family:Arial,sans-serif;color:#fff}.cert{width:min(1000px,92vw);padding:60px 65px;text-align:center;background:#0a1625;border:6px solid #00ff9d;outline:2px solid #00ff9d;outline-offset:-20px}.brand,.course{color:#00ff9d}.tag{letter-spacing:4px}.name{font-size:42px;margin:18px 0}.course{font-size:30px}.verify{margin:24px auto 8px;display:flex;justify-content:center;align-items:center;gap:24px}.verify img{width:180px;height:180px;background:#fff;padding:7px}.verify-text{text-align:left;color:#c6d1dc;font-size:13px;line-height:1.55;max-width:390px;word-break:break-word}.verify-text b{color:#00ff9d}.id{color:#9aa8bb}.note{font-size:11px;color:#8290a2}@media(max-width:650px){.cert{padding:38px 25px}.name{font-size:30px}.course{font-size:22px}.verify{flex-direction:column}.verify-text{text-align:center}.verify img{width:160px;height:160px}}@media print{body{background:#fff;color:#000}.cert{background:#fff;color:#000}.brand,.course{color:#111}.verify-text,.id,.note{color:#333}}</style></head><body><div class="cert"><div class="brand">&lt;CyberLab/&gt;</div><p class="tag">CERTIFICATE OF COMPLETION</p><h1 class="name">${esc(student)}</h1><p>has successfully completed</p><h2 class="course">${esc(c.data.name)}</h2><p>and passed the CyberLab knowledge assessment with <b>${score}%</b>.</p><div class="verify"><img src="${qrUrl}" alt="QR code to verify certificate"><div class="verify-text"><b>SCAN TO VERIFY</b><br>Scan the QR code to open CyberLab's certificate verification page.<br><br><b>Certificate ID</b><br>${esc(id)}<br><br><b>Verification URL</b><br>${esc(verifyUrl.href)}</div></div><p class="id">Issued: ${issued.toLocaleDateString()}</p><p>Learn • Build • Secure 🔐</p><p class="note">This certificate verifies completion recorded by CyberLab.</p></div><script>setTimeout(()=>window.print(),900)<\\/script></body></html>`);
            w.document.close();
        } catch (e) {
            alert('Certificate error: ' + (e.message || 'Please try again.'));
            btn.disabled = false;
        }
    }

    function init() {
        document.addEventListener('click', function (event) {
            const btn = event.target.closest('#s13cert');
            if (!btn) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            makeCertificate(btn);
        }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
