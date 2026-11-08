export interface ModelSpec {
  parameter: string;
  value: string;
  unit: string;
  context: string;
  category: 'performance' | 'engine' | 'dimension' | 'hybrid';
}

export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

export interface CarModelData {
  id: string;
  name: string;
  tagline: string;
  proposition: string;
  introduction: string;
  heroHeadline: string;
  heroImage: string;
  stats: {
    combinedPower: { value: string; unit: string; label: string };
    acceleration: { value: string; unit: string; label: string };
    topSpeed: { value: string; unit: string; label: string };
    engineSpeed: { value: string; unit: string; label: string };
  };
  powertrain: {
    headline: string;
    story: string;
    image: string;
    displacement: string;
    turbos: string;
    electricMotors: string;
    transmission: string;
  };
  engineering: {
    ldvi: {
      title: string;
      headline: string;
      description: string;
    };
    spaceframe: {
      title: string;
      headline: string;
      description: string;
    };
    technologyCards?: Array<{
      title: string;
      description: string;
      tag?: string;
    }>;
  };
  aerodynamics: {
    tag: string;
    headline: string;
    story: string;
    image: string;
    hotspots: Hotspot[];
  };
  soundStudy: {
    tag: string;
    title: string;
    description: string;
    image: string;
  };
  interior: {
    tag: string;
    headline: string;
    story: string;
    image: string;
  };
  gallery: GalleryItem[];
  rearImage: string;
  specifications: ModelSpec[];
  adPersonam: {
    tag: string;
    headline: string;
    description: string;
    image: string;
  };
}

