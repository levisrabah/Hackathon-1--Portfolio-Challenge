document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        const currentTheme = document.body.classList.contains("dark-mode") ? "Dark" : "Light";
        localStorage.setItem("theme", currentTheme);
    });

    // Load theme from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.toggle("dark-mode", savedTheme === "Dark");
    }

    // Form validation
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("Form submitted successfully!");
            contactForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Scroll down indicator animation
    const scrollDownIndicator = document.querySelector(".scroll-down");
    if (scrollDownIndicator) {
        scrollDownIndicator.classList.add("animate");
    }
});