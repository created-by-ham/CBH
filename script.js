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
  // The form's `action` attribute (set on the <form> tag itself) already
  // points at https://formsubmit.co/<email>. This just submits the same
  // data via FormSubmit's AJAX endpoint so the page doesn't have to redirect.
  // NOTE: the first submission after deploying goes to FormSubmit's
  // "activate your form" step — the inbox owner has to click the
  // confirmation link they get by email before submissions start
  // arriving normally.
  var form = document.querySelector('#contact-form');
  if (form) {
    var statusEl = document.querySelector('.form-status');
    var actionUrl = form.getAttribute('action') || '';
    var ajaxUrl = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (value, key) { payload[key] = value; });

      fetch(ajaxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then(function () {
          showStatus(true);
          form.reset();
        })
        .catch(function () {
          showStatus(false);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });

      function showStatus(ok) {
        if (!statusEl) return;
        statusEl.classList.remove('ok', 'err');
        statusEl.classList.add('show', ok ? 'ok' : 'err');
        statusEl.textContent = ok
          ? "Thanks — I've got your message and will be in touch soon."
          : "Something went wrong sending that. Give me a call instead — (817) 401-2226.";
      }
    });
  }

});
