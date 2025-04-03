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
    if (contactForm) {
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
    }

    // Scroll down indicator animation
    const scrollDownIndicator = document.querySelector(".scroll-down");
    if (scrollDownIndicator) {
        scrollDownIndicator.classList.add("animate");
    }

    // Function to dynamically load components
    const loadComponent = async (id, filePath) => {
        const container = document.getElementById(id);
        if (container) {
            try {
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    container.innerHTML = content;
                } else {
                    console.error(`Failed to load ${filePath}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error loading component ${filePath}:`, error);
            }
        }
    };

    // Load all components
    loadComponent("hero", "components/hero.html");
    loadComponent("about", "components/about.html");
    loadComponent("skills", "components/skills.html");
    loadComponent("projects", "components/projects.html");
    loadComponent("experience", "components/experience.html");
    loadComponent("education", "components/education.html");
    loadComponent("contact", "components/contact.html");
});