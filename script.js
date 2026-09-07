// =========================================
// CYBERLAB WEBSITE JAVASCRIPT
// =========================================

function openLogin() {
    var modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        var email = document.getElementById('loginEmail');
        if (email) email.focus();
    }
}

function closeLogin() {
    var modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
}

function login() {
    var emailInput = document.getElementById('loginEmail');
    var passwordInput = document.getElementById('loginPassword');

    if (!emailInput || !passwordInput) {
        alert('Login form could not be loaded. Please refresh the page.');
        return;
    }

    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (email === '' || password === '') {
        alert('Please enter your email and password.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        localStorage.setItem('cyberlabLoggedIn', 'true');
        localStorage.setItem('cyberlabUserEmail', email);
    } catch (error) {
        // Login still succeeds for this demo even if browser storage is unavailable.
    }

    closeLogin();
    updateLoginButton();
    alert('Login successful! Welcome to CyberLab.');
}

function updateLoginButton() {
    var button = document.querySelector('.login-btn');
    if (!button) return;

    var loggedIn = false;
    try {
        loggedIn = localStorage.getItem('cyberlabLoggedIn') === 'true';
    } catch (error) {}

    if (loggedIn) {
        button.textContent = 'Logout';
        button.setAttribute('aria-label', 'Logout');
        button.onclick = logout;
    } else {
        button.textContent = 'Login';
        button.setAttribute('aria-label', 'Login');
        button.onclick = openLogin;
    }
}

function logout() {
    try {
        localStorage.removeItem('cyberlabLoggedIn');
        localStorage.removeItem('cyberlabUserEmail');
    } catch (error) {}

    updateLoginButton();
    alert('You have been logged out.');
}

function register() {
    alert('Registration is currently a demo feature. Enter any valid email and password to log in.');
}

function startCourse(courseName) {
    alert('Starting: ' + courseName + '\n\nCourse opened successfully!');
}

function checkAnswer(button, correct) {
    var result = document.getElementById('quizResult');
    var buttons = document.querySelectorAll('.answers button');

    for (var i = 0; i < buttons.length; i++) buttons[i].disabled = true;

    if (correct) {
        if (result) result.textContent = '✓ Correct! Confidentiality, Integrity and Availability.';
        var score = document.getElementById('quizScore');
        if (score) score.textContent = '100%';
    } else if (result) {
        result.textContent = '✗ Incorrect. Refresh the page to try again.';
    }
}

function sendMessage(event) {
    event.preventDefault();

    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all contact fields.');
        return;
    }

    var subject = encodeURIComponent('CyberLab Contact from ' + name);
    var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

    window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=cyberlabkrishna%40gmail.com&su=' + subject + '&body=' + body,
        '_blank'
    );
}

function toggleMenu() {
    var nav = document.getElementById('mainNav');
    var button = document.querySelector('.menu-btn');
    if (!nav) return;

    nav.classList.toggle('active');
    if (button) button.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
}

// Close login when clicking outside the popup.
window.addEventListener('click', function(event) {
    var modal = document.getElementById('loginModal');
    if (modal && event.target === modal) closeLogin();
});

// Press Enter inside the login fields to log in.
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLogin();

    if (event.key === 'Enter') {
        var modal = document.getElementById('loginModal');
        var active = document.activeElement;
        if (modal && modal.classList.contains('active') &&
            active && (active.id === 'loginEmail' || active.id === 'loginPassword')) {
            event.preventDefault();
            login();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateLoginButton();
});
