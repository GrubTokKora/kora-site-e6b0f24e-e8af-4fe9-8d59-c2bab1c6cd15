/** Homepage-only: FAQ, reviews slider, in-page #hash links. Scroll reveal runs in layout.js for all pages. */
document.addEventListener('sitelayoutready', function () {
    if (!document.body.classList.contains('page-home')) return;

    // If opened with a hash (e.g. from another page: index.html#about), scroll with fixed-header offset
    function scrollToHashTarget() {
        var hash = window.location.hash;
        if (!hash || hash.length < 2) return;
        var id = hash.slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                var headerOffset = 100;
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }
    scrollToHashTarget();
    window.addEventListener('hashchange', scrollToHashTarget);

    // FAQ Accordion
    document.querySelectorAll('.faq-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var content = trigger.nextElementSibling;
            var icon = trigger.querySelector('.faq-icon');
            var isOpen = content.classList.contains('open');
            document.querySelectorAll('.faq-content').forEach(function (c) {
                c.classList.remove('open');
            });
            document.querySelectorAll('.faq-icon').forEach(function (i) {
                i.classList.remove('open');
            });
            if (!isOpen) {
                content.classList.add('open');
                if (icon) icon.classList.add('open');
            }
        });
    });

    // Reviews Slider
    var reviewsTrack = document.getElementById('reviews-track');
    var prevReview = document.getElementById('prev-review');
    var nextReview = document.getElementById('next-review');
    var reviewDots = document.querySelectorAll('.review-dot');
    var currentReview = 0;
    var totalReviews = 6;

    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateSlider() {
        if (!reviewsTrack) return;
        var slidesPerView = getSlidesPerView();
        var slideWidth = 100 / slidesPerView;
        reviewsTrack.style.transform = 'translateX(-' + currentReview * slideWidth + '%)';
        reviewDots.forEach(function (dot, index) {
            if (index === currentReview) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-brand-gold');
            } else {
                dot.classList.add('bg-gray-300');
                dot.classList.remove('bg-brand-gold');
            }
        });
    }

    if (prevReview && nextReview && reviewsTrack) {
        prevReview.addEventListener('click', function () {
            currentReview = currentReview > 0 ? currentReview - 1 : totalReviews - getSlidesPerView();
            updateSlider();
        });
        nextReview.addEventListener('click', function () {
            var spv = getSlidesPerView();
            currentReview = currentReview < totalReviews - spv ? currentReview + 1 : 0;
            updateSlider();
        });
        reviewDots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                currentReview = index;
                updateSlider();
            });
        });
        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    // Smooth scroll for same-page # links (hero CTAs, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var headerOffset = 100;
            var offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            if (window.__closeMobileMenu) window.__closeMobileMenu();
        });
    });
});
