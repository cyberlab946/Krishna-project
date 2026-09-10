// =========================================
// CYBERLAB STAGE 11 - LIVE STUDENT STATUS
// Keeps the homepage terminal synchronized with the
// logged-in user's profile and enrolled courses.
// =========================================
(function () {
    'use strict';

    function ready() {
        return typeof supabaseClient !== 'undefined' &&
            supabaseClient &&
            typeof currentUser !== 'undefined' &&
            currentUser;
    }

    function esc(value) {
        var div = document.createElement('div');
        div.textContent = value == null ? '' : String(value);
        return div.innerHTML;
    }

    function setText(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function setHtml(id, value) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = value;
    }

    async function updateLiveStatus() {
        var status = document.getElementById('liveStatus');
        var name = document.getElementById('liveUserName');
        var bio = document.getElementById('liveBio');
        var courses = document.getElementById('liveCourses');
        var email = document.getElementById('liveEmail');

        if (!status || !name || !bio || !courses) return;

        if (!ready()) {
            setText('liveStatus', '[ OFFLINE ]');
            setText('liveUserName', 'Guest Student');
            setText('liveBio', 'Login to show your live profile.');
            setText('liveEmail', '');
            setHtml('liveCourses', '<span class="green">No courses selected</span>');
            return;
        }

        try {
            status.textContent = '[ SYNCING... ]';

            var profileResult = await supabaseClient
                .from('profiles')
                .select('full_name,bio,avatar_emoji')
                .eq('id', currentUser.id)
                .maybeSingle();

            var enrollmentResult = await supabaseClient
                .from('enrollments')
                .select('course_id,courses(name)')
                .eq('user_id', currentUser.id);

            var profile = profileResult.data || {};
            var metadata = currentUser.user_metadata || {};
            var studentName = profile.full_name || metadata.full_name || currentUser.email || 'CyberLab Student';
            var studentBio = profile.bio || 'No bio added yet.';
            var studentEmail = currentUser.email || '';

            setText('liveUserName', studentName);
            setText('liveBio', studentBio);
            setText('liveEmail', studentEmail);

            var rows = enrollmentResult.data || [];
            var names = rows
                .map(function (row) {
                    return row.courses && row.courses.name ? row.courses.name : null;
                })
                .filter(Boolean);

            if (names.length) {
                setHtml('liveCourses', names.map(function (courseName) {
                    return '<span class="green">• ' + esc(courseName) + '</span>';
                }).join(''));
            } else {
                setHtml('liveCourses', '<span class="green">No courses selected</span>');
            }

            setText('liveStatus', '[ ONLINE • LIVE SYNC ]');
        } catch (error) {
            console.warn('Live profile sync error:', error);
            setText('liveStatus', '[ ONLINE ]');
        }
    }

    function start() {
        updateLiveStatus();

        // Keep the homepage synchronized if the profile/course data changes.
        setInterval(updateLiveStatus, 10000);

        if (typeof supabaseClient !== 'undefined' && supabaseClient && supabaseClient.auth) {
            supabaseClient.auth.onAuthStateChange(function () {
                setTimeout(updateLiveStatus, 250);
            });
        }
    }

    document.addEventListener('DOMContentLoaded', start);
})();
