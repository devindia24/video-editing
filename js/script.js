/**
 * MotionCraft Academy — Main JavaScript
 * Handles: mobile menu, smooth scroll, sticky nav, counters,
 * course filters, testimonial carousel, pricing toggle,
 * scroll reveal, back-to-top, form validation.
 */

'use strict';

/* ===========================
   Utility: debounce
   =========================== */
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ===========================
   Utility: throttle
   =========================== */
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/* ===========================
   1. Mobile Menu Toggle
   =========================== */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close on backdrop click
  navLinks.addEventListener('click', e => {
    if (e.target === navLinks) closeMenu();
  });
})();

/* ===========================
   2. Sticky Navbar
   =========================== */
(function initStickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check
})();

/* ===========================
   3. Active Nav Link on Scroll
   =========================== */
(function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = throttle(() => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, 150);

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ===========================
   4. Smooth Scrolling
   =========================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
})();

/* ===========================
   5. Animated Counters
   =========================== */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  function animateCounter(el) {
    const target    = parseInt(el.dataset.target, 10);
    const duration  = 2000;
    const startTime = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);

      // Format with + suffix and commas if needed
      el.textContent = target >= 1000
        ? value.toLocaleString() + (progress >= 1 ? '+' : '')
        : value + (progress >= 1 ? (target === 95 ? '' : '+') : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(counter => observer.observe(counter));
})();

/* ===========================
   6. Course Filter Tabs
   =========================== */
(function initCourseFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (!filterBtns.length || !courseCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Show/hide cards with animation
      courseCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject keyframe for filter animation
  if (!document.getElementById('filterStyles')) {
    const style = document.createElement('style');
    style.id = 'filterStyles';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ===========================
   7. Testimonial Carousel
   =========================== */
(function initTestimonialCarousel() {
  const track  = document.getElementById('testimonialTrack');
  const dotsEl = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (!track || !dotsEl || !prevBtn || !nextBtn) return;

  const cards       = Array.from(track.querySelectorAll('.testimonial-card'));
  const total       = cards.length;
  let   current     = 0;
  let   autoInterval;
  let   isAnimating = false;

  // Determine items per page based on viewport
  function getItemsPerPage() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  let itemsPerPage = getItemsPerPage();

  function getTotalPages() {
    return Math.ceil(total / itemsPerPage);
  }

  // Build dots
  function buildDots() {
    dotsEl.innerHTML = '';
    const pages = getTotalPages();
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === Math.floor(current / itemsPerPage) ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to testimonial page ${i + 1}`);
      dot.setAttribute('aria-selected', i === Math.floor(current / itemsPerPage) ? 'true' : 'false');
      dot.addEventListener('click', () => goToPage(i));
      dotsEl.appendChild(dot);
    }
  }

  // Update dots
  function updateDots() {
    const dots = dotsEl.querySelectorAll('.dot');
    const activePage = Math.floor(current / itemsPerPage);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activePage);
      dot.setAttribute('aria-selected', i === activePage ? 'true' : 'false');
    });
  }

  // Go to slide index
  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    const clampedIndex = Math.max(0, Math.min(index, total - 1));
    current = clampedIndex;

    const cardWidth  = cards[0].offsetWidth + 24; // gap: 24px
    const offset     = -(current * cardWidth);
    track.style.transform = `translateX(${offset}px)`;

    updateDots();
    updateButtons();

    setTimeout(() => { isAnimating = false; }, 520);
  }

  // Go to page (for dots)
  function goToPage(page) {
    goTo(page * itemsPerPage);
  }

  function updateButtons() {
    prevBtn.disabled = current === 0;
    prevBtn.style.opacity = current === 0 ? '0.4' : '1';
    nextBtn.disabled = current >= total - itemsPerPage;
    nextBtn.style.opacity = current >= total - itemsPerPage ? '0.4' : '1';
  }

  function next() {
    if (current + itemsPerPage >= total) {
      goTo(0); // wrap to beginning
    } else {
      goTo(current + itemsPerPage);
    }
  }

  function prev() {
    goTo(Math.max(0, current - itemsPerPage));
  }

  // Start auto-play
  function startAuto() {
    autoInterval = setInterval(next, 5000);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  // Keyboard navigation
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { stopAuto(); prev(); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      stopAuto();
      delta > 0 ? next() : prev();
      startAuto();
    }
  }, { passive: true });

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Resize handler
  window.addEventListener('resize', debounce(() => {
    itemsPerPage = getItemsPerPage();
    current = 0;
    buildDots();
    goTo(0);
  }, 250));

  // Init
  buildDots();
  goTo(0);
  startAuto();
})();

/* ===========================
   8. Pricing Toggle
   =========================== */
(function initPricingToggle() {
  const toggle     = document.getElementById('pricingToggle');
  const priceAmounts = document.querySelectorAll('.price-amount');
  if (!toggle || !priceAmounts.length) return;

  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.setAttribute('aria-checked', String(isAnnual));

    priceAmounts.forEach(el => {
      const monthly = parseInt(el.dataset.monthly, 10);
      const annual  = parseInt(el.dataset.annual,  10);
      const value   = isAnnual ? annual : monthly;

      // Animate price change
      el.style.transform = 'translateY(-8px)';
      el.style.opacity   = '0';
      setTimeout(() => {
        el.textContent = value === 0 ? '$0' : `$${value}`;
        el.style.transform = 'translateY(0)';
        el.style.opacity   = '1';
      }, 150);
    });
  });

  // Ensure smooth CSS transition for price
  if (!document.getElementById('pricingStyles')) {
    const style = document.createElement('style');
    style.id = 'pricingStyles';
    style.textContent = `.price-amount { transition: transform 0.15s ease, opacity 0.15s ease; }`;
    document.head.appendChild(style);
  }
})();

/* ===========================
   9. Scroll Reveal
   =========================== */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  // Use prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ===========================
   10. Back to Top Button
   =========================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = throttle(() => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===========================
   11. Newsletter Form Validation
   =========================== */
(function initNewsletterForm() {
  const form        = document.getElementById('newsletterForm');
  const emailInput  = document.getElementById('emailInput');
  const emailError  = document.getElementById('emailError');
  const formSuccess = document.getElementById('formSuccess');

  if (!form || !emailInput || !emailError || !formSuccess) return;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(value) {
    if (!value.trim()) {
      return 'Please enter your email address.';
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  function showError(message) {
    emailError.textContent = message;
    emailInput.classList.add('error');
    emailInput.setAttribute('aria-invalid', 'true');
  }

  function clearError() {
    emailError.textContent = '';
    emailInput.classList.remove('error');
    emailInput.setAttribute('aria-invalid', 'false');
  }

  // Live validation on blur
  emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    error ? showError(error) : clearError();
  });

  // Clear error on input
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      clearError();
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const error = validateEmail(emailInput.value);
    if (error) {
      showError(error);
      emailInput.focus();
      return;
    }

    clearError();

    // Simulate async submission
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing…';
    }

    setTimeout(() => {
      form.querySelector('.form-group').style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'none';
      form.querySelector('.form-note').style.display = 'none';
      formSuccess.hidden = false;
      formSuccess.focus();
    }, 800);
  });
})();

/* ===========================
   12. Footer: Current Year
   =========================== */
(function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();
