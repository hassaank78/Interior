/**
 * Main Application Controller for Interior Designer Website Template
 * 
 * Coordinates personalization, left-attached navigation drawer,
 * sticky header state, consultation form UX, and services catalog.
 */

import { siteConfig } from './config.js';
import { getPersonalizedData, applyPersonalization } from './personalization.js';
import { renderFeaturedProjects, renderProjectsPortfolio, initProjectDetail } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Personalization from URL parameters
  const personalizedData = getPersonalizedData();
  applyPersonalization(personalizedData);

  // 2. Initialize Navigation Drawer and Sticky Header
  initNavigation();

  // 3. Render Page-Specific Data
  renderServices(personalizedData);
  initPageContent();

  // 4. Consultation Form Handling
  initConsultationForm(personalizedData);
});

/**
 * Mobile Left-Attached Navigation Drawer and Sticky Header Scroll Tracking
 */
function initNavigation() {
  const toggleBtn = document.querySelector('.header__nav-toggle');
  const navMenu = document.querySelector('.header__nav');
  const header = document.querySelector('.header');

  // Create or select backdrop overlay (NO BLUR FILTER)
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const openDrawer = () => {
    if (!toggleBtn || !navMenu) return;
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    backdrop.classList.add('is-visible');
    document.body.classList.add('nav-open');
  };

  const closeDrawer = () => {
    if (!toggleBtn || !navMenu) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('nav-open');
  };

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeDrawer();
      else openDrawer();
    });

    // Close on clicking backdrop
    backdrop.addEventListener('click', closeDrawer);

    // Close on drawer internal close button (if present)
    const drawerCloseBtn = navMenu.querySelector('.header__drawer-close');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeDrawer();
        toggleBtn.focus();
      }
    });

    // Close drawer when clicking internal links on mobile
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeDrawer();
        }
      });
    });
  }

  // Sticky header scroll shadow tracking
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
}

/**
 * Render Services on Homepage and Services Page (Friendly, approachable English)
 */
function renderServices(data) {
  const homepageContainer = document.getElementById('services-grid-home');
  const fullServicesContainer = document.getElementById('services-grid-full');

  let servicesToRender = siteConfig.services;

  // Filter if activeServicesList is specified in URL query
  if (data.activeServicesList && data.activeServicesList.length > 0) {
    const normalizedQueryList = data.activeServicesList.map(s => s.toLowerCase());
    servicesToRender = siteConfig.services.filter(srv => 
      normalizedQueryList.some(q => srv.title.toLowerCase().includes(q))
    );
    if (servicesToRender.length === 0) {
      servicesToRender = siteConfig.services;
    }
  }

  // Render on Homepage (Section 4: 2x2 Grid)
  if (homepageContainer) {
    const currentParams = new URLSearchParams(window.location.search).toString();
    const servicesPageUrl = currentParams ? `services/?${currentParams}` : 'services/';
    const homeServices = servicesToRender.slice(0, 4);

    homepageContainer.innerHTML = homeServices.map((service, idx) => `
      <article class="service-card-compact">
        <div class="service-card-compact__img-wrap">
          <img 
            src="${service.image}" 
            alt="${service.title}" 
            loading="${idx < 2 ? 'eager' : 'lazy'}" 
            width="500" 
            height="350"
            class="service-card-compact__img"
          />
        </div>
        <div class="service-card-compact__content">
          <h3 class="service-card-compact__title">${service.title}</h3>
          <p class="service-card-compact__desc">${service.shortDescription}</p>
          <a href="${servicesPageUrl}#${service.id}" class="service-card-compact__link">
            <span>Learn More</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `).join('');
  }

  // Render on Dedicated Services Page
  if (fullServicesContainer) {
    fullServicesContainer.innerHTML = servicesToRender.map((service, idx) => `
      <section id="${service.id}" class="service-detail-section ${idx % 2 === 1 ? 'service-detail-section--reversed' : ''}">
        <div class="service-detail__image-box">
          <img 
            src="${service.image}" 
            alt="${service.title} - Interior Work" 
            loading="${idx < 2 ? 'eager' : 'lazy'}" 
            width="900" 
            height="650"
            class="service-detail__img"
          />
        </div>
        <div class="service-detail__text-box">
          <span class="service-detail__step">Service 0${idx + 1}</span>
          <h2 class="service-detail__title">${service.title}</h2>
          <p class="service-detail__lead">${service.shortDescription}</p>
          <p class="service-detail__body">${service.fullDescription}</p>
          
          <div class="service-detail__features">
            <h4 class="service-detail__features-heading">What's Included:</h4>
            <ul class="service-detail__features-list">
              ${service.features.map(f => `
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="service-detail__cta-row">
            <a href="../contact/#consultation" class="btn btn--primary">Get a Quote for This Service</a>
            <a href="https://wa.me/${data.phoneDigits}?text=${encodeURIComponent(`Hi ${data.name}, I want to know more about ${service.title}.`)}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    `).join('');
  }
}

/**
 * Initialize Page-Specific Elements
 */
function initPageContent() {
  renderFeaturedProjects('featured-projects-grid');
  renderProjectsPortfolio('portfolio-grid', 'project-filters');
  initProjectDetail();
  initReviewsDeck();
}

/**
 * Interactive Client Reviews Deck
 * Highlights the middle review by default; side reviews sit behind.
 * Clicking any review highlights that specific review and centers it smoothly.
 */
function initReviewsDeck() {
  const track = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');
  const dotsContainer = document.getElementById('reviews-dots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card-deck'));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.reviews-dot')) : [];
  if (cards.length === 0) return;

  let activeIndex = 1; // Middle review highlighted by default

  const updateDeckPosition = () => {
    cards.forEach((card, idx) => {
      const isCardActive = idx === activeIndex;
      if (isCardActive) {
        card.classList.add('is-active');
        card.classList.remove('is-side');
        card.setAttribute('aria-label', `Review by ${card.querySelector('.testimonial-card__name')?.textContent || ''} - Currently highlighted`);
      } else {
        card.classList.remove('is-active');
        card.classList.add('is-side');
        card.setAttribute('aria-label', `Review by ${card.querySelector('.testimonial-card__name')?.textContent || ''} - Click to highlight`);
      }
    });

    dots.forEach((dot, idx) => {
      const isSelected = idx === activeIndex;
      dot.classList.toggle('is-active', isSelected);
      dot.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Translate track on desktop so the active card stays in the middle
    if (window.innerWidth > 768 && cards.length >= 3) {
      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth;
      const trackStyles = window.getComputedStyle(track);
      const gap = parseFloat(trackStyles.gap) || 24;
      const offset = (1 - activeIndex) * (cardWidth + gap);
      track.style.transform = `translateX(${offset}px)`;
    } else {
      track.style.transform = 'none';
    }
  };

  const setActiveReview = (index) => {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    activeIndex = index;
    updateDeckPosition();
  };

  // Card click & keyboard interaction to highlight
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (activeIndex !== idx) {
        setActiveReview(idx);
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveReview(idx);
      }
    });
  });

  // Prev / Next button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setActiveReview(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setActiveReview(activeIndex + 1);
    });
  }

  // Dot button navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setActiveReview(idx);
    });
  });

  // Handle window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateDeckPosition, 100);
  });

  // Touch swipe support for mobile
  let startX = 0;
  let endX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveReview(activeIndex + 1); // Swiped left -> next
      } else {
        setActiveReview(activeIndex - 1); // Swiped right -> prev
      }
    }
  }, { passive: true });

  // Initial call to align positions
  updateDeckPosition();
}

