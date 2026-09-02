```css
/* =========================================
   CYBERLAB RESPONSIVE CSS
   ========================================= */

:root {
    --bg: #030712;
    --card: #07111f;
    --card2: #0a1625;
    --border: #19344b;
    --text: #ffffff;
    --muted: #8996a9;
    --green: #00ff9d;
}


/* =========================================
   RESET
   ========================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 85px;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

img {
    max-width: 100%;
    height: auto;
}

button,
input,
textarea {
    font: inherit;
}

button {
    cursor: pointer;
}

a {
    text-decoration: none;
}


/* =========================================
   CONTAINER
   ========================================= */

.container {
    width: min(1200px, 90%);
    margin: auto;
}


/* =========================================
   NAVBAR
   ========================================= */

header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 75px;

    padding: 0 clamp(20px, 6vw, 90px);

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgba(3, 7, 18, 0.92);
    backdrop-filter: blur(15px);

    border-bottom: 1px solid rgba(0, 255, 157, 0.12);

    z-index: 1000;
}

.logo {
    color: var(--green);
    font-size: clamp(20px, 2vw, 27px);
    font-weight: 700;
    white-space: nowrap;
}

.logo span {
    color: white;
}

nav {
    display: flex;
    align-items: center;
    gap: clamp(15px, 2.5vw, 32px);
}

nav a {
    color: #a7b3c4;
    font-size: 15px;
    transition: 0.3s;
}

nav a:hover {
    color: var(--green);
}

.login-btn {
    padding: 9px 18px;

    color: var(--green);
    background: transparent;

    border: 1px solid var(--green);
    border-radius: 5px;

    transition: 0.3s;
}

.login-btn:hover {
    background: var(--green);
    color: #03100b;
}


/* =========================================
   HERO
   ========================================= */

.hero {
    min-height: 100vh;

    padding:
        clamp(120px, 15vh, 170px)
        clamp(20px, 8vw, 100px)
        80px;

    display: grid;

    grid-template-columns:
        minmax(0, 1.15fr)
        minmax(300px, 0.85fr);

    align-items: center;

    gap: clamp(40px, 7vw, 100px);

    background:
        linear-gradient(
            rgba(0, 255, 157, 0.025) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(0, 255, 157, 0.025) 1px,
            transparent 1px
        );

    background-size: 50px 50px;
}

.hero-content {
    min-width: 0;
}

.terminal-text,
.section-tag {
    color: var(--green);
    font-family: monospace;
    font-size: 15px;
}

.hero h1 {
    font-size: clamp(42px, 6vw, 76px);
    line-height: 1.05;
    margin: 20px 0;
}

.hero h1 span,
.section-title h2 span,
.logo span {
    color: var(--green);
}

.hero-content > p:not(.terminal-text) {
    max-width: 650px;

    color: var(--muted);

    font-size: clamp(15px, 1.4vw, 18px);
}


/* =========================================
   HERO BUTTONS
   ========================================= */

.hero-buttons {
    display: flex;
    flex-wrap: wrap;

    gap: 14px;

    margin-top: 30px;
}

.btn {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 46px;

    padding: 12px 24px;

    border-radius: 6px;

    font-weight: bold;

    transition: 0.3s;
}

.primary {
    background: var(--green);
    color: #03100b;
}

.primary:hover {
    transform: translateY(-3px);

    box-shadow:
        0 0 25px rgba(0, 255, 157, 0.45);
}

.secondary {
    color: var(--green);
    border: 1px solid var(--green);
}

.secondary:hover {
    background: var(--green);
    color: #03100b;
}


/* =========================================
   TERMINAL
   ========================================= */

.terminal {
    width: 100%;
    max-width: 500px;

    margin-inline: auto;

    background: rgba(7, 17, 31, 0.95);

    border: 1px solid var(--border);

    border-radius: 12px;

    overflow: hidden;

    box-shadow:
        0 0 50px rgba(0, 255, 157, 0.1);
}

.terminal-header {
    padding: 12px 18px;

    background: #0c1727;

    border-bottom: 1px solid var(--border);
}

.terminal-header span {
    color: #65758a;
    margin-right: 6px;
}

.terminal-body {
    padding: clamp(20px, 4vw, 30px);

    font-family: monospace;

    font-size: clamp(12px, 1.5vw, 15px);

    overflow-x: auto;
}

.terminal-body p {
    margin: 8px 0;
}

.green {
    color: var(--green);
}


/* =========================================
   GENERAL SECTIONS
   ========================================= */

section {
    width: 100%;

    padding:
        clamp(70px, 9vw, 110px)
        clamp(20px, 8vw, 100px);
}

.section-title {
    max-width: 800px;

    margin: 0 auto 50px;

    text-align: center;
}

.section-title h2 {
    font-size: clamp(30px, 4vw, 45px);

    margin: 10px 0;
}

.section-title > p:last-child {
    color: var(--muted);
}


/* =========================================
   FEATURES
   ========================================= */

.features {
    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: clamp(12px, 2vw, 25px);

    padding-top: 50px;
}

.feature {
    min-width: 0;

    padding: clamp(20px, 3vw, 30px);

    text-align: center;

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 10px;

    transition: 0.3s;
}

.feature:hover {
    transform: translateY(-5px);
    border-color: var(--green);
}

.feature div {
    font-size: clamp(28px, 4vw, 40px);

    margin-bottom: 10px;
}

.feature h3 {
    color: var(--green);
}

.feature p {
    color: #788699;
    font-size: 14px;
}


/* =========================================
   COURSES
   ========================================= */

.course-grid {
    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: clamp(16px, 2.5vw, 28px);
}

.course-card {
    display: flex;
    flex-direction: column;

    min-width: 0;

    padding: clamp(20px, 3vw, 30px);

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 10px;

    transition: 0.3s;
}

.course-card:hover {
    transform: translateY(-7px);
    border-color: var(--green);
}

.course-icon {
    font-size: clamp(32px, 4vw, 45px);
}

.course-card h3 {
    color: var(--green);

    font-size: clamp(18px, 2vw, 22px);

    margin: 15px 0;
}

.course-card p {
    color: #8290a3;

    font-size: 14px;

    flex-grow: 1;
}

.course-info {
    display: flex;

    justify-content: space-between;

    gap: 10px;

    margin: 20px 0;

    color: #65758a;

    font-size: 13px;
}

.course-card button {
    width: 100%;

    min-height: 44px;

    padding: 11px;

    background: var(--green);

    border: none;

    border-radius: 5px;

    font-weight: bold;

    transition: 0.3s;
}

.course-card button:hover {
    box-shadow: 0 0 20px rgba(0, 255, 157, .3);
}


/* =========================================
   ABOUT
   ========================================= */

.about-content {
    width: min(1000px, 100%);

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: clamp(25px, 5vw, 60px);

    align-items: center;
}

.about-content p {
    color: #8996a9;

    margin-bottom: 15px;
}

.about-box {
    padding: clamp(22px, 4vw, 35px);

    background: var(--card);

    border-left: 3px solid var(--green);

    border-radius: 5px;
}

.about-box h3 {
    color: var(--green);
    margin-bottom: 10px;
}


/* =========================================
   DASHBOARD
   ========================================= */

.dashboard {
    width: min(1000px, 100%);

    margin: auto;

    display: grid;

    grid-template-columns:
        200px minmax(0, 1fr);

    gap: 30px;

    padding: clamp(22px, 4vw, 40px);

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 10px;
}

.profile {
    text-align: center;
}

.avatar {
    width: 80px;
    height: 80px;

    margin: 0 auto 15px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: var(--green);

    color: #03100b;

    border-radius: 50%;

    font-size: 24px;
    font-weight: bold;
}

.profile h3 {
    color: var(--green);
}

.profile p {
    color: #738195;
    font-size: 14px;
}

.progress-area {
    min-width: 0;
}

.progress-area h3 {
    margin-bottom: 15px;
}

.progress-bar {
    width: 100%;
    height: 15px;

    background: #152336;

    border-radius: 20px;

    overflow: hidden;
}

#progress {
    width: 0;
    height: 100%;

    background: var(--green);

    transition: 1s;
}

.progress-area p {
    margin-top: 10px;

    color: #77869a;
}

#progressText {
    color: var(--green);
}

.dashboard-stats {
    grid-column: 1 / -1;

    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 15px;
}

.dashboard-stats div {
    padding: 20px;

    text-align: center;

    background: var(--card2);

    border: 1px solid var(--border);

    border-radius: 6px;
}

.dashboard-stats strong {
    display: block;

    font-size: clamp(23px, 3vw, 30px);

    color: var(--green);
}

.dashboard-stats span {
    color: #738195;
    font-size: 13px;
}


/* =========================================
   QUIZ
   ========================================= */

.quiz-box {
    width: min(700px, 100%);

    margin: auto;

    padding: clamp(22px, 5vw, 40px);

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 10px;
}

.quiz-box h3 {
    margin-bottom: 25px;

    font-size: clamp(18px, 3vw, 23px);

    text-align: center;
}

.answers {
    display: grid;

    gap: 12px;
}

.answers button {
    width: 100%;

    min-height: 48px;

    padding: 12px;

    text-align: left;

    background: #0b1829;

    border: 1px solid #1b344b;

    color: white;

    border-radius: 5px;

    transition: 0.3s;
}

.answers button:hover:not(:disabled) {
    border-color: var(--green);
}

.answers button:disabled {
    opacity: .7;
    cursor: not-allowed;
}

#quizResult {
    margin-top: 20px;

    text-align: center;

    color: var(--green);
}


/* =========================================
   CONTACT
   ========================================= */

.contact-box {
    width: min(700px, 100%);

    margin: auto;

    padding: clamp(22px, 5vw, 35px);

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 10px;
}

.contact-box input,
.contact-box textarea,
.modal-box input {
    width: 100%;

    padding: 14px;

    margin-bottom: 15px;

    background: #030914;

    border: 1px solid #1b344b;

    border-radius: 5px;

    color: white;

    outline: none;
}

.contact-box input:focus,
.contact-box textarea:focus,
.modal-box input:focus {
    border-color: var(--green);
}

.contact-box textarea {
    min-height: 150px;

    resize: vertical;
}

.contact-box button {
    width: 100%;

    min-height: 46px;

    padding: 12px;

    background: var(--green);

    border: none;

    border-radius: 5px;

    font-weight: bold;
}


/* =========================================
   FOOTER
   ========================================= */

footer {
    padding:
        40px
        20px;

    text-align: center;

    border-top: 1px solid #142438;

    color: #69788d;
}

footer .logo {
    margin-bottom: 10px;
}


/* =========================================
   LOGIN MODAL
   ========================================= */

.modal {
    display: none;

    position: fixed;

    inset: 0;

    padding: 20px;

    background: rgba(0, 0, 0, .82);

    align-items: center;
    justify-content: center;

    z-index: 2000;
}

.modal.active {
    display: flex;
}

.modal-box {
    position: relative;

    width: min(400px, 100%);

    max-height: 90vh;

    overflow-y: auto;

    padding: clamp(22px, 5vw, 35px);

    background: var(--card);

    border: 1px solid var(--green);

    border-radius: 10px;
}

.modal-box h2 {
    margin-bottom: 25px;
}

.modal-box h2 span {
    color: var(--green);
}

.modal-box p {
    margin-top: 15px;

    color: #77869a;

    text-align: center;
}

.modal-box a {
    color: var(--green);
}

.close {
    position: absolute;

    top: 10px;
    right: 15px;

    background: none;

    border: none;

    color: white;

    font-size: 28px;
}


/* =========================================
   LARGE DESKTOP
   ========================================= */

@media (min-width: 1400px) {

    .hero {
        padding-left: 10%;
        padding-right: 10%;
    }

    section {
        padding-left: 10%;
        padding-right: 10%;
    }

}


/* =========================================
   TABLET
   768px - 1100px
   ========================================= */

@media (max-width: 1100px) {

    .hero {
        grid-template-columns: 1fr;

        text-align: center;
    }

    .hero-content {
        margin: auto;
    }

    .hero-content > p:not(.terminal-text) {
        margin-inline: auto;
    }

    .hero-buttons {
        justify-content: center;
    }

    .terminal {
        max-width: 650px;
    }

    .course-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    .features {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

}


/* =========================================
   SMALL TABLET
   ========================================= */

@media (max-width: 850px) {

    header {
        padding: 0 5%;
    }

    nav {
        gap: 15px;
    }

    .login-btn {
        padding: 8px 14px;
    }

    .about-content {
        grid-template-columns: 1fr;
    }

    .dashboard {
        grid-template-columns: 1fr;
    }

    .profile {
        margin-bottom: 10px;
    }

}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 650px) {

    header {
        height: 68px;
    }

    .logo {
        font-size: 21px;
    }

    nav {
        position: absolute;

        top: 68px;
        left: 0;

        width: 100%;

        display: none;

        flex-direction: column;

        align-items: stretch;

        gap: 0;

        background: #050d19;

        border-bottom: 1px solid var(--border);
    }

    nav.active {
        display: flex;
    }

    nav a {
        padding: 15px 6%;

        border-bottom: 1px solid #122338;
    }

    .login-btn {
        margin-left: auto;
        margin-right: 10px;
    }

    /* HERO */

    .hero {
        padding-top: 105px;

        gap: 45px;
    }

    .hero h1 {
        font-size: clamp(38px, 12vw, 52px);
    }

    .hero-buttons {
        flex-direction: column;

        width: 100%;
    }

    .btn {
        width: 100%;
    }

    .terminal {
        max-width: 100%;
    }

    .terminal-body {
        font-size: 12px;
        padding: 20px;
    }


    /* FEATURES */

    .features {
        grid-template-columns: 1fr;

        padding-top: 30px;
    }


    /* COURSES */

    .course-grid {
        grid-template-columns: 1fr;
    }

    .course-card {
        padding: 22px;
    }


    /* DASHBOARD */

    .dashboard {
        padding: 22px;
    }

    .dashboard-stats {
        grid-template-columns: 1fr;
    }


    /* QUIZ */

    .quiz-box {
        padding: 22px 17px;
    }

    .answers button {
        text-align: center;
        font-size: 14px;
    }


    /* CONTACT */

    .contact-box {
        padding: 22px 17px;
    }

}


/* =========================================
   VERY SMALL PHONES
   ========================================= */

@media (max-width: 380px) {

    .logo {
        font-size: 18px;
    }

    .login-btn {
        font-size: 12px;
        padding: 7px 11px;
    }

    .hero h1 {
        font-size: 35px;
    }

    section {
        padding-left: 16px;
        padding-right: 16px;
    }

    .course-card,
    .feature {
        padding: 18px;
    }

    .terminal-body {
        padding: 16px;

        font-size: 11px;
    }

}


/* =========================================
   TOUCH DEVICES
   ========================================= */

@media (hover: none) {

    .course-card:hover,
    .feature:hover {
        transform: none;
    }

}


/* =========================================
   REDUCED MOTION
   ========================================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        transition: none !important;
        animation: none !important;
    }

}
```
