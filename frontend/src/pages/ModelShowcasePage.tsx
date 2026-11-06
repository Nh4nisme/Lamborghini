import React, { useState } from 'react';
import HeroSection from '../features/model/components/HeroSection';
import OverviewSection from '../features/model/components/OverviewSection';
import PowertrainSection from '../features/model/components/PowertrainSection';
import AerodynamicsSection from '../features/model/components/AerodynamicsSection';
import SoundStudySection from '../features/model/components/SoundStudySection';
import CockpitSection from '../features/model/components/CockpitSection';
import DetailGallerySection from '../features/model/components/DetailGallerySection';
import TechnicalSpecsSection from '../features/model/components/TechnicalSpecsSection';
import AdPersonamSection from '../features/model/components/AdPersonamSection';
import JourneySection from '../features/model/components/JourneySection';
import NextChapterCTA from '../features/model/components/NextChapterCTA';
import { defaultSupercarData } from '../features/model/data';

const ModelShowcasePage: React.FC = () => {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="bg-[#070707] min-h-screen">
      <HeroSection
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />
      
      <OverviewSection />
      <PowertrainSection />
      <AerodynamicsSection />
      <SoundStudySection />
      <CockpitSection />
      <DetailGallerySection />
      <TechnicalSpecsSection onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <AdPersonamSection onOpenConfigurator={() => setIsConfiguratorOpen(true)} />
      <JourneySection 
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
      />
      <NextChapterCTA 
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* Modals - you can add ConfiguratorModal and EnquiryModal components later */}
      {isConfiguratorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-[#0a0a0a] p-8 rounded max-w-2xl">
            <h2 className="text-2xl text-white mb-4">Configurator Coming Soon</h2>
            <button
              onClick={() => setIsConfiguratorOpen(false)}
              className="px-6 py-2 bg-[#d4af37] text-black font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-[#0a0a0a] p-8 rounded max-w-2xl">
            <h2 className="text-2xl text-white mb-4">Enquiry Form Coming Soon</h2>
            <button
              onClick={() => setIsEnquiryOpen(false)}
              className="px-6 py-2 bg-[#d4af37] text-black font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelShowcasePage;
