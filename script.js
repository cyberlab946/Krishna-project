// =========================================
// CYBERLAB - STAGE 1: REAL SUPABASE AUTHENTICATION
// =========================================

var currentUser = null;

function supabaseReady() {
    return typeof supabaseClient !== 'undefined' &&
        supabaseClient !== null &&
        typeof SUPABASE_URL !== 'undefined' &&
        typeof SUPABASE_PUBLISHABLE_KEY !== 'undefined' &&
        SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' &&
        SUPABASE_PUBLISHABLE_KEY !== 'YOUR_SUPABASE_PUBLISHABLE_KEY';
}

function getRedirectUrl() {
    return window.location.origin + window.location.pathname;
}

function openLogin() {
    var modal = document.getElementById('loginModal');
    if (!modal) return;

    modal.classList.add('active');
    renderLoginForm();

    if (!supabaseReady()) showAuthSetupMessage();
}

function closeLogin() {
    var modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
}

function showAuthSetupMessage() {
    var box = document.querySelector('#loginModal .modal-box');
    if (!box) return;

    var existing = box.querySelector('.auth-message');
    if (!existing) {
        var p = document.createElement('p');
        p.className = 'auth-message';
        p.textContent = 'Authentication service is not loaded. Please refresh the page and check the Supabase setup.';
        box.insertBefore(p, box.querySelector('#loginEmail'));
    }
}

function renderLoginForm(message) {
    var box = document.querySelector('#loginModal .modal-box');
    if (!box) return;

    box.innerHTML = `
        <button class="close" onclick="closeLogin()" aria-label="Close login">×</button>
        <h2 id="loginTitle">Cyber<span>Lab</span> Login</h2>
        ${message ? `<p class="auth-message">${escapeHtml(message)}</p>` : ''}
        <input id="loginEmail" type="email" placeholder="Email" autocomplete="email">
        <input id="loginPassword" type="password" placeholder="Password" autocomplete="current-password">
        <button id="loginSubmit" onclick="login()">Login</button>
        <p><a href="#" onclick="showForgotPassword(); return false;">Forgot password?</a></p>
        <p>New student? <a href="#" onclick="showRegister(); return false;">Create Account</a></p>
    `;

    var email = document.getElementById('loginEmail');
    if (email) email.focus();
}

function showRegister() {
    var modal = document.getElementById('loginModal');
    var box = document.querySelector('#loginModal .modal-box');
    if (!box) return;

    box.innerHTML = `
        <button class="close" onclick="closeLogin()" aria-label="Close registration">×</button>
        <h2 id="loginTitle">Create <span>Account</span></h2>
        <input id="registerName" type="text" placeholder="Full Name" autocomplete="name">
        <input id="registerEmail" type="email" placeholder="Email" autocomplete="email">
        <input id="registerPassword" type="password" placeholder="Password (8+ characters)" autocomplete="new-password">
        <button id="registerSubmit" onclick="register()">Create Account</button>
        <p>Already have an account? <a href="#" onclick="renderLoginForm(); return false;">Login</a></p>
    `;

    if (modal) modal.classList.add('active');
    var name = document.getElementById('registerName');
    if (name) name.focus();
}

async function register() {
    if (!supabaseReady()) {
        alert('Supabase is not loaded. Please refresh the page.');
        return;
    }

    var nameInput = document.getElementById('registerName');
    var emailInput = document.getElementById('registerEmail');
    var passwordInput = document.getElementById('registerPassword');
    var button = document.getElementById('registerSubmit');

    if (!nameInput || !emailInput || !passwordInput) return;

    var name = nameInput.value.trim();
    var email = emailInput.value.trim().toLowerCase();
    var password = passwordInput.value;

    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = 'Creating Account...';
    }

    try {
        var result = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: name },
                emailRedirectTo: getRedirectUrl()
            }
        });

        if (result.error) {
            alert('Registration failed: ' + result.error.message);
            return;
        }

        closeLogin();

        if (result.data.session) {
            currentUser = result.data.user;
            updateLoginButton();
            updateDashboardUser();
            alert('Account created and you are now logged in. Welcome to CyberLab!');
        } else {
            alert('Account created! Please check your email and click the verification link before logging in.');
        }
    } catch (error) {
        alert('Registration error: ' + (error.message || 'Please try again.'));
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = 'Create Account';
        }
    }
}

async function login() {
    if (!supabaseReady()) {
        alert('Supabase is not loaded. Please refresh the page.');
        return;
    }

    var emailInput = document.getElementById('loginEmail');
    var passwordInput = document.getElementById('loginPassword');
    var button = document.getElementById('loginSubmit');

    if (!emailInput || !passwordInput) return;

    var email = emailInput.value.trim().toLowerCase();
    var password = passwordInput.value;

    if (!email || !password) {
        alert('Please enter your email and password.');
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = 'Logging in...';
    }

    try {
        var result = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (result.error) {
            alert('Login failed: ' + result.error.message);
            return;
        }

        currentUser = result.data.user;
        closeLogin();
        updateLoginButton();
        updateDashboardUser();
        alert('Login successful! Welcome to CyberLab.');
    } catch (error) {
        alert('Login error: ' + (error.message || 'Please try again.'));
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = 'Login';
        }
    }
}

async function logout() {
    if (!supabaseReady()) return;

    try {
        var result = await supabaseClient.auth.signOut();
        if (result.error) {
            alert('Logout failed: ' + result.error.message);
            return;
        }

        currentUser = null;
        updateLoginButton();
        updateDashboardUser();
        alert('You have been logged out.');
    } catch (error) {
        alert('Logout error: ' + (error.message || 'Please try again.'));
    }
}

