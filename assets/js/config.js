/**
 * Central Configuration for Interior Designer Website Template
 * 
 * Defines default business details, service offerings, portfolio projects,
 * testimonials, and SEO defaults. Uses clear, friendly, and approachable language
 * that real homeowners and customers relate to.
 */

export const siteConfig = {
  // Default Business Profile (Used if no URL parameters are provided)
  business: {
    name: 'AURÉLIA Interior Design',
    wordmark: 'AURÉLIA',
    tagline: 'Interior Design & Home Renovations',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    address: '42 Altamount Road, Cumballa Hill',
    zip: '400026',
    phone: '+91 98765 43210',
    phoneRaw: '919876543210',
    email: 'concierge@aureliainteriors.com',
    hours: 'Mon – Sat: 10:00 AM – 7:00 PM',
    accent: '#8C5D38', // Warm Brown
    logo: '', // Optional image logo URL
    serviceAreas: 'South Mumbai, Bandra, Juhu, Worli, Andheri & Powai',
    googleRating: '4.9',
    reviewCount: '48',
    hero: {
      eyebrow: 'BEAUTIFUL, COMFORTABLE HOMES',
      headline: 'Spaces Designed Around the Way You Live',
      description: 'From modern living rooms and modular kitchens to complete home renovations, we handle everything from 3D designs to final handover. Stress-free, on budget, and built to last.',
      ctaText: 'Book a Free Consultation',
      ctaLink: '#consultation',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80'
    },
    social: {
      instagram: 'https://instagram.com',
      pinterest: 'https://pinterest.com',
      linkedin: 'https://linkedin.com',
      houzz: 'https://houzz.com'
    }
  },

  // Services Catalog (Friendly, clear descriptions)
  services: [
    {
      id: 'residential-design',
      title: 'Full Home Interior Design',
      shortDescription: 'Complete interior design and setup for apartments, villas, and new houses.',
      fullDescription: 'We design and furnish your entire home from scratch. We plan your room layouts, build 3D designs so you see everything before work begins, manage custom carpentry, lighting, paint, and curate matching furniture. You get a move-in ready home without any of the stress.',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=900&q=80',
      features: [
        '3D visual designs & space planning',
        'Custom furniture & built-in wardrobes',
        'Warm lighting & false ceiling design',
        'Complete site supervision & handover'
      ]
    },
    {
      id: 'living-room-design',
      title: 'Living Room Interiors',
      shortDescription: 'Comfortable, welcoming living rooms designed for relaxing with family and hosting guests.',
      fullDescription: 'Your living room is where you spend time with family and welcome friends. We design cozy seating arrangements, TV accent walls, warm ambient lighting, and smart storage units that keep your space clutter-free and inviting.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      features: [
        'Custom TV units & display consoles',
        'Sofa & seating layout planning',
        'Warm accent lighting & false ceiling',
        'Curtains, rugs, and wall decor styling'
      ]
    },
    {
      id: 'bedroom-interiors',
      title: 'Bedroom Design',
      shortDescription: 'Peaceful, cozy bedrooms with smart wardrobe storage and relaxing lighting.',
      fullDescription: 'We create peaceful bedrooms that help you unwind and get a good night’s rest. From floor-to-ceiling sliding wardrobes and custom padded headboards to calm bedside lighting and space-saving dressing tables.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
      features: [
        'Custom built-in wardrobes & dressers',
        'Cushioned headboards & accent walls',
        'Warm bedside & ceiling lighting',
        'Space-saving storage solutions'
      ]
    },
    {
      id: 'modular-kitchen-design',
      title: 'Modular Kitchens',
      shortDescription: 'Practical, modern kitchens built for daily cooking with durable countertops and smart storage.',
      fullDescription: 'We build kitchens that make cooking effortless and enjoyable. We use water-resistant materials, soft-close German/Italian hinges, scratch-resistant quartz countertops, and dedicated storage baskets for all your pots, pans, and spices.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
      features: [
        'Smart triangle layout for easy movement',
        'Soft-close drawers & pull-out pantries',
        'Stain-resistant quartz & granite counters',
        'Chimney, hob & built-in appliance space'
      ]
    },
    {
      id: 'commercial-interiors',
      title: 'Office & Commercial Spaces',
      shortDescription: 'Modern, inviting offices and retail studios that keep your team motivated and impress clients.',
      fullDescription: 'Elevate your business with an office that looks sharp and works efficiently. We plan private cabins, meeting rooms, ergonomic desks, and welcoming reception areas tailored to your company brand.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      features: [
        'Reception areas & client meeting rooms',
        'Ergonomic workstations & desks',
        'Acoustic soundproofing & lighting',
        'Branded wall paneling & storage'
      ]
    },
    {
      id: 'renovation-turnkey',
      title: 'Complete Home Renovations',
      shortDescription: 'Hassle-free renovation from civil work, plumbing, and electrical to carpentry and final painting.',
      fullDescription: 'Want to modernize an older apartment or villa? Our turnkey renovation service takes care of the whole process. We handle tile replacement, wall alterations, new electrical wiring, bathroom updates, painting, and deep cleaning with a single point of contact.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
      features: [
        'One team responsible for the whole job',
        'Plumbing, tiling, wiring & painting',
        'Daily progress updates & site visits',
        'Fixed timelines and transparent pricing'
      ]
    }
  ],

  // Portfolio Projects (Realistic, easy-to-read stories)
  projects: [
    {
      id: 'altamount-penthouse',
      slug: 'altamount-penthouse',
      title: '4-BHK Sea-Facing Penthouse',
      location: 'Altamount Road, South Mumbai',
      category: 'Full Home Interior Design',
      categorySlug: 'residential',
      year: '2025',
      area: '4,800 sq.ft.',
      client: 'Private Executive Family',
      shortDescription: 'A bright, open family duplex with warm wood paneling, Italian marble flooring, and panoramic ocean views.',
      description: 'Our clients wanted a bright, warm family home with plenty of natural light. We opened up the living room to take full advantage of the sea view, added custom oak wall paneling with hidden doors, and selected comfortable, modern furniture made for family living.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Spacious living room with curved modern seating and ocean view.'
        },
        {
          url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          caption: 'Formal family lounge featuring warm oak wall paneling.'
        },
        {
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Modern open kitchen with quartz breakfast island.'
        },
        {
          url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
          caption: 'Master bedroom with padded headboard and hidden wardrobe.'
        }
      ]
    },
    {
      id: 'malabar-heritage-villa',
      slug: 'malabar-heritage-villa',
      title: 'Complete Villa Renovation',
      location: 'Malabar Hill, Mumbai',
      category: 'Complete Home Renovations',
      categorySlug: 'turnkey',
      year: '2025',
      area: '5,500 sq.ft.',
      client: 'Family Homeowner',
      shortDescription: 'We updated this classic home with natural teakwood, lime wash walls, and modern open-plan living.',
      description: 'This older family residence needed a fresh, modern update while keeping its classic charm. We took down unnecessary partition walls, laid smooth terrazzo flooring, and added custom teak cabinetry and modern bathroom fittings.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          caption: 'Sunlit living gallery with natural teakwood furniture.'
        },
        {
          url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
          caption: 'Warm reception lounge with cozy custom seating.'
        },
        {
          url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
          caption: 'Quiet reading room with built-in bookshelves.'
        }
      ]
    },
    {
      id: 'juhu-coastal-retreat',
      slug: 'juhu-coastal-retreat',
      title: 'Modern 3-BHK Coastal Home',
      location: 'Juhu, Mumbai',
      category: 'Living Room Interiors',
      categorySlug: 'living-room',
      year: '2024',
      area: '3,600 sq.ft.',
      client: 'Creative Professional Couple',
      shortDescription: 'A calm, airy apartment designed with light fabrics, textured walls, and plenty of natural daylight.',
      description: 'Designed for a young creative couple who wanted an uncluttered, peaceful home by the beach. We used light oak wood, comfortable linen sofas, and large sliding balcony doors that fill the home with ocean breeze.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          caption: 'Sunken living area with comfy linen sofa and travertine table.'
        },
        {
          url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          caption: 'Adjoining dining area with solid wood dining table.'
        }
      ]
    },
    {
      id: 'bandra-atelier-loft',
      slug: 'bandra-atelier-loft',
      title: 'Master Suite & Apartment',
      location: 'Pali Hill, Bandra West',
      category: 'Bedroom Design',
      categorySlug: 'bedroom',
      year: '2024',
      area: '2,900 sq.ft.',
      client: 'Homeowner',
      shortDescription: 'A cozy modern home featuring custom fluted wood paneling, hidden wardrobes, and warm evening lighting.',
      description: 'This Bandra apartment maximizes every square foot. The master bedroom features a custom wooden headboard wall with built-in side tables and a walk-in wardrobe with soft sensor lighting.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
          caption: 'Living room corner with caramel leather armchair and wood wall.'
        },
        {
          url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
          caption: 'Master bedroom with custom wood headboard and warm lighting.'
        }
      ]
    },
    {
      id: 'worli-sky-kitchen',
      slug: 'worli-sky-kitchen',
      title: 'Modern Modular Kitchen',
      location: 'Worli Sea Face, Mumbai',
      category: 'Modular Kitchens',
      categorySlug: 'kitchen',
      year: '2024',
      area: '1,200 sq.ft. (Kitchen & Dining Wing)',
      client: 'Homeowner & Cooking Enthusiast',
      shortDescription: 'A sleek, functional kitchen with scratch-resistant quartz counters and smart pull-out storage.',
      description: 'Built for a client who loves weekend cooking and hosting dinner parties. We installed handleless charcoal grey cabinets, an extra-deep double sink, a quartz breakfast counter, and integrated pantry pull-outs.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Center kitchen island with quartz countertop and brass faucet.'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
          caption: 'Connected dining space right next to the kitchen island.'
        }
      ]
    },
    {
      id: 'nariman-family-residence',
      slug: 'nariman-family-residence',
      title: 'Marine Drive Family Apartment',
      location: 'Marine Drive, Mumbai',
      category: 'Full Home Interior Design',
      categorySlug: 'residential',
      year: '2024',
      area: '4,200 sq.ft.',
      client: 'Multigenerational Family',
      shortDescription: 'A warm, inviting family apartment with spacious living areas, custom wood finishes, and sea views.',
      description: 'A complete interior fit-out for a multi-generation family. We created a large living and dining area for family gatherings, along with quiet, private bedrooms tailored to each family member.',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
          caption: 'Main living room with sea views and natural wood floors.'
        },
        {
          url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          caption: 'Family TV lounge with custom storage cabinets.'
        }
      ]
    }
  ],

  // Testimonials (Real-sounding, grounded reviews)
  testimonials: [
    {
      id: 't1',
      clientName: 'Priya & Rajiv Singhania',
      role: 'Homeowners',
      projectReference: '4-BHK Apartment, Altamount Road',
      rating: 5,
      quote: 'They made designing our home so easy and stress-free. The living room and kitchen turned out even better than we imagined, and they finished right on schedule. Our family absolutely loves the new space!'
    },
    {
      id: 't2',
      clientName: 'Vikram Seth',
      role: 'Homeowner',
      projectReference: 'Villa Renovation, Malabar Hill',
      rating: 5,
      quote: 'From the 3D plans to the final paint touch-ups, their team was professional and honest. They gave practical advice on materials that saved us money, and the quality of work is outstanding.'
    },
    {
      id: 't3',
      clientName: 'Meera & Siddharth Roy',
      role: 'Homeowners',
      projectReference: '3-BHK Apartment, Juhu',
      rating: 5,
      quote: 'Super responsive on WhatsApp and always available to answer our questions. The carpentry, lighting, and kitchen fittings are top-notch. Highly recommend them to anyone renovating their home!'
    }
  ],

  // Demo Presets for Quick Testing (With mobile, email, address, etc.)
  demoPresets: [
    {
      label: 'AURÉLIA (Default Mumbai)',
      params: ''
    },
    {
      label: 'Studio Forma (Bengaluru)',
      params: '?name=Studio+Forma+Interiors&city=Bengaluru&state=Karnataka&mobile=%2B91+98450+12345&email=contact%40studioforma.in&address=102+Indiranagar+100ft+Road&serviceAreas=Indiranagar%2C+Koramangala%2C+Whitefield%2C+HSR+Layout&accent=%23996515&headline=Beautiful+Homes+Designed+for+Modern+Bengaluru'
    },
    {
      label: 'Elysian Studio (London)',
      params: '?name=Elysian+Design+Studio&city=London&state=Greater+London&mobile=%2B44+20+7946+0912&email=studio%40elysiandesign.co.uk&address=14+Kensington+Church+Street&serviceAreas=Kensington%2C+Chelsea%2C+Mayfair%2C+Richmond&accent=%237B5E43&headline=Quality+Home+Interiors+%26+Bespoke+Renovations'
    },
    {
      label: 'Vanguard Interiors (New York)',
      params: '?name=Vanguard+Interiors&city=New+York&state=NY&mobile=%2B1+212+555+0198&email=hello%40vanguardinteriors.com&address=245+Fifth+Avenue%2C+Suite+800&serviceAreas=Manhattan%2C+Brooklyn%2C+Long+Island&accent=%238A4B38&headline=Modern+Apartment+Interiors+%26+Home+Makeovers'
    }
  ],

  // Base SEO Configuration
  seo: {
    siteName: 'AURÉLIA Interior Design',
    siteUrl: 'https://example.github.io/interior-designer-template',
    defaultTitle: 'AURÉLIA Interior Design | Home Interiors & Renovations',
    defaultDescription: 'We design and renovate beautiful, comfortable homes in Mumbai. Full home interiors, modular kitchens, living rooms, and complete renovations.',
    themeColor: '#30251E'
  }
};
