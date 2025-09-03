document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    const scrollUpBtn = document.querySelector(".scroll-up-btn");
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".navbar .menu");
    const menuLinks = document.querySelectorAll(".navbar .menu a");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) navbar.classList.add("sticky");
        else navbar.classList.remove("sticky");

        if (window.scrollY > 500) scrollUpBtn.classList.add("show");
        else scrollUpBtn.classList.remove("show");
    });

    scrollUpBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        const icon = menuBtn.querySelector("i");
        icon.classList.toggle("fa-times");
        icon.classList.toggle("fa-bars");
    });
    
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    });

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 
    });
    
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

 
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            collisions: { enable: true },
            move: {
                direction: "none", enable: true, outModes: { default: "bounce" },
                random: false, speed: 1, straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    });
    
    
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
       
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_UNIQUE_ID';

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = "Thanks for your message!";
                formStatus.style.color = "lightgreen";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form";
                    }
                    formStatus.style.color = "red";
                })
            }
        }).catch(error => {
            formStatus.textContent = "Oops! There was a problem submitting your form";
            formStatus.style.color = "red";
        });
    }
    form.addEventListener("submit", handleSubmit);
});