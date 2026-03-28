(function () {
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
    closeMobileMenu.addEventListener('click', closeMobileMenuFn);
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFn);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobileMenuFn();
    });

    var contactForm = document.getElementById('contact-form');
    var formSuccess = document.getElementById('form-success');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var hp = document.getElementById('comments');
            if (hp && hp.value) return;
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            setTimeout(function () {
                formSuccess.classList.add('hidden');
            }, 5000);
        });
    }
})();