export const defaultSupercarData: CarModelData = {
  id: 'temerario',
  name: 'TEMERARIO',
  tagline: 'AUTHENTIC ITALIAN HYBRID SUPER SPORTS CAR',
  proposition: '',
  introduction: '',
  heroHeadline: '',
  heroImage: '/images/hero-car.jpg',
  stats: {
    combinedPower: {
      value: '920',
      unit: 'CV',
      label: 'MAXIMUM COMBINED POWER',
    },
    acceleration: {
      value: '2.7',
      unit: 's',
      label: '0-100 KM/H',
    },
    topSpeed: {
      value: '343',
      unit: 'km/h',
      label: 'TOP SPEED',
    },
    engineSpeed: {
      value: '10,000',
      unit: 'rpm',
      label: 'ENGINE SPEED',
    },
  },
  powertrain: {
    headline: '',
    story: '',
    image: '/images/powertrain-engine.jpg',
    displacement: '4.0 L Twin-Turbo V8',
    turbos: 'Dual Hot-V Twin-Scroll Turbos',
    electricMotors: '3 Axial-Flux Electric Motors',
    transmission: '8-Speed Dual-Clutch Transverse',
  },
  engineering: {
    ldvi: {
      title: 'LDVI 2.0',
      headline: 'INTEGRATED VEHICLE DYNAMICS',
      description: 'Advanced vehicle dynamics control system that orchestrates all-wheel drive, torque vectoring, and active aerodynamics.',
    },
    spaceframe: {
      title: 'SPACEFRAME',
      headline: 'CARBON FIBER MONOCOQUE',
      description: 'Aluminum and carbon spaceframe architecture delivering exceptional rigidity, safety, and weight distribution.',
    },
    technologyCards: [
      {
        title: 'LDVI 2.0',
        description: 'Advanced vehicle dynamics control system that orchestrates all-wheel drive, torque vectoring, and active aerodynamics.',
        tag: '02 / TECHNOLOGY',
      },
      {
        title: 'SPACEFRAME',
        description: 'Aluminum and carbon spaceframe architecture delivering exceptional rigidity, safety, and weight distribution.',
        tag: '03 / STRUCTURE',
      },
    ],
  },
  aerodynamics: {
    tag: '02 / EXTERIOR & AERODYNAMICS',
    headline: 'EVERY SURFACE HAS A PURPOSE.',
    story: '',
    image: '/images/exterior-side.jpg',
    hotspots: [
      {
        id: 'front',
        name: 'Front',
        x: 18,
        y: 65,
        title: 'High Downforce Front Splitter',
        description: 'Optimizes air intake to low-temperature radiators while reducing drag across the front axle.',
      },
      {
        id: 'wing',
        name: 'Wing',
        x: 82,
        y: 45,
        title: 'Integrated Aerodynamic Rear Wing',
        description: 'Active variable-incidence profile producing up to 103% more rear downforce without speed penalty.',
      },
      {
        id: 'vortex',
        name: 'Vortex Generator',
        x: 48,
        y: 78,
        title: 'Underbody Vortex Generators',
        description: 'Underfloor strakes channel high-speed flow directly to the oversized carbon diffuser.',
      },
      {
        id: 'castor',
        name: 'Castor',
        x: 32,
        y: 72,
        title: 'Aerodynamic Castor Geometry',
        description: 'Suspension wishbone air deflectors direct turbulent wheel-wake away from lateral intakes.',
      },
      {
        id: 'brake',
        name: 'Brake Cooling',
        x: 28,
        y: 60,
        title: 'NACA Brake Cooling Ducts',
        description: 'Direct-ram cooling feeds CCB Plus carbon-ceramic 410mm brakes under high thermal stress.',
      },
      {
        id: 'bumper',
        name: 'Aero Bumper',
        x: 75,
        y: 62,
        title: 'Rear Venturi Bumper Outlets',
        description: 'Evacuates heat from the engine bay while expanding air volume to lower base pressure.',
      },
    ],
  },
  soundStudy: {
    tag: '03 / ENGINE SOUND',
    title: '',
    description: 'Static listening experience. Audio and video playback are not connected.',
    image: '/images/sound-engine.jpg',
  },
  interior: {
    tag: '04 / INTERIOR & TECHNOLOGY',
    headline: 'THE DRIVER. AT THE CENTER.',
    story: '',
    image: '/images/interior-cockpit.jpg',
  },
  gallery: [
    {
      id: 'exterior',
      title: 'EXTERIOR',
      subtitle: 'Sculpted Aerodynamics',
      image: '/images/gallery-car.jpg',
      badge: '01 / 05',
    },
    {
      id: 'rear',
      title: 'REAR',
      subtitle: 'Hexagonal Signature & Twin Exhausts',
      image: '/images/rear-view.jpg',
      badge: '02 / 05',
    },
    {
      id: 'cockpit',
      title: 'COCKPIT',
      subtitle: 'Feel Like A Pilot',
      image: '/images/interior-cockpit.jpg',
      badge: '03 / 05',
    },
    {
      id: 'engine',
      title: 'ENGINE',
      subtitle: '10,000 RPM Twin-Turbo V8',
      image: '/images/powertrain-engine.jpg',
      badge: '04 / 05',
    },
  ],
  rearImage: '/images/rear-view.jpg',
  specifications: [
    {
      parameter: 'Powertrain',
      value: '',
      unit: '—',
      context: '',
      category: 'engine',
    },
    {
      parameter: 'Combined power',
      value: '',
      unit: 'CV / kW',
      context: 'Maximum combined output',
      category: 'performance',
    },
    {
      parameter: 'Acceleration',
      value: '',
      unit: 's',
      context: '0-100 km/h',
      category: 'performance',
    },
    {
      parameter: 'Top speed',
      value: '',
      unit: 'km/h',
      context: 'Manufacturer reference',
      category: 'performance',
    },
    {
      parameter: 'Displacement',
      value: '',
      unit: 'cm³',
      context: '4.0-liter twin-turbo V8',
      category: 'engine',
    },
    {
      parameter: 'Engine speed',
      value: '',
      unit: 'rpm',
      context: 'Engine reference',
      category: 'engine',
    },
  ],
  adPersonam: {
    tag: '06 / AD PERSONAM',
    headline: 'MAKE IT UNMISTAKABLY YOURS.',
    description:
      'Explore the relationship between color, material and personal expression. Your showroom can guide a conversation about the finishes and details of your next configuration.',
    image: '/images/ad-personam.jpg',
  },
};

export function convertSpeed(kmh: number, toUnit: 'km/h' | 'mph'): number {
  if (toUnit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  return kmh;
}

export function convertPower(cv: number, toUnit: 'CV' | 'HP' | 'kW'): number {
  if (toUnit === 'kW') {
    return Math.round(cv * 0.735499);
  }
  if (toUnit === 'HP') {
    return Math.round(cv * 0.98632);
  }
  return cv;
}

export function filterSpecsByCategory(specs: ModelSpec[], category: string): ModelSpec[] {
  if (category === 'all') return specs;
  return specs.filter((s) => s.category === category);
}

export function getModelFolder(name: string): string {
  const n = (name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (n.includes('revuelto')) return 'revuelto';
  if (n.includes('temerario')) return 'temerario';
  if (n.includes('urus')) return 'urus';
  if (n.includes('huracan')) return 'huracan';
  return 'revuelto';
}

