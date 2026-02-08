// =============================================
// MOBILE MENU TOGGLE
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function () {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =============================================
    // CONNECT BUTTON (prevent default navigation)
    // =============================================
    const connectButton = document.querySelector('.connect-button');
    if (connectButton) {
        connectButton.addEventListener('click', function (e) {
            e.preventDefault();
        });
    }

    // =============================================
    // FADE-IN ANIMATION ON SCROLL
    // =============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    }

    // =============================================
    // TIMELINE INDICATOR (only on index page)
    // =============================================
    const timelineIndicator = document.querySelector('.timeline-indicator');
    const timelineSection = document.querySelector('#timeline');
    const heroSection = document.querySelector('#home');

    if (timelineIndicator && timelineSection && heroSection) {
        function checkTimelineIndicatorVisibility() {
            var timelineBounds = timelineSection.getBoundingClientRect();
            var heroBounds = heroSection.getBoundingClientRect();

            if (heroBounds.bottom > 0 && timelineBounds.top > window.innerHeight) {
                timelineIndicator.style.display = 'flex';
            } else {
                timelineIndicator.style.display = 'none';
            }
        }

        window.scrollToTimeline = function () {
            timelineSection.scrollIntoView({ behavior: 'smooth' });
        };

        window.addEventListener('scroll', checkTimelineIndicatorVisibility);
        checkTimelineIndicatorVisibility();
    }

    // =============================================
    // NAME DROPDOWN AUTO-SHOW (only on index page)
    // =============================================
    const nameDropdown = document.querySelector('.name-dropdown');
    if (nameDropdown) {
        function showDropdown() {
            nameDropdown.style.opacity = '1';
            nameDropdown.style.visibility = 'visible';
            nameDropdown.style.transform = 'translateY(0)';

            setTimeout(function () {
                nameDropdown.style.opacity = '';
                nameDropdown.style.visibility = '';
                nameDropdown.style.transform = '';
            }, 2000);
        }

        // Only auto-show on index page
        if (
            window.location.pathname.endsWith('index.html') ||
            window.location.pathname.endsWith('/') ||
            window.location.pathname.endsWith('/portfolio/') ||
            window.location.pathname.endsWith('/portfolio')
        ) {
            showDropdown();
        }

        // Show when clicking home icon
        document.querySelectorAll('a[href="index.html"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (
                    window.location.pathname.endsWith('index.html') ||
                    window.location.pathname.endsWith('/')
                ) {
                    e.preventDefault();
                    showDropdown();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // =============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
