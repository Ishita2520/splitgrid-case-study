/* =============================================
   GrowWise Case Study — script.js
   Scroll animations + smooth interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------
     1. SCROLL FADE-IN for .section elements
     Uses IntersectionObserver to trigger
     the .visible class (defined in CSS)
     which animates opacity + translateY
  ------------------------------------------ */
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ------------------------------------------
     2. STAT COUNTER ANIMATION
     Animates the large numbers in the stats
     grid when they scroll into view
  ------------------------------------------ */
  const statNums = document.querySelectorAll('.stat-card .num');

  function animateValue(el, start, end, duration) {
    const isDecimal = String(end).includes('.');
    const decimals = isDecimal ? String(end).split('.')[1].length : 0;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = start + (end - start) * eased;

      // Reconstruct inner HTML preserving the accent/color spans
      const spans = el.querySelectorAll('span');
      if (spans.length > 0) {
        spans[0].textContent = isDecimal ? current.toFixed(decimals) : Math.floor(current);
      }

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const numEl = entry.target;
        const firstSpan = numEl.querySelector('span');
        if (!firstSpan) return;

        const rawText = firstSpan.textContent.trim();
        const endVal = parseFloat(rawText);
        if (!isNaN(endVal)) {
          animateValue(numEl, 0, endVal, 1200);
        }
        statObserver.unobserve(numEl);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) {
    statObserver.observe(el);
  });


  /* ------------------------------------------
     3. INSIGHT CARD STAGGER
     Adds a slight delay to each card
     so they animate in one by one
  ------------------------------------------ */
  const insightCards = document.querySelectorAll('.insight-card');

  insightCards.forEach(function (card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';
  });

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  insightCards.forEach(function (card) {
    cardObserver.observe(card);
  });


  /* ------------------------------------------
     4. PHONE FRAME HOVER — subtle lift
     Adds a smooth scale on hover to the
     phone frames in the screen showcase
  ------------------------------------------ */
  const phoneFrames = document.querySelectorAll('.phone-frame');

  phoneFrames.forEach(function (frame) {
    frame.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    frame.addEventListener('mouseenter', function () {
      frame.style.transform = 'translateY(-6px)';
      frame.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
    });

    frame.addEventListener('mouseleave', function () {
      frame.style.transform = 'translateY(0)';
      frame.style.boxShadow = 'none';
    });
  });


  /* ------------------------------------------
     5. STEP STAGGER ANIMATION
     Process steps animate in sequentially
  ------------------------------------------ */
  const steps = document.querySelectorAll('.step');

  steps.forEach(function (step, i) {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-16px)';
    step.style.transition = 'opacity 0.45s ease ' + (i * 0.08) + 's, transform 0.45s ease ' + (i * 0.08) + 's';
  });

  const stepObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(function (step) {
    stepObserver.observe(step);
  });


  /* ------------------------------------------
     6. CTA BUTTON PULSE
     Subtle pulse animation on the Figma button
  ------------------------------------------ */
  const ctaBtn = document.querySelector('.cta-btn');

  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function () {
      ctaBtn.style.transform = 'translateY(-3px) scale(1.02)';
    });
    ctaBtn.addEventListener('mouseleave', function () {
      ctaBtn.style.transform = 'translateY(0) scale(1)';
    });
  }

});