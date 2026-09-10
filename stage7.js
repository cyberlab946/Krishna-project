// CyberLab Stage 7 - certificate verification and polished certificate
(function () {
    const VERIFY_PATH = 'verify.html';

    function esc(v) {
        const d = document.createElement('div');
        d.textContent = v == null ? '' : String(v);
        return d.innerHTML;
    }

    function addVerificationUI() {
        if (!document.getElementById('cyberlabVerifyLink')) {
            const nav = document.getElementById('mainNav');
            if (nav) {
                const a = document.createElement('a');
                a.id = 'cyberlabVerifyLink';
                a.href = VERIFY_PATH;
                a.textContent = 'Verify Certificate';
                nav.appendChild(a);
            }
        }

        if (!document.getElementById('certificateVerifyCard')) {
            const contact = document.getElementById('contact');
            if (contact) {
                const card = document.createElement('div');
                card.id = 'certificateVerifyCard';
                card.style.cssText = 'max-width:900px;margin:25px auto 0;padding:22px;border:1px solid rgba(0,255,157,.35);border-radius:12px;background:rgba(0,255,157,.04);text-align:center;';
                card.innerHTML = '<h3>🔎 Verify a CyberLab Certificate</h3><p>Anyone can check a CyberLab certificate ID using the public verification page.</p><a href="verify.html" style="display:inline-block;margin-top:8px;padding:10px 18px;border:1px solid #00ff9d;border-radius:7px;color:#00ff9d;text-decoration:none;font-weight:bold;">Open Certificate Verification</a>';
                contact.querySelector('.contact-box')?.appendChild(card);
            }
        }
    }

    async function generateCertificateV7(name) {
        if (typeof supabaseClient === 'undefined' || !supabaseClient || !currentUser) {
            alert('Please log in before generating a certificate.');
            return;
        }

        try {
            const c = await supabaseClient.from('courses').select('id,lesson_count,name').eq('name', name).single();
            if (c.error) throw c.error;

            const done = await supabaseClient.from('lesson_progress').select('lesson_number').eq('user_id', currentUser.id).eq('course_id', c.data.id);
            if (done.error) throw done.error;

            const a = await supabaseClient.from('quiz_attempts').select('score').eq('user_id', currentUser.id).eq('course_id', c.data.id).order('attempted_at', { ascending: false }).limit(1);
            if (a.error) throw a.error;

            const score = a.data && a.data[0] ? a.data[0].score : 0;
            if ((done.data || []).length < c.data.lesson_count || score < 70) {
                alert('Complete all lessons and pass the quiz with 70% or higher.');
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

            const verifyUrl = new URL(VERIFY_PATH, window.location.href);
            verifyUrl.searchParams.set('id', id);
            const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(verifyUrl.href);

            const w = window.open('', '_blank');
            if (!w) {
                alert('Allow pop-ups to generate your certificate.');
                return;
            }

            w.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CyberLab Certificate - ${esc(id)}</title><style>
                *{box-sizing:border-box}body{font-family:Arial,sans-serif;background:#07111f;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;color:white}.cert{width:min(1000px,92vw);padding:65px 70px;text-align:center;background:#0a1625;border:6px solid #00ff9d;outline:2px solid #00ff9d;outline-offset:-20px;position:relative}.brand,.course{color:#00ff9d}.tag{letter-spacing:5px}.name{font-size:44px;margin:18px 0}.course{font-size:30px}.id{margin-top:28px;color:#9aa8bb}.verify{margin:22px auto 0;display:flex;align-items:center;justify-content:center;gap:20px}.verify img{width:130px;height:130px;background:white;padding:6px}.verify-text{font-size:13px;color:#b9c6d5;text-align:left}.verify-text b{color:#00ff9d}.note{margin-top:22px;font-size:12px;color:#8d9bae}@media print{body{background:white;color:black}.cert{background:white;color:black}.brand,.course{color:#111}.id,.verify-text,.note{color:#333}.verify img{border:1px solid #ddd}}
            </style></head><body><div class="cert"><div class="brand">&lt;CyberLab/&gt;</div><p class="tag">CERTIFICATE OF COMPLETION</p><h1 class="name">${esc(student)}</h1><p>has successfully completed</p><h2 class="course">${esc(c.data.name)}</h2><p>and passed the CyberLab knowledge assessment with <b>${score}%</b>.</p><div class="verify"><img src="${qrUrl}" alt="QR code to verify certificate"><div class="verify-text"><b>VERIFY ONLINE</b><br>Scan this QR code or visit<br>${esc(verifyUrl.href)}<br><br>Certificate ID: ${esc(id)}</div></div><p class="id">Issued: ${issued.toLocaleDateString()}</p><p>Learn • Build • Secure</p><p class="note">This certificate verifies completion recorded by CyberLab. It does not by itself represent government accreditation or a regulated professional qualification.</p></div><script>setTimeout(()=>window.print(),800)<\/script></body></html>`);
            w.document.close();
        } catch (e) {
            alert('Certificate error: ' + (e.message || 'Please try again.'));
        }
    }

    window.addEventListener('load', function () {
        addVerificationUI();
        if (typeof window.generateCertificate === 'function') window.generateCertificate = generateCertificateV7;
    });
})();
