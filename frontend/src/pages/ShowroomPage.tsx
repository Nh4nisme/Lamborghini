import React, { useState } from 'react';
import {
  ArrowUpRight,
  Search,
  Calendar,
  Mail,
  MapPin,
  Check,
  X,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import type { ShowroomStudy } from '../features/showroom/data';
import {
  OFFICIAL_LAMBORGHINI_DEALERSHIPS,
  filterShowrooms,
  validateAppointmentForm,
} from '../features/showroom/data';
import { ShowroomBoxMap } from '../features/showroom/components/ShowroomBoxMap';
import { useShowroom } from '../features/showroom/hooks';
import { adaptShowroomToUI } from '../features/showroom/types';

export default function ShowroomPage() {
  // API hook
  const { data: apiShowrooms, isLoading, isError } = useShowroom();

  // Filter state
  const [searchLocation, setSearchLocation] = useState('Verona');
  const [selectedCountry, setSelectedCountry] = useState('Italy');
  const [selectedCity, setSelectedCity] = useState('Verona');
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  // Selected showroom state (default: verona #showroom,63540 from user prompt)
  const [selectedShowroomId, setSelectedShowroomId] = useState<string>('verona');

  // Appointment section state
  const [appointmentService, setAppointmentService] = useState('Sales consultation');
  const [appointmentDate, setAppointmentDate] = useState('2026-11-20');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentErrors, setAppointmentErrors] = useState<Record<string, string>>({});
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Modals state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailShowroom, setDetailShowroom] = useState<ShowroomStudy | null>(null);

  // Filtered showrooms from official dealerships dataset
  const filteredList = filterShowrooms(
    OFFICIAL_LAMBORGHINI_DEALERSHIPS,
    searchLocation,
    selectedCountry,
    selectedCity === 'All' ? 'All' : selectedCity
  );

  const displayShowrooms = filteredList.length > 0 ? filteredList : OFFICIAL_LAMBORGHINI_DEALERSHIPS;

  // Convert API showrooms to UI format
  const apiShowroomsUI = apiShowrooms ? apiShowrooms.map(adaptShowroomToUI) : [];

  // Selected showroom object
  const currentSelectedShowroom =
    apiShowroomsUI.find((s) => s.id === selectedShowroomId) ||
    apiShowroomsUI[0] ||
    OFFICIAL_LAMBORGHINI_DEALERSHIPS.find((s) => s.id === selectedShowroomId) ||
    displayShowrooms[0] ||
    OFFICIAL_LAMBORGHINI_DEALERSHIPS[0];

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredList.length > 0) {
      setSelectedShowroomId(filteredList[0].id);
    }
  };

  const handleUseMyLocation = () => {
    setSearchLocation('Verona');
    setSelectedCountry('Italy');
    setSelectedCity('Verona');
    setSelectedShowroomId('verona');
  };

  const handleSelectShowroom = (showroom: ShowroomStudy) => {
    setSelectedShowroomId(showroom.id);
  };

  const handleOpenDetails = (showroom: ShowroomStudy) => {
    setDetailShowroom(showroom);
    setDetailsModalOpen(true);
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAppointmentForm({
      service: appointmentService,
      date: appointmentDate,
      email: appointmentEmail,
    });

    if (!validation.isValid) {
      setAppointmentErrors(validation.errors);
      setAppointmentSuccess(false);
      return;
    }

    setAppointmentErrors({});
    setAppointmentSuccess(true);
    setTimeout(() => {
      setAppointmentSuccess(false);
    }, 5000);
  };

  const scrollToAppointment = () => {
    const el = document.getElementById('personal-introduction-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#e5e5e5] pt-24 pb-16 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* =========================================================================
            1. BREADCRUMB NAVIGATION (Matches: Home > DEALERSHIP > Overview)
            ========================================================================= */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#8e826b] mb-8"
        >
          <button
            onClick={() => window.location.href = '/'}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Home</span>
          </button>
          <span className="text-[#555]">&gt;</span>
          <span className="text-white font-semibold">DEALERSHIP</span>
          <span className="text-[#555]">&gt;</span>
          <span className="text-[#d4af37] font-semibold">Overview</span>
        </nav>

        {/* =========================================================================
            2. PAGE HERO TITLE
            DEALERSHIP
            YOUR WORLD.
            WITHIN REACH.
            ========================================================================= */}
        <div className="mb-14">
          <div className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#d4af37] uppercase mb-3">
            DEALERSHIP
          </div>

          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.92] mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            YOUR WORLD.
            <br />
            WITHIN REACH.
          </h1>

          <p className="text-sm sm:text-base text-[#999] max-w-2xl leading-relaxed">
            Find a place to begin your next chapter. Explore showroom services, discuss your
            configuration and plan a personal consultation.
          </p>
        </div>

        {/* =========================================================================
            3. FIND A SHOWROOM / ADAPTED LOCATOR PATTERN (FORM SECTION)
            ========================================================================= */}
        <section aria-label="Find a Showroom" className="mb-12">
          <div className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#d4af37] uppercase mb-4">
            FIND A SHOWROOM / ADAPTED LOCATOR PATTERN
          </div>

          <form onSubmit={handleSearchClick} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Field 1: Location */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Enter a city or region"
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <Search className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                  Enter a city or region.
                </p>
              </div>

              {/* Field 2: Country */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm appearance-none focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                  >
                    <option value="Italy">Italy</option>
                    <option value="All">All Countries</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Vietnam">Vietnam</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                  Sample country selection.
                </p>
              </div>

              {/* Field 3: City */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  City
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      if (e.target.value !== 'All') {
                        setSearchLocation(e.target.value);
                        const match = OFFICIAL_LAMBORGHINI_DEALERSHIPS.find(
                          (d) => d.city.toLowerCase() === e.target.value.toLowerCase()
                        );
                        if (match) setSelectedShowroomId(match.id);
                      }
                    }}
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm appearance-none focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                  >
                    <option value="Verona">Verona (#63540)</option>
                    <option value="Bologna">Bologna (#63501)</option>
                    <option value="Milan">Milan (#63510)</option>
                    <option value="Bergamo">Bergamo (#63515)</option>
                    <option value="Rome">Rome (#63520)</option>
                    <option value="Torino">Torino (#63525)</option>
                    <option value="Bari">Bari (#63530)</option>
                    <option value="All">All Cities</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                  Sample city selection.
                </p>
              </div>
            </div>

            {/* Action Buttons & Note */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="py-3 px-6 text-xs font-bold uppercase tracking-[0.18em] text-black bg-[#d4af37] hover:bg-[#e6be43] transition-colors flex items-center gap-2 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span>SEARCH SHOWROOMS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="py-3 px-6 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#3d331f] hover:border-[#d4af37] bg-black hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span>USE MY LOCATION</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                </button>
              </div>

              {/* Direct link to user's requested URL: https://www.lamborghini.com/en-en/dealerships#showroom,63540 */}
              <a
                href="https://www.lamborghini.com/en-en/dealerships#showroom,63540"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#8e826b] hover:text-[#d4af37] flex items-center gap-1.5 transition-colors"
              >
                <span>Official Locator: lamborghini.com (#63540)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-[11px] text-[#6b6455] leading-relaxed pt-1">
              Design adaptation: the live locator and its results were not independently verified.
              All showroom records below are clearly marked placeholders.
            </p>
          </form>
        </section>

        {/* =========================================================================
            4. TABS ROW: MAP | LIST | 3 SAMPLE RESULTS
            (Exact match to Dealership.png reference)
            ========================================================================= */}
        <div className="border-b border-[#201a12] flex items-center justify-between mb-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('map')}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer border-b-2 ${
                activeTab === 'map'
                  ? 'text-[#d4af37] border-[#d4af37]'
                  : 'text-[#888] hover:text-white border-transparent'
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              MAP
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer border-b-2 ${
                activeTab === 'list'
                  ? 'text-[#d4af37] border-[#d4af37]'
                  : 'text-[#888] hover:text-white border-transparent'
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              LIST
            </button>
          </div>

          <div
            className="pb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8e826b]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {activeTab === 'map' ? '3 SAMPLE RESULTS' : `${displayShowrooms.length} LOCATIONS`}
          </div>
        </div>

        {/* =========================================================================
            5. MAIN CONTENT:
               EXACT 2-COLUMN LAYOUT AS DESIGNED IN Dealership.png:
               - Left Column (7 cols): Map Box (now displaying ALL showrooms) + Architecture Photo
               - Right Column (5 cols): 3 Location Cards stacked vertically
            ========================================================================= */}
        {activeTab === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
            {/* Left Column (7 cols): Showroom Map + Architecture Photo */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* The Map Box: displaying all showrooms like on lambo map */}
              <ShowroomBoxMap
                selectedShowroomId={currentSelectedShowroom.id}
                onSelectShowroom={handleSelectShowroom}
                onRequestAppointment={(showroom) => {
                  handleSelectShowroom(showroom);
                  scrollToAppointment();
                }}
              />

              {/* Architectural Concept Photo Container */}
              <div>
                <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#2b2518] bg-[#0c0c0c]">
                  <img
                    src="/images/showroom-architecture.jpg"
                    alt="A showroom experience / original architectural concept"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-[#888] mt-2 tracking-wide">
                  A showroom experience / original architectural concept
                </p>
              </div>
            </div>

            {/* Right Column (5 cols): Showroom Cards with Scroll */}
            <div className="lg:col-span-5 flex flex-col">
              {isLoading && (
                <div className="flex items-center justify-center p-10">
                  <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {isError && (
                <div className="p-6 bg-[#1a0a0a] border border-red-900 text-red-400 text-center">
                  <p>Không thể tải danh sách showroom</p>
                </div>
              )}

              {!isLoading && !isError && apiShowroomsUI.length > 0 && (
                <div className="flex flex-col gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                  {apiShowroomsUI.map((loc) => {
                    const isSelected = currentSelectedShowroom?.id === loc.id;
                    return (
                      <div
                        key={loc.id}
                        onClick={() => setSelectedShowroomId(loc.id)}
                        className={`p-6 transition-all duration-300 cursor-pointer flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#0b0a07] border border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-2xl'
                            : 'bg-[#100e0b] border border-[#262016] hover:border-[#524429]'
                        }`}
                      >
                        {/* Badge */}
                        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#d4af37] uppercase mb-2">
                          {isSelected ? 'SELECTED / OFFICIAL SHOWROOM' : 'OFFICIAL SHOWROOM'}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide mb-2.5 leading-tight"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {loc.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#a0a0a0] leading-relaxed mb-3">
                          {loc.description}
                        </p>

                        {/* Services */}
                        <div className="text-[11px] text-[#8e826b] font-medium tracking-wide mb-3">
                          {loc.services}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-1.5 text-xs text-[#999] mb-4">
                          <div>📍 {loc.address}</div>
                          <div>📞 {loc.phone}</div>
                          <div>🕐 {loc.hours}</div>
                        </div>

                        {/* Status Badge */}
                        {loc.trangThai && (
                          <div className="mb-3">
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 ${
                              loc.trangThai === 'HOAT_DONG' 
                                ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30'
                                : 'bg-[#555]/10 text-[#999] border border-[#555]/30'
                            }`}>
                              {loc.trangThai === 'HOAT_DONG' ? 'Đang hoạt động' : loc.trangThai}
                            </span>
                          </div>
                        )}

                        {/* Action Button */}
                        <div>
                          {isSelected ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToAppointment();
                              }}
                              className="py-2.5 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white border border-[#4d3f23] hover:border-[#d4af37] bg-black hover:bg-[#d4af37]/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                              <span>REQUEST APPOINTMENT</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDetails(loc);
                              }}
                              className="py-2.5 px-5 text-xs font-bold uppercase tracking-[0.16em] text-[#bbb] hover:text-white border border-[#2b2518] hover:border-[#555] bg-transparent transition-colors flex items-center gap-1.5 cursor-pointer"
                              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                              <span>VIEW DETAILS</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#888]" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* List Tab View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {displayShowrooms.map((loc) => {
              const isSelected = currentSelectedShowroom.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleSelectShowroom(loc)}
                  className={`p-6 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0b0a07] border border-[#d4af37] ring-1 ring-[#d4af37]/50'
                      : 'bg-[#100e0b] border border-[#262016] hover:border-[#524429]'
                  }`}
                >
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2">
                    {loc.city.toUpperCase()} · #{loc.code || '63540'}
                  </div>
                  <h3
                    className="text-xl font-bold uppercase text-white mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {loc.name}
                  </h3>
                  <p className="text-xs text-[#999] mb-3">{loc.address}</p>
                  <div className="text-[11px] text-[#8e826b] mb-4">{loc.services}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectShowroom(loc);
                      setActiveTab('map');
                      scrollToAppointment();
                    }}
                    className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6be43] transition-colors flex items-center gap-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <span>SELECT &amp; APPOINTMENT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            6. "A PERSONAL INTRODUCTION." SECTION (APPOINTMENT ROW)
            (Exact match to Dealership.png)
            ========================================================================= */}
        <section
          id="personal-introduction-section"
          aria-label="A Personal Introduction"
          className="border-t border-[#221c13] pt-14 pb-16"
        >
          {/* Sub-tag */}
          <div className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#d4af37] uppercase mb-3">
            SELECTED LOCATION / {currentSelectedShowroom.city.toUpperCase()} — SAMPLE
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            A PERSONAL INTRODUCTION.
          </h2>

          {/* Description */}
          <p className="text-sm text-[#999] max-w-3xl leading-relaxed mb-8">
            Discuss the range, explore Ad Personam materials or ask about ownership and service.
            Address, opening hours and contact details will be confirmed by the selected showroom.
            No phone number is fabricated for this study.
          </p>

          {/* Form Rows */}
          <form onSubmit={handleAppointmentSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Field 1: Service of interest */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  Service of interest
                </label>
                <div className="relative">
                  <select
                    value={appointmentService}
                    onChange={(e) => setAppointmentService(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm appearance-none focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                  >
                    <option value="Sales consultation">Choose a service</option>
                    <option value="Sales consultation">Sales consultation</option>
                    <option value="Ad Personam personalization">Ad Personam personalization</option>
                    <option value="Aftersales & Service enquiry">Aftersales &amp; Service enquiry</option>
                    <option value="Factory Delivery Consultation">Factory Delivery Consultation</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {appointmentErrors.service ? (
                  <p className="text-[10px] text-red-400 mt-1">{appointmentErrors.service}</p>
                ) : (
                  <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                    Sales / Personalization / Service
                  </p>
                )}
              </div>

              {/* Field 2: Preferred date */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  Preferred date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {appointmentErrors.date ? (
                  <p className="text-[10px] text-red-400 mt-1">{appointmentErrors.date}</p>
                ) : (
                  <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                    Subject to showroom confirmation.
                  </p>
                )}
              </div>

              {/* Field 3: Email address */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#8e826b] font-semibold mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={appointmentEmail}
                    onChange={(e) => setAppointmentEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#121212] border border-[#2b2518] text-white px-3.5 py-3 pr-10 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#777] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {appointmentErrors.email ? (
                  <p className="text-[10px] text-red-400 mt-1">{appointmentErrors.email}</p>
                ) : (
                  <p className="text-[10px] sm:text-[11px] text-[#666] mt-1.5">
                    Use the contact form to continue.
                  </p>
                )}
              </div>
            </div>

            {/* Success Feedback Banner */}
            {appointmentSuccess && (
              <div className="p-4 bg-[#141209] border border-[#d4af37] flex items-center gap-3 animate-fadeIn">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <p className="text-xs text-white">
                  Thank you. Your consultation request for{' '}
                  <span className="text-[#d4af37] font-semibold">
                    {currentSelectedShowroom.name}
                  </span>{' '}
                  ({appointmentService}) on {appointmentDate} has been recorded.
                </p>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="py-3 px-6 text-xs font-bold uppercase tracking-[0.18em] text-black bg-[#d4af37] hover:bg-[#e6be43] transition-colors flex items-center gap-2 cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>REQUEST APPOINTMENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => alert('Chức năng đang phát triển')}
                className="py-3 px-6 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#3d331f] hover:border-[#d4af37] bg-black hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2 cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>CONTACT CUSTOMER CARE</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>

            <p className="text-[11px] text-[#6b6455] leading-relaxed pt-1">
              Static appointment design. No booking is made and no personal information is sent.
            </p>
          </form>
        </section>

        {/* =========================================================================
            7. HERO CALLOUT BANNER:
               "LET'S BEGIN THE CONVERSATION."
               Background twilight showroom image
               (Exact match to Dealership.png)
            ========================================================================= */}
        <section aria-label="Let's Begin the Conversation" className="relative mb-20 overflow-hidden">
          <div className="relative min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-8 sm:p-14 border border-[#2b2518]">
            {/* Background Image & Gradient */}
            <img
              src="/images/showroom-architecture.jpg"
              alt="Showroom Twilight Concept"
              className="absolute inset-0 w-full h-full object-cover object-center z-0 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent z-1" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-1" />

            {/* Content Top */}
            <div className="relative z-10 max-w-xl">
              <div className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#d4af37] uppercase mb-4">
                AN EXPERIENCE, NOT JUST A VISIT
              </div>

              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                LET&apos;S BEGIN
                <br />
                THE CONVERSATION.
              </h2>

              <button
                onClick={() => alert('Chức năng đang phát triển')}
                className="py-3 px-6 text-xs font-bold uppercase tracking-[0.18em] text-black bg-[#d4af37] hover:bg-[#e6be43] transition-colors flex items-center gap-2 cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>MAKE AN ENQUIRY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Banner Footer Indicators */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8e826b] pt-8">
              <span>01 / 03</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>SCROLL TO EXPLORE</span>
                <span>↓</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          8. SHOWROOM DETAILS MODAL
          ========================================================================= */}
      {detailsModalOpen && detailShowroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e0d0b] border border-[#383020] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#242017] mb-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                  SHOWROOM DETAILS / {detailShowroom.city.toUpperCase()}
                </div>
                <h3
                  className="text-2xl font-black uppercase text-white tracking-wide mt-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {detailShowroom.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="p-1.5 text-[#888] hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#ccc] mb-6">
              <div>
                <span className="text-[#8e826b] block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Address
                </span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{detailShowroom.address}</span>
                </span>
              </div>

              <div>
                <span className="text-[#8e826b] block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Operating Hours
                </span>
                <span className="text-white font-medium">{detailShowroom.hours}</span>
              </div>

              {detailShowroom.phone && (
                <div>
                  <span className="text-[#8e826b] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Phone
                  </span>
                  <span className="text-white font-medium">{detailShowroom.phone}</span>
                </div>
              )}

              {detailShowroom.trangThai && (
                <div>
                  <span className="text-[#8e826b] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Status
                  </span>
                  <span className={`text-xs uppercase font-bold tracking-wider px-2 py-1 ${
                    detailShowroom.trangThai === 'HOAT_DONG' 
                      ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30'
                      : 'bg-[#555]/10 text-[#999] border border-[#555]/30'
                  }`}>
                    {detailShowroom.trangThai === 'HOAT_DONG' ? 'Đang hoạt động' : detailShowroom.trangThai}
                  </span>
                </div>
              )}

              <div>
                <span className="text-[#8e826b] block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Services
                </span>
                <span className="text-[#bbb]">{detailShowroom.services}</span>
              </div>

              <div className="p-3 bg-[#13110d] border border-[#2b2518] text-[#888] text-[11px] leading-relaxed">
                {detailShowroom.description}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedShowroomId(detailShowroom.id);
                  setDetailsModalOpen(false);
                  scrollToAppointment();
                }}
                className="flex-1 py-3 bg-[#d4af37] text-black font-bold uppercase text-xs tracking-wider text-center cursor-pointer hover:bg-[#e6be43] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                REQUEST APPOINTMENT ↗
              </button>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="py-3 px-5 border border-[#333] text-[#aaa] hover:text-white uppercase text-xs cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
