/**
 * Loads shared header/footer (and optional inner-page tail) from /partials — same idea as WP get_header / get_footer.
 * Expects placeholders: #site-header, #site-footer; optional #site-inner-tail (service pages).
 */
(function () {
    async function loadText(url) {
        const r = await fetch(url);
        if (!r.ok) throw new Error('Failed to load ' + url);
        return r.text();
    }

    async function init() {
        var headerEl = document.getElementById('site-header');
        var footerEl = document.getElementById('site-footer');
        var innerTailEl = document.getElementById('site-inner-tail');
        if (!headerEl || !footerEl) {
            console.warn('layout: missing #site-header or #site-footer');
            return;
        }

        var base = 'partials/';
        var h = await loadText(base + 'header.html');
        var f = await loadText(base + 'footer.html');
        headerEl.innerHTML = h;
        footerEl.innerHTML = f;

        if (innerTailEl) {
            innerTailEl.innerHTML = await loadText(base + 'inner-tail.html');
        }

        var page = document.body.dataset.page || '';

        document.querySelectorAll('[data-svc]').forEach(function (el) {
            if (el.getAttribute('data-svc') === page) {
                el.classList.add('bg-white/15', 'text-brand-gold');
            }
        });

        primeSubpageReveals();

        initMobileMenu();
        initHeaderScroll();
        initCarousels();
        initContactForm();
        bindNavHashSmoothScroll();
        initScrollReveal();

        document.dispatchEvent(new CustomEvent('sitelayoutready'));
    }

    /** Transparent header + hidden logo at top; solid bar + logo after scroll — home + inner pages */
    function initHeaderScroll() {
        var header = document.getElementById('header');
        var headerLogo = document.getElementById('header-logo');
        if (!header || !headerLogo) return;

        function updateHeaderState() {
            var stuck = window.pageYOffset > 100;
            if (stuck) {
                header.classList.add('header-scrolled');
                headerLogo.classList.remove('header-logo-hidden');
                headerLogo.classList.add('header-logo-visible');
                headerLogo.setAttribute('aria-hidden', 'false');
            } else {
                header.classList.remove('header-scrolled');
                headerLogo.classList.add('header-logo-hidden');
                headerLogo.classList.remove('header-logo-visible');
                headerLogo.setAttribute('aria-hidden', 'true');
            }
        }

        window.addEventListener('scroll', updateHeaderState, { passive: true });
        updateHeaderState();
    }

    function primeSubpageReveals() {
        if (!document.body.classList.contains('page-sub')) return;
        var sections = document.querySelectorAll('main section');
        sections.forEach(function (section, idx) {
            if (idx === 0) {
                var wrap = section.querySelector('.relative.z-10');
                if (wrap) {
                    wrap.classList.add('reveal');
                } else {
                    var h1 = section.querySelector('h1');
                    if (h1) h1.classList.add('reveal');
                }
            } else {
                var inner = section.querySelector(
                    'div.max-w-6xl, div.max-w-7xl, div.max-w-4xl, div.max-w-3xl, div.max-w-5xl'
                );
                if (inner) inner.classList.add('reveal');
                else section.classList.add('reveal');
            }
        });
        document.querySelectorAll('#site-inner-tail section').forEach(function (section) {
            var inner =
                section.querySelector('div.max-w-4xl, div.max-w-6xl, div.max-w-7xl') ||
                section.querySelector('div.grid');
            if (inner) inner.classList.add('reveal');
            else section.classList.add('reveal');
        });
    }

    function initScrollReveal() {
        document.querySelectorAll('.reveal').forEach(function (el) {
            var revealObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            revealObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );
            revealObserver.observe(el);
        });
    }

    function initMobileMenu() {
        var mobileMenuBtn = document.getElementById('mobile-menu-btn');
        var closeMobileMenu = document.getElementById('close-mobile-menu');
        var mobileMenu = document.getElementById('mobile-menu');
        var mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        if (!mobileMenuBtn || !mobileMenu) return;

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            mobileMenuOverlay.classList.remove('opacity-0', 'invisible');
            mobileMenuOverlay.classList.add('opacity-100', 'visible');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenuFn() {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.add('opacity-0', 'invisible');
            mobileMenuOverlay.classList.remove('opacity-100', 'visible');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeMobileMenuFn);
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFn);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMobileMenuFn();
        });

        window.__closeMobileMenu = closeMobileMenuFn;
    }

    function initCarousels() {
        document.querySelectorAll('[data-carousel]').forEach(function (track) {
            var wrap = track.closest('.sc-carousel-wrap');
            if (!wrap) return;
            var prev = wrap.querySelector('.sc-carousel-btn.prev');
            var next = wrap.querySelector('.sc-carousel-btn.next');
            function step() {
                return Math.min(track.clientWidth * 0.85, 420);
            }
            if (prev) {
                prev.addEventListener('click', function () {
                    track.scrollBy({ left: -step(), behavior: 'smooth' });
                });
            }
            if (next) {
                next.addEventListener('click', function () {
                    track.scrollBy({ left: step(), behavior: 'smooth' });
                });
            }
        });
    }

    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;
        var success = document.getElementById('form-success');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var hp = form.querySelector('[name="comments"]');
            if (hp && hp.value) return;
            if (success) success.classList.remove('hidden');
            form.reset();
            setTimeout(function () {
                if (success) success.classList.add('hidden');
            }, 5000);
        });
    }

    function bindNavHashSmoothScroll() {
        function onIndexDocument() {
            var p = window.location.pathname || '';
            return p === '/' || /index\.html$/i.test(p);
        }
        document.querySelectorAll('a.nav-hash[href*="index.html#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (!document.body.classList.contains('page-home')) return;
                if (!onIndexDocument()) return;
                e.preventDefault();
                var hash = (a.getAttribute('href') || '').split('#')[1];
                if (!hash) return;
                var target = document.getElementById(hash);
                if (!target) return;
                var headerOffset = 100;
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
                if (window.__closeMobileMenu) window.__closeMobileMenu();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
