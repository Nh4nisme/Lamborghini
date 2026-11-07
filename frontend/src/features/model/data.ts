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
  proposition: '[MODEL PROPOSITION]',
  introduction:
    '[INTRODUCTION – architecture, design intent and model context. Replace concept imagery and all facts before publishing.]',
  heroHeadline: '[CAMPAIGN HEADLINE]',
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
    headline: '[POWERTRAIN HEADLINE]',
    story: '[POWERTRAIN STORY – verified architecture and output only.]',
    image: '/images/powertrain-engine.jpg',
    displacement: '4.0 L Twin-Turbo V8',
    turbos: 'Dual Hot-V Twin-Scroll Turbos',
    electricMotors: '3 Axial-Flux Electric Motors',
    transmission: '8-Speed Dual-Clutch Transverse',
  },
  engineering: {
    ldvi: {
      title: 'LDVI 2.0',
      headline: '[ENGINEERING HEADLINE]',
      description:
        '[ENGINEERING DESCRIPTION – Lamborghini Dinamica Veicolo Integrata 2.0 with torque vectoring & adaptive drift control.]',
    },
    spaceframe: {
      title: 'SPACEFRAME',
      headline: '[ENGINEERING HEADLINE]',
      description:
        '[ENGINEERING DESCRIPTION – All-aluminum ultra-high torsional stiffness architecture delivering optimum lightweight dynamics.]',
    },
  },
  aerodynamics: {
    tag: '02 / EXTERIOR & AERODYNAMICS',
    headline: 'EVERY SURFACE HAS A PURPOSE.',
    story: '[EXTERIOR STORY – replace with verified model-specific design details.]',
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
    title: '[SOUND PANEL TITLE]',
    description: 'Static listening experience. Audio and video playback are not connected.',
    image: '/images/sound-engine.jpg',
  },
  interior: {
    tag: '04 / INTERIOR & TECHNOLOGY',
    headline: 'THE DRIVER. AT THE CENTER.',
    story: '[INTERIOR STORY – HMI, driving modes and connectivity content slots.]',
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
      value: '[Architecture]',
      unit: '—',
      context: '[Context]',
      category: 'engine',
    },
    {
      parameter: 'Combined power',
      value: '[Value]',
      unit: 'CV / kW',
      context: 'Maximum combined output',
      category: 'performance',
    },
    {
      parameter: 'Acceleration',
      value: '[Value]',
      unit: 's',
      context: '0-100 km/h',
      category: 'performance',
    },
    {
      parameter: 'Top speed',
      value: '[Value]',
      unit: 'km/h',
      context: 'Manufacturer reference',
      category: 'performance',
    },
    {
      parameter: 'Displacement',
      value: '[Value]',
      unit: 'cm³',
      context: '4.0-liter twin-turbo V8',
      category: 'engine',
    },
    {
      parameter: 'Engine speed',
      value: '[Value]',
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
