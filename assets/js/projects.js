/**
 * Projects Portfolio & Reusable Detail Controller
 * 
 * Handles data-driven rendering of project cards with clear, friendly,
 * approachable copy, horizontal scrollable rail on homepage, and filterable grid on portfolio page.
 */

import { siteConfig } from './config.js';

/**
 * Helper to build link to project detail page, preserving existing query parameters
 */
export function getProjectUrl(projectId, basePath = '') {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.set('id', projectId);
  
  const isInsideProjectsDir = window.location.pathname.includes('/projects/');
  const targetPath = isInsideProjectsDir ? 'project.html' : 'projects/project.html';
  return `${targetPath}?${currentParams.toString()}`;
}

/**
 * Renders Featured Projects on the Homepage (Section 3: Horizontal Scrollable Rail)
 */
export function renderFeaturedProjects(containerId = 'featured-projects-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const featured = siteConfig.projects.slice(0, 6);

  container.innerHTML = featured.map((project, index) => {
    const detailUrl = getProjectUrl(project.slug || project.id);

    return `
      <article class="project-card" data-category="${project.categorySlug}">
        <a href="${detailUrl}" class="project-card__image-link" aria-label="View details for ${project.title}">
          <div class="project-card__image-wrapper">
            <img 
              src="${project.heroImage}" 
              alt="${project.title} in ${project.location}"
              loading="${index < 2 ? 'eager' : 'lazy'}" 
              width="800" 
              height="600"
              class="project-card__img"
            />
            <div class="project-card__badge">${project.category}</div>
          </div>
        </a>
        <div class="project-card__meta">
          <div class="project-card__header">
            <span class="project-card__location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${project.location}
            </span>
            <span class="project-card__year">${project.year}</span>
          </div>
          <h3 class="project-card__title">
            <a href="${detailUrl}">${project.title}</a>
          </h3>
          <p class="project-card__excerpt">${project.shortDescription}</p>
          <a href="${detailUrl}" class="project-card__link">
            <span>View Project Photos</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');

  // Attach Horizontal Scroll Controls
  const prevBtn = document.getElementById('proj-scroll-prev');
  const nextBtn = document.getElementById('proj-scroll-next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -360, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }
}

/**
 * Renders Filterable Projects Grid on the Projects Index Page
 */
export function renderProjectsPortfolio(containerId = 'portfolio-grid', filterContainerId = 'project-filters') {
  const container = document.getElementById(containerId);
  const filterContainer = document.getElementById(filterContainerId);
  if (!container) return;

  const projects = siteConfig.projects;

  const categories = [
    { label: 'All Projects', slug: 'all' },
    { label: 'Full Homes', slug: 'residential' },
    { label: 'Living Rooms', slug: 'living-room' },
    { label: 'Bedrooms', slug: 'bedroom' },
    { label: 'Modular Kitchens', slug: 'kitchen' },
    { label: 'Complete Renovations', slug: 'turnkey' }
  ];

  if (filterContainer) {
    filterContainer.innerHTML = categories.map((cat, idx) => `
      <button 
        type="button" 
        class="filter-pill ${idx === 0 ? 'is-active' : ''}" 
        data-filter="${cat.slug}"
        aria-pressed="${idx === 0 ? 'true' : 'false'}"
      >
        ${cat.label}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.filter-pill').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        const cards = container.querySelectorAll('.project-card');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => { card.style.opacity = '1'; }, 20);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  container.innerHTML = projects.map((project, index) => {
    const detailUrl = getProjectUrl(project.slug || project.id);
    return `
      <article class="project-card" data-category="${project.categorySlug}">
        <a href="${detailUrl}" class="project-card__image-link" aria-label="View details for ${project.title}">
          <div class="project-card__image-wrapper">
            <img 
              src="${project.heroImage}" 
              alt="${project.title} in ${project.location}"
              loading="${index < 3 ? 'eager' : 'lazy'}" 
              width="800" 
              height="600"
              class="project-card__img"
            />
            <div class="project-card__badge">${project.category}</div>
          </div>
        </a>
        <div class="project-card__meta">
          <div class="project-card__header">
            <span class="project-card__location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${project.location}
            </span>
            <span class="project-card__year">${project.year}</span>
          </div>
          <h3 class="project-card__title">
            <a href="${detailUrl}">${project.title}</a>
          </h3>
          <p class="project-card__excerpt">${project.shortDescription}</p>
          <a href="${detailUrl}" class="project-card__link">
            <span>View Project Photos</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Initializes and Renders the Reusable Project Detail Page
 */
export function initProjectDetail() {
  const detailContainer = document.getElementById('project-detail-content');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || urlParams.get('project');

  const project = siteConfig.projects.find(p => p.id === requestedId || p.slug === requestedId) || siteConfig.projects[0];
  const currentIndex = siteConfig.projects.findIndex(p => p.id === project.id);
  const nextProject = siteConfig.projects[(currentIndex + 1) % siteConfig.projects.length];
  const prevProject = siteConfig.projects[(currentIndex - 1 + siteConfig.projects.length) % siteConfig.projects.length];

  document.title = `${project.title} | ${siteConfig.business.name}`;

  const breadcrumbCurrent = document.getElementById('breadcrumb-project-title');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = project.title;
  }

  detailContainer.innerHTML = `
    <header class="project-detail__header">
      <div class="project-detail__meta-top">
        <span class="project-detail__tag">${project.category}</span>
        <span class="project-detail__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${project.location}
        </span>
      </div>
      <h1 class="project-detail__title">${project.title}</h1>
      <p class="project-detail__lead">${project.shortDescription}</p>

      <div class="project-detail__specs-grid">
        <div class="spec-card">
          <span class="spec-card__label">Location</span>
          <span class="spec-card__value">${project.location}</span>
        </div>
        <div class="spec-card">
          <span class="spec-card__label">Work Done</span>
          <span class="spec-card__value">${project.category}</span>
        </div>
        <div class="spec-card">
          <span class="spec-card__label">Carpet Area</span>
          <span class="spec-card__value">${project.area}</span>
        </div>
        <div class="spec-card">
          <span class="spec-card__label">Year Completed</span>
          <span class="spec-card__value">${project.year}</span>
        </div>
      </div>
    </header>

    <div class="project-detail__main-hero">
      <img 
        src="${project.heroImage}" 
        alt="${project.title} - Main View" 
        class="project-detail__hero-img"
        width="1600" 
        height="900"
      />
    </div>

    <section class="project-detail__narrative">
      <div class="narrative__column">
        <h2 class="narrative__heading">About this Project</h2>
      </div>
      <div class="narrative__column">
        <p class="narrative__text">${project.description}</p>
        <p class="narrative__text">Every corner was planned to give the family comfortable seating, practical storage, and a warm atmosphere they can enjoy every day.</p>
      </div>
    </section>

    <section class="project-detail__gallery">
      <h2 class="gallery__heading">Project Photos</h2>
      <div class="gallery__grid">
        ${project.gallery.map(img => `
          <figure class="gallery__item">
            <div class="gallery__image-wrap">
              <img src="${img.url}" alt="${img.caption}" loading="lazy" width="1000" height="750" />
            </div>
            <figcaption class="gallery__caption">${img.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    </section>

    <nav class="project-detail__pagination" aria-label="Project Navigation">
      <a href="${getProjectUrl(prevProject.slug || prevProject.id)}" class="pagination-link pagination-link--prev">
        <span class="pagination-link__sub">← Previous Project</span>
        <span class="pagination-link__title">${prevProject.title}</span>
      </a>
      <a href="index.html" class="pagination-link pagination-link--all">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>All Projects</span>
      </a>
      <a href="${getProjectUrl(nextProject.slug || nextProject.id)}" class="pagination-link pagination-link--next">
        <span class="pagination-link__sub">Next Project →</span>
        <span class="pagination-link__title">${nextProject.title}</span>
      </a>
    </nav>
  `;
}
