/* =========================================================
   WAIT FOR PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ====================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 300);

    });


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ====================================================== */

    const navItems = document.querySelectorAll(".nav-link");

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =====================================================
       TYPING EFFECT
    ====================================================== */

    const typingText = document.getElementById("typingText");

    const roles = [
        "Frontend Developer",
        "Web Developer",
        "UI Developer",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeEffect, 1400);

                return;
            }

        } else {

            typingText.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

            }

        }

        const speed = deleting ? 45 : 75;

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    const scrollProgress =
        document.getElementById("scrollProgress");

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width = `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAV LINK
    ====================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       NUMBER COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll("[data-count]");


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(counter.dataset.count);

                    let current = 0;

                    const duration = 900;

                    const step =
                        Math.max(
                            1,
                            Math.ceil(
                                target / (duration / 20)
                            )
                        );


                    const timer =
                        setInterval(() => {

                            current += step;

                            if (current >= target) {

                                current = target;

                                clearInterval(timer);

                            }

                            counter.textContent =
                                current;

                        }, 20);


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       PROJECT FILTER
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            projectCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       TESTIMONIAL SLIDER
    ====================================================== */

    const testimonials = [

        {
            text:
                "Hassan was very professional and focused on creating a clean and responsive website. The final result looked modern and worked smoothly on different devices.",

            name:
                "Client Feedback",

            role:
                "Website Project"
        },

        {
            text:
                "The website had a clean design and the responsive layout worked really well on mobile. Communication throughout the project was also great.",

            name:
                "Business Client",

            role:
                "Business Website"
        },

        {
            text:
                "A simple and professional website with good attention to spacing, typography and user experience.",

            name:
                "Project Client",

            role:
                "Landing Page"
        }

    ];


    let testimonialIndex = 0;


    const testimonialText =
        document.getElementById("testimonialText");

    const testimonialName =
        document.getElementById("testimonialName");

    const testimonialRole =
        document.getElementById("testimonialRole");

    const testimonialDots =
        document.getElementById("testimonialDots");


    function showTestimonial(index) {

        const item =
            testimonials[index];

        testimonialText.textContent =
            item.text;

        testimonialName.textContent =
            item.name;

        testimonialRole.textContent =
            item.role;


        document
            .querySelectorAll(".testimonial-dots button")
            .forEach((dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            });

    }


    testimonials.forEach((_, index) => {

        const dot =
            document.createElement("button");

        dot.setAttribute(
            "aria-label",
            `Show testimonial ${index + 1}`
        );

        dot.addEventListener("click", () => {

            testimonialIndex = index;

            showTestimonial(testimonialIndex);

        });

        testimonialDots.appendChild(dot);

    });


    document
        .getElementById("prevTestimonial")
        .addEventListener("click", () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {
                testimonialIndex =
                    testimonials.length - 1;
            }

            showTestimonial(testimonialIndex);

        });


    document
        .getElementById("nextTestimonial")
        .addEventListener("click", () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonials.length
            ) {
                testimonialIndex = 0;
            }

            showTestimonial(testimonialIndex);

        });


    showTestimonial(0);


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formSuccess =
        document.getElementById("formSuccess");


    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");


        let isValid = true;


        /* Clear previous errors */

        document
            .querySelectorAll(".form-group")
            .forEach(group => {

                group.classList.remove("error");

                const error =
                    group.querySelector(".error-message");

                if (error) {
                    error.textContent = "";
                }

            });


        /* Name */

        if (name.value.trim() === "") {

            showError(
                name,
                "Please enter your name."
            );

            isValid = false;
        }


        /* Email */

        if (email.value.trim() === "") {

            showError(
                email,
                "Please enter your email."
            );

            isValid = false;

        } else if (!isValidEmail(email.value)) {

            showError(
                email,
                "Please enter a valid email."
            );

            isValid = false;
        }


        /* Subject */

        if (subject.value.trim() === "") {

            showError(
                subject,
                "Please enter a subject."
            );

            isValid = false;
        }


        /* Message */

        if (message.value.trim().length < 10) {

            showError(
                message,
                "Message should contain at least 10 characters."
            );

            isValid = false;
        }


        /* Success */

        if (isValid) {

            formSuccess.classList.add("show");

            contactForm.reset();


            setTimeout(() => {

                formSuccess.classList.remove("show");

            }, 5000);

        }

    });


    function showError(input, message) {

        const group =
            input.closest(".form-group");

        group.classList.add("error");

        const error =
            group.querySelector(".error-message");

        error.textContent = message;

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function toggleBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        toggleBackToTop,
        { passive: true }
    );


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();


    /* =====================================================
       INITIAL SCROLL FUNCTIONS
    ====================================================== */

    updateScrollProgress();

    updateActiveLink();

});