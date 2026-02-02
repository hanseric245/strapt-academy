// ========================================
// Strapt Academy - Enhanced JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Page Load Animation
    // ========================================
    document.body.classList.add('loaded');

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Intersection Observer - Scroll Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for grid items
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate sections
    document.querySelectorAll('.section').forEach(el => {
        el.classList.add('animate-section');
        observer.observe(el);
    });

    // Animate cards with stagger
    document.querySelectorAll('.pathway-card, .product-card, .pricing-card, .benefit-item').forEach((el, index) => {
        el.classList.add('animate-card');
        el.dataset.delay = (index % 4) * 100;
        observer.observe(el);
    });

    // Animate method steps with stagger
    document.querySelectorAll('.method-step').forEach((el, index) => {
        el.classList.add('animate-card');
        el.dataset.delay = index * 150;
        observer.observe(el);
    });

    // Animate visual cards
    document.querySelectorAll('.visual-card').forEach((el, index) => {
        el.classList.add('animate-card');
        el.dataset.delay = index * 100;
        observer.observe(el);
    });

    // Animate split content
    document.querySelectorAll('.split-image, .split-text').forEach(el => {
        el.classList.add('animate-slide');
        observer.observe(el);
    });

    // ========================================
    // Parallax Effect
    // ========================================
    const parallaxElements = document.querySelectorAll('.hero, .page-header');

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = scrollY * speed;
            const overlay = el.querySelector('.hero-overlay, .hero-fallback');
            if (overlay) {
                overlay.style.transform = `translate3d(0, ${yPos * 0.3}px, 0)`;
            }
            const content = el.querySelector('.hero-content');
            if (content) {
                content.style.transform = `translate3d(0, ${yPos * 0.4}px, 0)`;
                content.style.opacity = 1 - (scrollY / 700);
            }
        });
    }

    window.addEventListener('scroll', function() {
        requestAnimationFrame(updateParallax);
    }, { passive: true });

    // ========================================
    // Magnetic Buttons
    // ========================================
    const magneticButtons = document.querySelectorAll('.btn-primary');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // ========================================
    // Text Reveal Animation
    // ========================================
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';

        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.style.animationDelay = `${index * 0.1 + 0.5}s`;
            span.textContent = word + ' ';
            heroTitle.appendChild(span);
        });
    }

    // ========================================
    // Image Tilt Effect
    // ========================================
    const tiltElements = document.querySelectorAll('.pathway-card, .visual-card');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ========================================
    // Cursor Glow Effect
    // ========================================
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        glowX += (cursorX - glowX) * 0.1;
        glowY += (cursorY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide cursor glow on mobile
    if (window.innerWidth < 768) {
        cursorGlow.style.display = 'none';
    }

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.step-number');

    counters.forEach(counter => {
        counter.classList.add('counter');
    });

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalContent = button.innerHTML;

            button.innerHTML = '<span class="success-check">✓</span>';
            button.classList.add('success');

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('success');
                this.reset();
            }, 2000);
        });
    });

    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Sent!';
                button.classList.add('success');

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('success');
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    // ========================================
    // Video Fallback
    // ========================================
    const heroVideo = document.querySelector('.hero-video');
    const heroFallback = document.querySelector('.hero-fallback');

    if (heroVideo && heroFallback) {
        heroVideo.addEventListener('error', function() {
            heroVideo.style.display = 'none';
            heroFallback.style.opacity = '1';
        });

        setTimeout(() => {
            if (heroVideo.readyState < 2) {
                heroVideo.style.display = 'none';
                heroFallback.style.opacity = '1';
            }
        }, 5000);
    }

    // ========================================
    // Add to Cart Animation
    // ========================================
    const cartCount = document.querySelector('.cart-count');

    window.addToCart = function() {
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
            cartCount.classList.add('bounce');

            // Create flying dot animation
            const dot = document.createElement('div');
            dot.className = 'flying-dot';
            document.body.appendChild(dot);

            setTimeout(() => {
                dot.remove();
                cartCount.classList.remove('bounce');
            }, 600);
        }
    };

    // ========================================
    // Smooth Page Transitions
    // ========================================
    document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.href;

                document.body.classList.add('page-transition');

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });

});

// Remove page transition class on page load
window.addEventListener('pageshow', function() {
    document.body.classList.remove('page-transition');
});
