/**
 * Personalization Engine for Interior Designer Template
 * 
 * Safely parses URL query parameters with support for multiple parameter aliases
 * (e.g. mobile/phone/whatsapp, address/street, email/mail, serviceAreas/area),
 * sanitizes values, updates styles/content, and preserves query parameters
 * across all internal links.
 */

import { siteConfig } from './config.js';

/**
 * Validates a URL to ensure it starts with http:// or https://
 * Prevents javascript: or data: injection vectors.
 */
export function isValidHttpUrl(string) {
  if (!string || typeof string !== 'string') return false;
  try {
    const url = new URL(string, window.location.origin);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

/**
 * Validates a hexadecimal color code (e.g., #8C5D38 or #B9956A)
 */
export function isValidHexColor(color) {
  if (!color || typeof color !== 'string') return false;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color.trim());
}

/**
 * Cleans phone number to digits only (for WhatsApp and tel links)
 */
export function cleanPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d]/g, '');
}

/**
 * Extracts and sanitizes personalization parameters from URL
 * Supports common aliases like mobile, street, mail, area, etc.
 */
export function getPersonalizedData() {
  const urlParams = new URLSearchParams(window.location.search);
  const defaults = siteConfig.business;

  // Extract query parameters with aliases
  const rawName = urlParams.get('name') || urlParams.get('studio') || urlParams.get('business');
  const rawCity = urlParams.get('city');
  const rawState = urlParams.get('state');
  const rawPhone = urlParams.get('mobile') || urlParams.get('phone') || urlParams.get('whatsapp') || urlParams.get('tel');
  const rawEmail = urlParams.get('email') || urlParams.get('mail');
  const rawAddress = urlParams.get('address') || urlParams.get('street');
  const rawZip = urlParams.get('zip') || urlParams.get('pincode') || urlParams.get('postal');
  const rawLogo = urlParams.get('logo');
  const rawAccent = urlParams.get('accent') || urlParams.get('color');
  const rawHeadline = urlParams.get('headline') || urlParams.get('title');
  const rawDescription = urlParams.get('description') || urlParams.get('desc');
  const rawHeroImage = urlParams.get('heroImage') || urlParams.get('image');
  const rawServiceAreas = urlParams.get('serviceAreas') || urlParams.get('serviceArea') || urlParams.get('areas') || urlParams.get('area');
  const rawServices = urlParams.get('services');
  const rawRating = urlParams.get('googleRating') || urlParams.get('rating');
  const rawReviews = urlParams.get('reviewCount') || urlParams.get('reviews');

  // Business Name & Wordmark
  const name = rawName && rawName.trim().length > 0 ? rawName.trim() : defaults.name;
  const wordmark = name.split(' ')[0] || defaults.wordmark;

  // Location Details
  const city = rawCity && rawCity.trim().length > 0 ? rawCity.trim() : defaults.city;
  const state = rawState && rawState.trim().length > 0 ? rawState.trim() : defaults.state;
  const address = rawAddress && rawAddress.trim().length > 0 ? rawAddress.trim() : defaults.address;
  const zip = rawZip && rawZip.trim().length > 0 ? rawZip.trim() : defaults.zip;
  const locationFormatted = `${city}, ${state}`.trim().replace(/^,\s*|,\s*$/g, '');

  // Contact Details
  const phone = rawPhone && rawPhone.trim().length > 0 ? rawPhone.trim() : defaults.phone;
  const phoneDigits = cleanPhoneNumber(phone) || defaults.phoneRaw;
  const email = rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail.trim()) 
    ? rawEmail.trim() 
    : defaults.email;

  // Accent Color
  let accent = defaults.accent;
  if (rawAccent) {
    const candidate = rawAccent.startsWith('#') ? rawAccent : `#${rawAccent}`;
    if (isValidHexColor(candidate)) {
      accent = candidate;
    }
  }

  // Logo URL
  let logo = '';
  if (rawLogo && isValidHttpUrl(rawLogo)) {
    logo = rawLogo.trim();
  }

  // Hero Copy & Visuals
  const headline = rawHeadline && rawHeadline.trim().length > 0 
    ? rawHeadline.trim() 
    : defaults.hero.headline;
    
  const description = rawDescription && rawDescription.trim().length > 0 
    ? rawDescription.trim() 
    : defaults.hero.description;

  let heroImage = defaults.hero.image;
  if (rawHeroImage && isValidHttpUrl(rawHeroImage)) {
    heroImage = rawHeroImage.trim();
  }

  // Service Areas
  const serviceAreas = rawServiceAreas && rawServiceAreas.trim().length > 0
    ? rawServiceAreas.trim()
    : `${city} & Nearby Areas`;

  // Filter or list services if explicitly passed (e.g. services=Residential,Kitchen)
  let activeServicesList = null;
  if (rawServices && rawServices.trim().length > 0) {
    activeServicesList = rawServices.split(',').map(s => s.trim()).filter(Boolean);
  }

  // Google Rating & Review Count
  const googleRating = rawRating && !isNaN(parseFloat(rawRating)) ? parseFloat(rawRating).toFixed(1) : defaults.googleRating;
  const reviewCount = rawReviews && !isNaN(parseInt(rawReviews, 10)) ? parseInt(rawReviews, 10).toString() : defaults.reviewCount;

  const isPersonalized = Boolean(
    rawName || rawCity || rawState || rawPhone || rawEmail || 
    rawAddress || rawServiceAreas || rawAccent || rawHeadline || rawDescription || rawServices
  );

  return {
    isPersonalized,
    name,
    wordmark,
    city,
    state,
    address,
    zip,
    locationFormatted,
    phone,
    phoneDigits,
    email,
    accent,
    logo,
    headline,
    description,
    heroImage,
    serviceAreas,
    activeServicesList,
    googleRating,
    reviewCount,
    rawParams: urlParams
  };
}