async function showForgotPassword() {
    var box = document.querySelector('#loginModal .modal-box');
    if (!box) return;

    box.innerHTML = `
        <button class="close" onclick="closeLogin()" aria-label="Close">×</button>
        <h2>Reset <span>Password</span></h2>
        <p>Enter your email and we will send you a password reset link.</p>
        <input id="resetEmail" type="email" placeholder="Email" autocomplete="email">
        <button id="resetSubmit" onclick="sendPasswordReset()">Send Reset Link</button>
        <p><a href="#" onclick="renderLoginForm(); return false;">Back to Login</a></p>
    `;

    var modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');

    var email = document.getElementById('resetEmail');
    if (email) email.focus();
}

async function sendPasswordReset() {
    if (!supabaseReady()) {
        alert('Supabase is not loaded. Please refresh the page.');
        return;
    }

    var input = document.getElementById('resetEmail');
    var button = document.getElementById('resetSubmit');
    if (!input) return;

    var email = input.value.trim().toLowerCase();
    if (!email) {
        alert('Please enter your email.');
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = 'Sending...';
    }

    try {
        var result = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: getRedirectUrl()
        });

        if (result.error) {
            alert('Could not send reset email: ' + result.error.message);
            return;
        }

        closeLogin();
        alert('Password reset email sent. Check your inbox.');
    } catch (error) {
        alert('Reset error: ' + (error.message || 'Please try again.'));
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = 'Send Reset Link';
        }
    }
}

function showResetPasswordForm() {
    var box = document.querySelector('#loginModal .modal-box');
    if (!box) return;

    box.innerHTML = `
        <button class="close" onclick="closeLogin()" aria-label="Close">×</button>
        <h2>Choose a New <span>Password</span></h2>
        <input id="newPassword" type="password" placeholder="New password (8+ characters)" autocomplete="new-password">
        <button id="updatePasswordSubmit" onclick="updatePassword()">Update Password</button>
    `;

    var modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');

    var password = document.getElementById('newPassword');
    if (password) password.focus();
}

async function updatePassword() {
    if (!supabaseReady()) return;

    var input = document.getElementById('newPassword');
    var button = document.getElementById('updatePasswordSubmit');
    if (!input) return;

    var password = input.value;
    if (!password || password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = 'Updating...';
    }

    try {
        var result = await supabaseClient.auth.updateUser({ password: password });
        if (result.error) {
            alert('Could not update password: ' + result.error.message);
            return;
        }

        closeLogin();
        alert('Password updated successfully.');
    } catch (error) {
        alert('Password update error: ' + (error.message || 'Please try again.'));
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = 'Update Password';
        }
    }
}

function updateLoginButton() {
    var button = document.querySelector('.login-btn');
    if (!button) return;

    if (currentUser) {
        button.textContent = 'Logout';
        button.setAttribute('aria-label', 'Logout');
        button.onclick = logout;
    } else {
        button.textContent = 'Login';
        button.setAttribute('aria-label', 'Login');
        button.onclick = openLogin;
    }
}

function updateDashboardUser() {
    var nameElement = document.querySelector('.profile h3');
    var roleElement = document.querySelector('.profile p');
    if (!nameElement || !roleElement) return;

    if (currentUser) {
        var name = currentUser.user_metadata && currentUser.user_metadata.full_name;
        nameElement.textContent = name || currentUser.email || 'CyberLab Student';
        roleElement.textContent = currentUser.email || 'CyberLab Student';
    } else {
        nameElement.textContent = 'Guest Student';
        roleElement.textContent = 'Login to track your progress';
    }
}

function startCourse(courseName) {
    if (!currentUser) {
        openLogin();
        alert('Please create an account or log in before starting a course.');
        return;
    }
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
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=cyberlabkrishna%40gmail.com&su=' + subject + '&body=' + body, '_blank');
}

function toggleMenu() {
    var nav = document.getElementById('mainNav');
    var button = document.querySelector('.menu-btn');
    if (!nav) return;
    nav.classList.toggle('active');
    if (button) button.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
}

function escapeHtml(value) {
    var div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
}

window.addEventListener('click', function(event) {
    var modal = document.getElementById('loginModal');
    if (modal && event.target === modal) closeLogin();
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeLogin();

    if (event.key === 'Enter') {
        var modal = document.getElementById('loginModal');
        var active = document.activeElement;
        if (!modal || !modal.classList.contains('active') || !active) return;

        if (active.id === 'loginEmail' || active.id === 'loginPassword') login();
        if (active.id === 'registerName' || active.id === 'registerEmail' || active.id === 'registerPassword') register();
    }
});

document.addEventListener('DOMContentLoaded', async function() {
    updateLoginButton();
    updateDashboardUser();

    if (!supabaseReady()) return;

    try {
        var sessionResult = await supabaseClient.auth.getSession();
        currentUser = sessionResult.data && sessionResult.data.session
            ? sessionResult.data.session.user
            : null;

        updateLoginButton();
        updateDashboardUser();

        supabaseClient.auth.onAuthStateChange(function(event, session) {
            currentUser = session ? session.user : null;
            updateLoginButton();
            updateDashboardUser();

            if (event === 'PASSWORD_RECOVERY') showResetPasswordForm();
        });
    } catch (error) {
        console.error('Supabase session error:', error);
    }
});
