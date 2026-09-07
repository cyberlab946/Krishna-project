// =========================================
// CYBERLAB WEBSITE JAVASCRIPT
// =========================================

function openLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('loginEmail')?.focus();
    }
}

function closeLogin() {
    document.getElementById('loginModal')?.classList.remove('active');
}

// Demo login for this static GitHub Pages website.
// Any valid-looking email + any non-empty password succeeds.
function login() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';

    if (!email || !password) {
        alert('Please enter your email and password.');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    localStorage.setItem('cyberlabLoggedIn', 'true');
    localStorage.setItem('cyberlabUserEmail', email);

    closeLogin();
    updateLoginButton();
    alert('Login successful! Welcome to CyberLab.');
}

function updateLoginButton() {
    const button = document.querySelector('.login-btn');
    if (!button) return;

    if (localStorage.getItem('cyberlabLoggedIn') === 'true') {
        button.textContent = 'Logout';
        button.onclick = logout;
    } else {
        button.textContent = 'Login';
        button.onclick = openLogin;
    }
}

function logout() {
    localStorage.removeItem('cyberlabLoggedIn');
    localStorage.removeItem('cyberlabUserEmail');
    updateLoginButton();
    alert('You have been logged out.');
}

function register() {
    alert('Registration is currently a demo feature. You can enter any valid email and password to log in.');
}

function startCourse(courseName) {
    alert(`Starting: ${courseName}\n\nCourse opened successfully!`);
}

function checkAnswer(button, correct) {
    const result = document.getElementById('quizResult');
    document.querySelectorAll('.answers button').forEach(btn => btn.disabled = true);

    if (correct) {
        if (result) result.textContent = '✓ Correct! Confidentiality, Integrity and Availability.';
        const score = document.getElementById('quizScore');
        if (score) score.textContent = '100%';
    } else if (result) {
        result.textContent = '✗ Incorrect. Refresh the page to try again.';
    }
}

function sendMessage(event) {
    event.preventDefault();

    const name = document.getElementById('contactName')?.value.trim() || '';
    const email = document.getElementById('contactEmail')?.value.trim() || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    if (!name || !email || !message) {
        alert('Please fill in all contact fields.');
        return;
    }

    const subject = encodeURIComponent(`CyberLab Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=cyberlabkrishna%40gmail.com&su=${subject}&body=${body}`,
        '_blank'
    );
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.menu-btn');
    if (!nav) return;

    nav.classList.toggle('active');
    button?.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
}

window.addEventListener('click', function (event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target === modal) closeLogin();
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeLogin();
    if (event.key === 'Enter') {
        const modal = document.getElementById('loginModal');
        const active = document.activeElement;
        if (modal?.classList.contains('active') &&
            (active?.id === 'loginEmail' || active?.id === 'loginPassword')) {
            login();
        }
    }
});

document.addEventListener('DOMContentLoaded', updateLoginButton);
