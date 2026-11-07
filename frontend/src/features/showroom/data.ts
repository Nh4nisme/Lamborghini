export interface ShowroomStudy {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  description: string;
  services: string;
  category: 'showroom' | 'service' | 'collision';
  lat: number;
  lng: number;
  mapCoords: { x: number; y: number }; // percentage coordinates in the schematic box
  officialUrl?: string;
  trangThai?: string;
}

export const OFFICIAL_LAMBORGHINI_DEALERSHIPS: ShowroomStudy[] = [
  {
    id: 'verona',
    code: '63540', // Exact code from user URL: #showroom,63540
    name: 'LAMBORGHINI VERONA',
    city: 'Verona',
    country: 'Italy',
    region: 'Veneto',
    address: 'Via Gardesane, 49, 37012 Verona VR, Italy',
    phone: '+39 045 858 1411',
    email: 'info@lamborghini-verona.it',
    hours: 'Mon - Fri: 08:30 - 12:30, 14:30 - 19:00 | Sat: 09:00 - 12:30',
    description: 'Official Automobili Lamborghini Dealer & Service partner for Verona, Lake Garda and Northeast Italy.',
    services: 'Showroom · Service · Ad Personam Personalization · Spare Parts',
    category: 'showroom',
    lat: 45.45423,
    lng: 10.92022,
    mapCoords: { x: 52, y: 38 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63540',
  },
  {
    id: 'bologna',
    code: '63501',
    name: 'LAMBORGHINI BOLOGNA',
    city: 'Bologna',
    country: 'Italy',
    region: 'Emilia-Romagna',
    address: "Via Modena, 12, 40019 Sant'Agata Bolognese BO, Italy",
    phone: '+39 051 681 7611',
    email: 'concierge.bologna@lamborghini.com',
    hours: 'Mon - Fri: 09:00 - 19:00 | Sat: By appointment',
    description: 'Flagship factory headquarters showroom, museum delivery suite, and historic home of Sant\'Agata Bolognese.',
    services: 'Factory Showroom · Ad Personam Atelier · Delivery Suite · Heritage Museum',
    category: 'showroom',
    lat: 44.6586,
    lng: 11.1278,
    mapCoords: { x: 74, y: 72 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63501',
  },
  {
    id: 'milan',
    code: '63510',
    name: 'LAMBORGHINI MILANO',
    city: 'Milan',
    country: 'Italy',
    region: 'Lombardia',
    address: 'Via Stephenson 94, 20157 Milano MI, Italy',
    phone: '+39 02 8909 3410',
    email: 'concierge.milano@lamborghini.com',
    hours: 'Mon - Sat: 10:00 - 19:30',
    description: 'Metropolitan Italian flagship showcasing the latest HPEV supercars and Haute Horlogerie personalization lounge.',
    services: 'Flagship Showroom · Ad Personam Studio · VIP Private Lounge',
    category: 'showroom',
    lat: 45.5085,
    lng: 9.1235,
    mapCoords: { x: 18, y: 22 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63510',
  },
  {
    id: 'bergamo',
    code: '63515',
    name: 'LAMBORGHINI BERGAMO',
    city: 'Bergamo',
    country: 'Italy',
    region: 'Lombardia',
    address: 'Via Zanica 91, 24050 Grassobbio BG, Italy',
    phone: '+39 035 526 211',
    email: 'info@lamborghini-bergamo.it',
    hours: 'Mon - Fri: 09:00 - 12:30, 14:30 - 19:00',
    description: 'Official dealership and high-technology service diagnostic center in the Lombardy alpine corridor.',
    services: 'Showroom · Service & Diagnostics · Technical Certification',
    category: 'showroom',
    lat: 45.6601,
    lng: 9.7042,
    mapCoords: { x: 28, y: 20 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63515',
  },
  {
    id: 'torino',
    code: '63525',
    name: 'LAMBORGHINI TORINO',
    city: 'Torino',
    country: 'Italy',
    region: 'Piemonte',
    address: 'Corso Allamano 40, 10098 Rivoli TO, Italy',
    phone: '+39 011 950 511',
    email: 'info@lamborghini-torino.it',
    hours: 'Mon - Sat: 09:00 - 19:00',
    description: 'Piedmont flagship dealer with specialized bespoke atelier and track preparation consultancy.',
    services: 'Sales Consultation · Personalization · High Performance Service',
    category: 'showroom',
    lat: 45.0645,
    lng: 7.5518,
    mapCoords: { x: 12, y: 44 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63525',
  },
  {
    id: 'roma',
    code: '63520',
    name: 'LAMBORGHINI ROMA',
    city: 'Rome',
    country: 'Italy',
    region: 'Lazio',
    address: 'Via Salaria 717, 00138 Roma RM, Italy',
    phone: '+39 06 886 931',
    email: 'info@lamborghini-roma.it',
    hours: 'Mon - Fri: 09:00 - 19:00 | Sat: 09:30 - 13:00',
    description: 'Capital city showroom and certified factory service workshop serving Central and Southern Italy.',
    services: 'Capital Flagship · Certified Service · Ad Personam Atelier',
    category: 'showroom',
    lat: 41.9542,
    lng: 12.5073,
    mapCoords: { x: 78, y: 88 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63520',
  },
  {
    id: 'bari',
    code: '63530',
    name: 'LAMBORGHINI BARI',
    city: 'Bari',
    country: 'Italy',
    region: 'Puglia',
    address: 'Via Napoli 331, 70123 Bari BA, Italy',
    phone: '+39 080 574 8111',
    email: 'info@lamborghini-bari.it',
    hours: 'Mon - Fri: 09:00 - 13:00, 15:30 - 19:30',
    description: 'Southern Adriatic flagship hub providing tailored sales consultations and certified maintenance.',
    services: 'Showroom Consultation · Scheduled Service · Customer Care',
    category: 'showroom',
    lat: 41.1328,
    lng: 16.8294,
    mapCoords: { x: 90, y: 92 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63530',
  },
  {
    id: 'lugano',
    code: '63601',
    name: 'LAMBORGHINI LUGANO',
    city: 'Lugano',
    country: 'Switzerland',
    region: 'Ticino',
    address: 'Via San Gottardo 27, 6900 Lugano, Switzerland',
    phone: '+41 91 960 00 00',
    email: 'info@lamborghini-lugano.ch',
    hours: 'Mon - Fri: 08:30 - 12:00, 13:30 - 18:30',
    description: 'Swiss-Italian alpine atelier specializing in private confidential acquisitions and winterization service.',
    services: 'Alpine Atelier · Personalization Studio · Service Concierge',
    category: 'showroom',
    lat: 45.9928,
    lng: 8.9482,
    mapCoords: { x: 22, y: 15 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63601',
  },
  {
    id: 'geneva',
    code: '63605',
    name: 'LAMBORGHINI GENÈVE',
    city: 'Geneva',
    country: 'Switzerland',
    region: 'Geneva',
    address: 'Route de Saint-Julien 184, 1228 Plan-les-Ouates, Switzerland',
    phone: '+41 22 794 88 88',
    email: 'info@lamborghini-geneve.ch',
    hours: 'Mon - Fri: 08:00 - 19:00 | Sat: 09:00 - 17:00',
    description: 'Lake Geneva international client facility with state-of-the-art configuration lounge.',
    services: 'Bespoke Showroom · VIP Private Vault · Factory Liaison',
    category: 'showroom',
    lat: 46.162,
    lng: 6.115,
    mapCoords: { x: 10, y: 18 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63605',
  },
  {
    id: 'monaco',
    code: '63701',
    name: 'LAMBORGHINI MONACO',
    city: 'Monaco',
    country: 'Monaco',
    region: 'Côte d\'Azur',
    address: '24 Avenue des Spélugues, 98000 Monaco',
    phone: '+377 97 97 55 55',
    email: 'info@lamborghini.mc',
    hours: 'Mon - Sat: 09:30 - 19:00',
    description: 'Monte Carlo prestige showroom overlooking the legendary Grand Prix circuit.',
    services: 'Cote d\'Azur Flagship · VIP Yacht Liaison · Ad Personam Experience',
    category: 'showroom',
    lat: 43.7405,
    lng: 7.4285,
    mapCoords: { x: 14, y: 55 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63701',
  },
  {
    id: 'paris',
    code: '63801',
    name: 'LAMBORGHINI PARIS',
    city: 'Paris',
    country: 'France',
    region: 'Île-de-France',
    address: '2 Rue de Presbourg, 75116 Paris, France',
    phone: '+33 1 45 00 10 10',
    email: 'paris@lamborghini.fr',
    hours: 'Mon - Sat: 09:30 - 19:00',
    description: 'Parisian flagship near the Arc de Triomphe offering personalized Ad Personam appointments.',
    services: 'Haute Horlogerie & Fashion Lounge · VIP Delivery · Showroom',
    category: 'showroom',
    lat: 48.8738,
    lng: 2.295,
    mapCoords: { x: 8, y: 12 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63801',
  },
  {
    id: 'munich',
    code: '63901',
    name: 'LAMBORGHINI MÜNCHEN',
    city: 'Munich',
    country: 'Germany',
    region: 'Bavaria',
    address: 'Frankfurter Ring 15, 80807 Munich, Germany',
    phone: '+49 89 350 40 40',
    email: 'info@lamborghini-muenchen.com',
    hours: 'Mon - Fri: 08:30 - 18:30 | Sat: 09:00 - 14:00',
    description: 'Bavarian high-performance engineering hub with factory-trained master technicians.',
    services: 'Supercar Showroom · Track Performance Center · Ad Personam Studio',
    category: 'showroom',
    lat: 48.1878,
    lng: 11.5833,
    mapCoords: { x: 35, y: 14 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,63901',
  },
  {
    id: 'london',
    code: '64001',
    name: 'LAMBORGHINI LONDON MAYFAIR',
    city: 'London',
    country: 'United Kingdom',
    region: 'Greater London',
    address: '27 Old Bond Street, Mayfair, London W1S 4QA, UK',
    phone: '+44 20 7499 8833',
    email: 'concierge.london@lamborghini.com',
    hours: 'Mon - Sat: 10:00 - 18:30',
    description: 'Mayfair bespoke boutique connecting directly with Sant\'Agata Bolognese telemetry.',
    services: 'Mayfair VIP Lounge · Telemetry Studio · Ad Personam Atelier',
    category: 'showroom',
    lat: 51.5098,
    lng: -0.1425,
    mapCoords: { x: 5, y: 10 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,64001',
  },
  {
    id: 'hcmc',
    code: '64501',
    name: 'LAMBORGHINI HO CHI MINH',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    region: 'Southeast Asia',
    address: 'Hilton Saigon, 11 Me Linh Square, Ben Nghe, District 1, Ho Chi Minh City, Vietnam',
    phone: '+84 28 3825 8888',
    email: 'info@lamborghini-hcmc.vn',
    hours: 'Mon - Sun: 09:00 - 20:00',
    description: 'Official Automobili Lamborghini Showroom & Boutique at Hilton Saigon, District 1.',
    services: 'Flagship Showroom · Ad Personam Atelier · VIP Concierge',
    category: 'showroom',
    lat: 10.7745,
    lng: 106.7058,
    mapCoords: { x: 92, y: 85 },
    officialUrl: 'https://www.lamborghini.com/en-en/dealerships#showroom,64501',
  },
];

// Reference sample showrooms from original design sheet
export const SAMPLE_SHOWROOMS: ShowroomStudy[] = OFFICIAL_LAMBORGHINI_DEALERSHIPS;

export interface AppointmentPayload {
  service: string;
  date: string;
  email: string;
}

export function filterShowrooms(
  showrooms: ShowroomStudy[] = OFFICIAL_LAMBORGHINI_DEALERSHIPS,
  searchQuery: string = '',
  country: string = 'Italy',
  city: string = 'All',
  category: 'showroom' | 'service' | 'collision' = 'showroom'
): ShowroomStudy[] {
  const q = searchQuery.trim().toLowerCase();

  // If search matches exact dealer code (like 63540 from the URL)
  if (q && /^\d+$/.test(q)) {
    const byCode = showrooms.filter((s) => s.code === q);
    if (byCode.length > 0) return byCode;
  }

  // Filter by category
  let list = showrooms.filter((s) => s.category === category || !s.category);

  // If specific city is requested
  if (city && city !== 'All') {
    const byCity = list.filter((s) => s.city.toLowerCase() === city.toLowerCase());
    if (byCity.length > 0) return byCity;
  }

  // If text query is provided
  if (q) {
    const matched = list.filter((showroom) => {
      return (
        showroom.name.toLowerCase().includes(q) ||
        showroom.city.toLowerCase().includes(q) ||
        showroom.address.toLowerCase().includes(q) ||
        showroom.country.toLowerCase().includes(q) ||
        showroom.code.toLowerCase().includes(q)
      );
    });
    if (matched.length > 0) return matched;
  }

  // If country is specified
  if (country && country !== 'All') {
    const byCountry = list.filter((s) => s.country.toLowerCase() === country.toLowerCase());
    if (byCountry.length > 0) return byCountry;
  }

  return list;
}

export function validateAppointmentForm(data: Partial<AppointmentPayload>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.service || data.service === 'Choose a service' || data.service.trim() === '') {
    errors.service = 'Please select a service of interest.';
  }

  if (!data.date || data.date.trim() === '') {
    errors.date = 'Please provide your preferred date.';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
