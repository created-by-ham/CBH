// ============================================
// CREATED BY HAM — site scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });
  }

  /* ---- Gallery filter (gallery.html) ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.masonry-grid figure');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var show = cat === 'all' || item.getAttribute('data-category') === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.masonry-grid figure, .work-grid a').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var img = el.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        if (lbCaption) lbCaption.textContent = img.alt || '';
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() { lightbox.classList.remove('open'); }
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---- Contact form -> FormSubmit ---- */
  // This form submits normally (no AJAX interception): the browser posts
  // directly to FormSubmit via the form's own action/method attributes,
  // and FormSubmit redirects to the URL in the hidden _next field
  // (thank-you.html) once it's processed. All this JS does is show a
  // brief "Sending..." state on the button so there's feedback before
  // the redirect happens.
  // NOTE: the first submission after deploying goes to FormSubmit's
  // "activate your form" step — the inbox owner has to click the
  // confirmation link they get by email before submissions start
  // arriving normally, and before the thank-you redirect will fire.
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      // No preventDefault — let the browser submit and follow FormSubmit's redirect.
    });
  }

});
