// ========================================
// Strapt Academy - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

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

        // Close menu when clicking a link
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

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

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
    // Newsletter Form
    // ========================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simulate form submission
            const button = this.querySelector('button');
            const originalContent = button.innerHTML;

            button.innerHTML = '✓';
            button.style.background = '#22c55e';

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = '';
                this.reset();
            }, 2000);

            console.log('Newsletter signup:', email);
        });
    });

    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Sent!';
                button.style.background = '#22c55e';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);

            console.log('Contact form submitted:', data);
        });
    }

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.pathway-card, .method-step, .visual-card, .product-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

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

        // Also show fallback if video doesn't load within 5 seconds
        setTimeout(() => {
            if (heroVideo.readyState < 2) {
                heroVideo.style.display = 'none';
                heroFallback.style.opacity = '1';
            }
        }, 5000);
    }

    // ========================================
    // Add to Cart Animation (placeholder)
    // ========================================
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    window.addToCart = function() {
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        }
    };

});

// ========================================
// CSS for animations (injected)
// ========================================
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .header.scrolled {
        background: rgba(0, 0, 0, 0.98);
    }

    body.menu-open {
        overflow: hidden;
    }

    .cart-count.bounce {
        animation: bounce 0.3s ease;
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);
