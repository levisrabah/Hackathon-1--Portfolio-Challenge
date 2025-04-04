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
            let isValid = true;

            // Validate each field
            const fields = ["name", "email", "message"];
            fields.forEach(field => {
                const input = document.getElementById(field);
                const error = input.nextElementSibling;

                if (!input.value.trim()) {
                    error.style.display = "block";
                    isValid = false;
                } else {
                    error.style.display = "none";
                }
            });

            if (isValid) {
                alert("Message sent successfully!");
                contactForm.reset();
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

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentNode;
            item.classList.toggle('active');
        });
    });
});

// Animate progress bars on scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0';
        const targetWidth = bar.getAttribute('style').match(/\d+/)[0];
        setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
        }, 100);
    });
};

window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    if (isInViewport(skillsSection)) {
        animateProgressBars();
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}