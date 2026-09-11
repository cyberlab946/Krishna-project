// CyberLab Stage 17 - add a Download Certificate button to certificate windows
(function () {
    if (window.__cyberlabStage17) return;
    window.__cyberlabStage17 = true;

    const originalOpen = window.open;

    function injectDownloadButton(popup) {
        try {
            if (!popup || popup.closed) return;
            const doc = popup.document;
            if (!doc || doc.getElementById('cyberlabDownloadCertificate')) return;

            const style = doc.createElement('style');
            style.id = 'cyberlabDownloadCertificateStyle';
            style.textContent = `
                #cyberlabDownloadCertificate{position:fixed;right:24px;bottom:24px;z-index:99999;padding:13px 20px;border:2px solid #00ff9d;border-radius:10px;background:#07111f;color:#00ff9d;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 0 18px rgba(0,255,157,.25)}
                #cyberlabDownloadCertificate:hover{background:#00ff9d;color:#07111f}
                @media print{#cyberlabDownloadCertificate{display:none!important}}
            `;
            doc.head.appendChild(style);

            const button = doc.createElement('button');
            button.id = 'cyberlabDownloadCertificate';
            button.type = 'button';
            button.textContent = '⬇️ Download Certificate (PDF)';
            button.title = 'Open print dialog and choose Save as PDF';
            button.onclick = function () {
                popup.focus();
                popup.print();
            };
            doc.body.appendChild(button);
        } catch (e) {
            console.warn('CyberLab certificate download button:', e);
        }
    }

    window.open = function () {
        const popup = originalOpen.apply(window, arguments);
        if (popup) {
            setTimeout(function () { injectDownloadButton(popup); }, 250);
            setTimeout(function () { injectDownloadButton(popup); }, 900);
            setTimeout(function () { injectDownloadButton(popup); }, 1800);
        }
        return popup;
    };
})();
