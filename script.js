document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark / Light Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        body.classList.replace("dark-theme", "light-theme");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.replace("dark-theme", "light-theme");
            themeBtn.textContent = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            body.classList.replace("light-theme", "dark-theme");
            themeBtn.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });

    // 2. Auth Modal (Login / Register) Controls
    const modal = document.getElementById("auth-modal");
    const openAuthBtn = document.getElementById("open-auth-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const userArea = document.getElementById("user-area");

    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // Open/Close Modal
    openAuthBtn.addEventListener("click", () => modal.style.display = "flex");
    closeModalBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Tab Switching
    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    });

    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    // Check Logged-in User
    function updateUI() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            userArea.innerHTML = `
                <span style="color: var(--accent-color); font-weight: 600;">Hi, ${currentUser.name}</span>
                <button id="logout-btn" class="btn-secondary" style="padding: 5px 12px; font-size: 13px;">Logout</button>
            `;
            document.getElementById("logout-btn").addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                updateUI();
            });
        } else {
            userArea.innerHTML = `<button id="open-auth-btn" class="btn-primary">Login</button>`;
            document.getElementById("open-auth-btn").addEventListener("click", () => modal.style.display = "flex");
        }
    }
    updateUI();

    // Handle Register
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;

        const user = { name, email };
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Account Created Successfully!");
        modal.style.display = "none";
        updateUI();
    });

    // Handle Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const name = email.split("@")[0]; // extract name from email for demo

        const user = { name, email };
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Logged In Successfully!");
        modal.style.display = "none";
        updateUI();
    });

    // 3. Contact Form Submission Notification
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message! Abanoub will get back to you soon.");
        contactForm.reset();
    });
});

// 1. إرسال نموذج التواصل (Contact Form)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  

const contactForm = document.querySelector('#contact-form'); // تأكد من الـ ID الخاص بالفورم عندك
   
if (contactForm)
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('[name="name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const message = contactForm.querySelector('[name="message"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert('تم إرسال رسالتك وحفظها بنجاح!');
                contactForm.reset();
            } else {
                alert('خطأ: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('تعذر الاتصال بالسيرفر المحلي!');
        }
    });
}