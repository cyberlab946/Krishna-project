// =========================================
// CYBERLAB PROFILE - DYNAMIC NAME + INITIALS
// =========================================

function getProfileInitials(name) {
    var cleanName = (name || '').trim();
    if (!cleanName) return 'GS';

    var parts = cleanName.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function showEditProfile() {
    if (!currentUser) {
        openLogin();
        return;
    }

    var box = document.querySelector('#loginModal .modal-box');
    var modal = document.getElementById('loginModal');
    if (!box) return;

    var currentName = (currentUser.user_metadata && currentUser.user_metadata.full_name) || '';
    var safeName = escapeHtml(currentName);

    box.innerHTML = `
        <button class="close" onclick="closeLogin()" aria-label="Close profile editor">×</button>
        <h2>Edit <span>Profile</span></h2>
        <p style="margin-bottom:15px;">Change the name shown on your CyberLab profile.</p>
        <input id="editProfileName" type="text" value="${safeName}" placeholder="Your Full Name" autocomplete="name">
        <button id="saveProfileButton" onclick="saveProfileName()">Save Profile</button>
        <p><a href="#" onclick="closeLogin(); return false;">Cancel</a></p>
    `;

    if (modal) modal.classList.add('active');

    var input = document.getElementById('editProfileName');
    if (input) {
        input.focus();
        input.select();
    }
}

async function saveProfileName() {
    if (!supabaseReady() || !currentUser) return;

    var input = document.getElementById('editProfileName');
    var button = document.getElementById('saveProfileButton');
    var name = input ? input.value.trim() : '';

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (name.length < 2) {
        alert('Name must contain at least 2 characters.');
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = 'Saving...';
    }

    try {
        var result = await supabaseClient.auth.updateUser({
            data: { full_name: name }
        });

        if (result.error) {
            alert('Could not update profile: ' + result.error.message);
            return;
        }

        currentUser = result.data.user || currentUser;
        updateDashboardUser();
        closeLogin();
        alert('Profile updated successfully!');
    } catch (error) {
        alert('Profile update error: ' + (error.message || 'Please try again.'));
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = 'Save Profile';
        }
    }
}

// Replace the dashboard user renderer so the avatar and name are always dynamic.
function updateDashboardUser() {
    var nameElement = document.querySelector('.profile h3');
    var roleElement = document.querySelector('.profile p');
    var avatarElement = document.querySelector('.profile .avatar');
    var profileElement = document.querySelector('.profile');

    if (!nameElement || !roleElement) return;

    var editButton = document.getElementById('editProfileButton');

    if (!editButton && profileElement) {
        editButton = document.createElement('button');
        editButton.id = 'editProfileButton';
        editButton.type = 'button';
        editButton.textContent = 'Edit Profile';
        editButton.onclick = showEditProfile;
        editButton.style.cssText = 'margin-top:12px;padding:8px 14px;background:transparent;border:1px solid #00ff9d;border-radius:5px;color:#00ff9d;font-weight:bold;cursor:pointer;';
        profileElement.appendChild(editButton);
    }

    if (currentUser) {
        var name = currentUser.user_metadata && currentUser.user_metadata.full_name;
        name = name || currentUser.email || 'CyberLab Student';

        nameElement.textContent = name;
        roleElement.textContent = currentUser.email || 'CyberLab Student';

        if (avatarElement) avatarElement.textContent = getProfileInitials(name);
        if (editButton) editButton.style.display = 'inline-block';
    } else {
        nameElement.textContent = 'Guest Student';
        roleElement.textContent = 'Login to track your progress';

        if (avatarElement) avatarElement.textContent = 'GS';
        if (editButton) editButton.style.display = 'none';
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        var modal = document.getElementById('loginModal');
        var active = document.activeElement;
        if (modal && modal.classList.contains('active') && active && active.id === 'editProfileName') {
            saveProfileName();
        }
    }
});