/**
 * Handles Consultation Form Validation and Honest Demo Submission UX
 */
function initConsultationForm(data) {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const clientName = formData.get('name') || 'Homeowner';
    const clientContact = formData.get('contact') || '';
    const projectType = formData.get('projectType') || 'Home Interior';
    const location = formData.get('location') || data.city;
    const budget = formData.get('budget') || 'Flexible / To be discussed';
    const message = formData.get('message') || '';

    showDemoSubmissionModal({
      clientName,
      clientContact,
      projectType,
      location,
      budget,
      message,
      studioName: data.name,
      studioPhoneDigits: data.phoneDigits,
      studioEmail: data.email
    });

    form.reset();
  });
}

/**
 * Displays an honest, friendly demo modal
 */
function showDemoSubmissionModal(details) {
  let modalOverlay = document.getElementById('consultation-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'consultation-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const whatsappMessage = encodeURIComponent(
    `Hi ${details.studioName} Team,\n\nI want to inquire about home interior design:\n` +
    `• Name: ${details.clientName}\n` +
    `• Contact: ${details.clientContact}\n` +
    `• Service: ${details.projectType}\n` +
    `• Location: ${details.location}\n` +
    `• Budget: ${details.budget}\n` +
    `• Details: ${details.message}\n\nPlease let me know when we can discuss.`
  );

  const emailSubject = encodeURIComponent(`Interior Inquiry: ${details.projectType} in ${details.location}`);
  const emailBody = encodeURIComponent(
    `Hi ${details.studioName} Team,\n\n` +
    `I would like to discuss an interior project with your studio.\n\n` +
    `Details:\n` +
    `- Name: ${details.clientName}\n` +
    `- Contact: ${details.clientContact}\n` +
    `- Project Type: ${details.projectType}\n` +
    `- Location: ${details.location}\n` +
    `- Budget: ${details.budget}\n` +
    `- Message: ${details.message}\n\n` +
    `Thanks,\n${details.clientName}`
  );

  modalOverlay.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" class="modal-close" aria-label="Close dialog">&times;</button>
      
      <div class="modal-header">
        <div class="modal-icon" aria-hidden="true">✓</div>
        <h3 id="modal-title" class="modal-title">Inquiry Ready!</h3>
        <p class="modal-subtitle">Preview Mode for <strong>${details.studioName}</strong></p>
      </div>

      <div class="modal-body">
        <div class="modal-alert-box">
          <p>This demo website is currently in <strong>live preview mode</strong>. In production, this form connects directly to your business email, CRM, or WhatsApp.</p>
        </div>

        <div class="modal-summary">
          <p><strong>Name:</strong> ${details.clientName} (${details.clientContact})</p>
          <p><strong>Project:</strong> ${details.projectType} • ${details.location}</p>
          <p><strong>Budget:</strong> ${details.budget}</p>
        </div>

        <p class="modal-cta-prompt">You can test sending this inquiry right now:</p>
        
        <div class="modal-actions">
          <a href="https://wa.me/${details.studioPhoneDigits}?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp modal-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.449.741.964 1.2.662.589 1.22.771 1.393.858.173.087.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
            </svg>
            Send on WhatsApp
          </a>

          <a href="mailto:${details.studioEmail}?subject=${emailSubject}&body=${emailBody}" class="btn btn--outline modal-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Send via Email
          </a>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('is-visible');
  document.body.classList.add('modal-open');

  const closeBtn = modalOverlay.querySelector('.modal-close');
  const closeModal = () => {
    modalOverlay.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}