/**
 * Calculates a slightly darker shade for hover states from a hex color
 */
function adjustHexBrightness(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = (num >> 8 & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

/**
 * Applies personalized data to DOM elements throughout the current page
 */
export function applyPersonalization(data) {
  // 1. Dynamic CSS Custom Properties for Brand Accent Color
  if (data.accent) {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', data.accent);
    root.style.setProperty('--color-warm-brown', data.accent);
    const darkerAccent = adjustHexBrightness(data.accent, -18);
    root.style.setProperty('--accent-hover', darkerAccent);
    root.style.setProperty('--accent-subtle', `${data.accent}1A`);
  }

  // 2. Safe DOM text replacements for Business Name & Wordmark
  document.querySelectorAll('[data-business-name]').forEach(el => {
    el.textContent = data.name;
  });

  document.querySelectorAll('[data-business-wordmark]').forEach(el => {
    el.textContent = data.wordmark;
  });

  // Optional Logo Image
  if (data.logo) {
    document.querySelectorAll('[data-business-logo]').forEach(el => {
      el.src = data.logo;
      el.alt = `${data.name} Logo`;
      el.style.display = 'inline-block';
    });
  }

  // 3. Location, Address & Service Areas
  document.querySelectorAll('[data-business-city]').forEach(el => {
    el.textContent = data.city;
  });
  document.querySelectorAll('[data-business-location]').forEach(el => {
    el.textContent = data.locationFormatted;
  });
  document.querySelectorAll('[data-business-address]').forEach(el => {
    const fullAddr = `${data.address}, ${data.city}, ${data.state} ${data.zip}`.trim().replace(/^,\s*|,\s*$/g, '');
    el.textContent = fullAddr;
  });
  document.querySelectorAll('[data-business-service-areas]').forEach(el => {
    el.textContent = data.serviceAreas;
  });

  // 4. Contact Links & Labels
  document.querySelectorAll('[data-business-phone]').forEach(el => {
    el.textContent = data.phone;
  });
  document.querySelectorAll('a[data-business-phone-link]').forEach(el => {
    el.href = `tel:+${data.phoneDigits}`;
  });
  document.querySelectorAll('[data-business-email]').forEach(el => {
    el.textContent = data.email;
  });
  document.querySelectorAll('a[data-business-email-link]').forEach(el => {
    el.href = `mailto:${encodeURIComponent(data.email)}`;
  });

  // WhatsApp Button
  document.querySelectorAll('a[data-whatsapp-btn]').forEach(el => {
    if (data.phoneDigits) {
      const message = encodeURIComponent(`Hi ${data.name}, I would like to get a quote and discuss interior design for my home in ${data.city}.`);
      el.href = `https://wa.me/${data.phoneDigits}?text=${message}`;
      el.style.display = 'inline-flex';
    } else {
      el.style.display = 'none';
    }
  });

  // 5. Hero Headline & Description
  document.querySelectorAll('[data-hero-headline]').forEach(el => {
    el.textContent = data.headline;
  });
  document.querySelectorAll('[data-hero-description]').forEach(el => {
    el.textContent = data.description;
  });
  document.querySelectorAll('[data-hero-image]').forEach(el => {
    el.src = data.heroImage;
  });

  // 6. Ratings & Social Proof
  document.querySelectorAll('[data-business-rating]').forEach(el => {
    el.textContent = data.googleRating;
  });
  document.querySelectorAll('[data-business-reviews]').forEach(el => {
    el.textContent = data.reviewCount;
  });

  // 7. Update Document Title
  const currentTitle = document.title;
  if (data.isPersonalized && !currentTitle.includes(data.name)) {
    document.title = currentTitle.replace('AURÉLIA Interior Design', data.name);
  }

  // 8. Demo Indexing Protection
  if (data.isPersonalized) {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, follow';
  }

  // 9. Preserve Query Parameters across all internal navigation links
  preserveParamsOnInternalLinks(data.rawParams);

  // 10. Update JSON-LD Structured Data
  updateStructuredData(data);
}

/**
 * Ensures that when a prospect clicks on "Projects", "Services", "Contact",
 * or project detail links, the personalization query parameters are carried forward.
 */
function preserveParamsOnInternalLinks(urlParams) {
  const queryString = urlParams.toString();
  if (!queryString) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('https://wa.me') || rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      return;
    }

    try {
      const [urlPart, hashPart] = rawHref.split('#');
      const [path, existingQuery] = urlPart.split('?');
      const combinedParams = new URLSearchParams(existingQuery || '');
      
      urlParams.forEach((value, key) => {
        if (!combinedParams.has(key)) {
          combinedParams.set(key, value);
        }
      });

      const newQuery = combinedParams.toString();
      const updatedUrl = newQuery ? `${path}?${newQuery}` : path;
      const finalHref = hashPart !== undefined ? `${updatedUrl}#${hashPart}` : updatedUrl;
      
      link.setAttribute('href', finalHref);
    } catch (_) {
      // Ignore URL parsing errors for non-standard relative links
    }
  });
}

/**
 * Updates dynamic JSON-LD schema with personalized studio parameters
 */
function updateStructuredData(data) {
  const schemaScript = document.getElementById('schema-local-business');
  if (!schemaScript) return;

  try {
    const schema = JSON.parse(schemaScript.textContent);
    schema.name = data.name;
    schema.telephone = `+${data.phoneDigits}`;
    schema.email = data.email;
    if (schema.address) {
      schema.address.streetAddress = data.address;
      schema.address.addressLocality = data.city;
      schema.address.addressRegion = data.state;
      schema.address.postalCode = data.zip;
    }
    if (schema.areaServed) {
      schema.areaServed = data.city;
    }
    schemaScript.textContent = JSON.stringify(schema, null, 2);
  } catch (err) {
    console.debug('Schema update skipped:', err);
  }
}
