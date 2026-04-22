/* ============================================================
   LPK Namdong - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navigation ---
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Active Navigation Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Animations (IntersectionObserver) ---
  const animElements = document.querySelectorAll('.animate-on-scroll');
  if (animElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach(el => observer.observe(el));
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.textContent = prefix + Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + target + suffix;
            }
          };
          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Registration Form ---
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      regForm.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.classList.remove('error');
      });
      regForm.querySelectorAll('.form-error').forEach(err => {
        err.style.display = 'none';
      });

      // Validate required fields
      const name = regForm.querySelector('#regName');
      const age = regForm.querySelector('#regAge');
      const education = regForm.querySelector('#regEducation');
      const phone = regForm.querySelector('#regPhone');
      const program = regForm.querySelector('#regProgram');

      if (!name.value.trim()) { showError(name); isValid = false; }
      if (!age.value.trim() || isNaN(age.value) || age.value < 18 || age.value > 45) { showError(age); isValid = false; }
      if (!education.value) { showError(education); isValid = false; }
      if (!phone.value.trim() || phone.value.length < 10) { showError(phone); isValid = false; }
      if (!program.value) { showError(program); isValid = false; }

      if (isValid) {
        // Build WhatsApp message
        const message = `Halo LPK Namdong! Saya ingin mendaftar.%0A%0ANama: ${name.value}%0AUsia: ${age.value}%0APendidikan: ${education.value}%0ANo. HP: ${phone.value}%0AProgram: ${program.value}`;
        const waUrl = `https://wa.me/6287723648549?text=${message}`;
        window.open(waUrl, '_blank');
      }
    });
  }

  function showError(input) {
    input.classList.add('error');
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
      errorEl.style.display = 'block';
    }
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#contactName').value;
      const msg = contactForm.querySelector('#contactMessage').value;
      const message = `Halo LPK Namdong!%0A%0ANama: ${name}%0APesan: ${msg}`;
      const waUrl = `https://wa.me/6287723648549?text=${message}`;
      window.open(waUrl, '_blank');
    });
  }
});
