import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Shield,
  RotateCcw,
} from 'lucide-react';
import type { ShowroomStudy } from '../data';
import { OFFICIAL_LAMBORGHINI_DEALERSHIPS } from '../data';

interface ShowroomBoxMapProps {
  selectedShowroomId: string;
  onSelectShowroom: (showroom: ShowroomStudy) => void;
  onRequestAppointment?: (showroom: ShowroomStudy) => void;
}

// Custom Lamborghini Gold & Black Shield SVG icon generator for Leaflet
function createLamborghiniShieldIcon(isSelected: boolean, city: string, code?: string): L.DivIcon {
  const size = isSelected ? 42 : 32;
  const strokeColor = isSelected ? '#d4af37' : '#c5a045';
  const fillColor = '#0c0a07';

  const html = `
    <div class="relative group cursor-pointer flex flex-col items-center select-none" style="transform: translate(-50%, -100%);">
      ${
        isSelected
          ? `<div class="absolute -inset-2.5 rounded-full border-2 border-[#d4af37] animate-ping opacity-75 pointer-events-none"></div>`
          : ''
      }
      <div style="width: ${size}px; height: ${size + 6}px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.9));">
        <svg viewBox="0 0 100 115" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer Shield Border -->
          <path d="M50 4 L94 20 L84 84 L50 110 L16 84 L6 20 Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isSelected ? 4 : 2.5}" />
          <!-- Inner Accent Border -->
          <path d="M50 10 L88 24 L79 80 L50 103 L21 80 L12 24 Z" fill="#14110b" stroke="${isSelected ? '#f3d978' : '#8e7737'}" stroke-width="1.2" />
          <!-- Gold Bull Crest Silhouette -->
          <path d="M50 28 C46 32 36 34 32 38 C28 42 32 46 36 45 C40 44 44 48 48 50 C44 54 38 56 34 60 C38 64 48 62 52 58 C56 62 66 64 70 60 C66 56 60 54 56 50 C60 48 64 44 68 45 C72 46 76 42 72 38 C68 34 58 32 54 28 Z" fill="#d4af37" />
          <!-- Bull horns & stance -->
          <circle cx="50" cy="42" r="5" fill="#f8e79b" />
          <path d="M38 74 L42 84 L48 84 L50 78 L52 84 L58 84 L62 74 Z" fill="#d4af37" />
          <!-- Small brand bar -->
          <rect x="26" y="16" width="48" height="6" rx="1" fill="#d4af37" />
          <text x="50" y="21" fill="#000000" font-size="4.5" font-family="'Barlow Condensed', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="0.5">LAMBORGHINI</text>
        </svg>
      </div>
      <!-- Label below marker -->
      <div class="mt-1 px-1.5 py-0.5 bg-black/95 border text-[9px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md pointer-events-none transition-all ${
        isSelected
          ? 'border-[#d4af37] text-[#d4af37]'
          : 'border-[#332b1c] text-[#d5cbb7]'
      }">
        ${city}${code ? ` #${code}` : ''}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-lambo-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export const ShowroomBoxMap: React.FC<ShowroomBoxMapProps> = ({
  selectedShowroomId,
  onSelectShowroom,
  onRequestAppointment,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');
  const [viewMode, setViewMode] = useState<'live' | 'schematic'>('live');

  // Find currently selected showroom
  const currentShowroom =
    OFFICIAL_LAMBORGHINI_DEALERSHIPS.find((s) => s.id === selectedShowroomId) ||
    OFFICIAL_LAMBORGHINI_DEALERSHIPS[0];

  // Initialize Map
  useEffect(() => {
    if (viewMode !== 'live' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = currentShowroom.lat || 45.45423;
      const initialLng = currentShowroom.lng || 10.92022;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      // Esri World Dark Gray base tiles
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
          attribution: 'Tiles &copy; Esri',
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode]);

  // Update tile layer when style toggles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapStyle === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);
    } else {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16 }
      ).addTo(map);
    }
  }, [mapStyle]);

  // Populate Markers for all Lamborghini Showrooms
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || viewMode !== 'live') return;

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    OFFICIAL_LAMBORGHINI_DEALERSHIPS.forEach((showroom) => {
      if (!showroom.lat || !showroom.lng) return;

      const isSelected = showroom.id === selectedShowroomId;
      const icon = createLamborghiniShieldIcon(isSelected, showroom.city, showroom.code);

      const marker = L.marker([showroom.lat, showroom.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(map);

      // Popup with official details
      const popupHtml = `
        <div class="bg-[#0b0a07] border border-[#d4af37] p-3 text-white font-sans max-w-[240px] shadow-2xl">
          <div class="text-[9px] font-bold text-[#d4af37] tracking-[0.16em] uppercase">OFFICIAL SHOWROOM</div>
          <div class="text-sm font-extrabold uppercase mt-0.5 tracking-wide text-white">${showroom.name}</div>
          <div class="text-[10px] text-[#bbb] mt-1 leading-snug">${showroom.address}</div>
          ${showroom.phone ? `<div class="text-[10px] text-[#d4af37] font-semibold mt-1.5">${showroom.phone}</div>` : ''}
          <div class="mt-2 pt-2 border-t border-[#2a2316] flex items-center justify-between text-[9px]">
            <span class="text-[#888]">${showroom.city}, ${showroom.country}</span>
            <span class="text-[#d4af37] font-bold">#${showroom.code || '63540'}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'lambo-leaflet-popup',
        closeButton: false,
        offset: [0, -32],
      });

      marker.on('click', () => {
        onSelectShowroom(showroom);
      });

      if (isSelected) {
        marker.openPopup();
      }

      markersRef.current.set(showroom.id, marker);
    });
  }, [selectedShowroomId, viewMode]);

  // Smooth flyTo when selectedShowroomId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || viewMode !== 'live') return;

    if (currentShowroom && currentShowroom.lat && currentShowroom.lng) {
      map.flyTo([currentShowroom.lat, currentShowroom.lng], 10, {
        duration: 1.2,
      });

      const activeMarker = markersRef.current.get(currentShowroom.id);
      if (activeMarker) {
        activeMarker.openPopup();
      }
    }
  }, [selectedShowroomId, viewMode]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetToItaly = () => {
    mapInstanceRef.current?.flyTo([43.5, 12.0], 6.5, { duration: 1.2 });
  };

  return (
    <div className="bg-[#0b0a08] border border-[#2b2518] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden min-h-[340px] sm:min-h-[380px]">
      {/* Map Sub-Header (Matches: SCHEMATIC / EMILIA-ROMAGNA with Coordinates) */}
      <div className="flex items-center justify-between z-10 pb-3 border-b border-[#1c1811] mb-2">
        <div className="flex items-center gap-3">
          <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#d4af37] uppercase flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              {viewMode === 'live'
                ? 'MAP / OFFICIAL SHOWROOM NETWORK'
                : 'SCHEMATIC / EMILIA-ROMAGNA'}
            </span>
          </div>

          {/* Toggle between Live Map and Schematic */}
          <button
            onClick={() => setViewMode(viewMode === 'live' ? 'schematic' : 'live')}
            className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#383020] hover:border-[#d4af37] text-[#8e826b] hover:text-white transition-colors cursor-pointer"
          >
            {viewMode === 'live' ? 'Switch to Schematic' : 'Switch to Live Map'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase text-[#888] tracking-wider">
          <Compass className="w-3 h-3 text-[#d4af37]" />
          <span>
            {currentShowroom.city.toUpperCase()}{' '}
            <strong className="text-[#d4af37]">#{currentShowroom.code || '63540'}</strong>
          </span>
        </div>
      </div>

      {/* Main Map Body: Live Leaflet or Schematic */}
      {viewMode === 'live' ? (
        <div className="relative w-full h-64 sm:h-72 my-1 overflow-hidden border border-[#201a11]">
          {/* Leaflet DOM container */}
          <div ref={mapContainerRef} className="w-full h-full bg-[#080808]" />

          {/* Luxury In-Map Overlay Controls */}
          <div className="absolute top-2.5 right-2.5 z-[400] flex flex-col gap-1.5">
            <div className="flex bg-black/90 border border-[#332a18] p-0.5 shadow-lg">
              <button
                onClick={() => setMapStyle('dark')}
                className={`px-2 py-1 text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-colors ${
                  mapStyle === 'dark'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setMapStyle('satellite')}
                className={`px-2 py-1 text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-colors ${
                  mapStyle === 'satellite'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                Satellite
              </button>
            </div>

            <div className="flex flex-col bg-black/90 border border-[#332a18] p-0.5 shadow-lg">
              <button
                onClick={handleZoomIn}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-[#d4af37] hover:bg-[#1a1610] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-[#d4af37] hover:bg-[#1a1610] cursor-pointer border-t border-[#221c12]"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleResetToItaly}
              className="bg-black/90 border border-[#332a18] hover:border-[#d4af37] text-[#d4af37] p-1.5 flex items-center justify-center shadow-lg cursor-pointer"
              title="Reset View to Italy Network"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom active showroom indicator badge */}
          <div className="absolute bottom-2 left-2 z-[400] bg-black/90 border border-[#383020] px-2.5 py-1 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-[#888] uppercase tracking-wider text-[9px]">Showing:</span>
            <span className="font-bold text-[#d4af37] uppercase">{currentShowroom.name}</span>
          </div>
        </div>
      ) : (
        /* Schematic SVG Map fallback */
        <div className="relative w-full h-64 sm:h-72 my-1 border border-[#201a11] bg-[#080808] flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="120,120 240,65 375,175 120,120"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <line
              x1="120"
              y1="120"
              x2="375"
              y2="175"
              stroke="#d4af37"
              strokeWidth="0.8"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
            />
            <line
              x1="240"
              y1="65"
              x2="100"
              y2="40"
              stroke="#443b2a"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <line
              x1="375"
              y1="175"
              x2="450"
              y2="210"
              stroke="#443b2a"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />

            {/* Modena Node */}
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer group"
              onClick={() => {
                const modena = OFFICIAL_LAMBORGHINI_DEALERSHIPS.find((s) => s.id === 'bologna');
                if (modena) onSelectShowroom(modena);
              }}
            >
              <circle cx="120" cy="120" r="5" fill="#d4af37" />
              <text x="105" y="142" fill="#cccccc" fontSize="11" fontFamily="'Barlow Condensed'">
                Modena
              </text>
            </g>

            {/* Sant'Agata Bolognese Node */}
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer group"
              onClick={() => {
                const bologna = OFFICIAL_LAMBORGHINI_DEALERSHIPS.find((s) => s.id === 'bologna');
                if (bologna) onSelectShowroom(bologna);
              }}
            >
              <circle cx="240" cy="65" r="5" fill="#d4af37" />
              <text x="235" y="50" fill="#ffffff" fontSize="11" fontFamily="'Barlow Condensed'">
                Sant&apos;Agata Bolognese
              </text>
            </g>

            {/* Bologna Node */}
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer group"
              onClick={() => {
                const verona = OFFICIAL_LAMBORGHINI_DEALERSHIPS.find((s) => s.id === 'verona');
                if (verona) onSelectShowroom(verona);
              }}
            >
              <circle cx="375" cy="175" r="5" fill="#d4af37" />
              <text x="368" y="198" fill="#cccccc" fontSize="11" fontFamily="'Barlow Condensed'">
                Bologna
              </text>
            </g>
          </svg>
        </div>
      )}

      {/* Map Footer Note (Matches: Illustrative sample locations...) */}
      <div className="flex items-center justify-between text-[10px] text-[#777] z-10 pt-2.5 border-t border-[#1d1911]">
        <span>
          {viewMode === 'live'
            ? 'Interactive official Lamborghini showroom network with live coordinates.'
            : 'Illustrative sample locations. No live map data or distance estimates.'}
        </span>
        <span className="text-[#8e826b] font-medium hidden sm:inline">
          {OFFICIAL_LAMBORGHINI_DEALERSHIPS.length} locations
        </span>
      </div>
    </div>
  );
};
