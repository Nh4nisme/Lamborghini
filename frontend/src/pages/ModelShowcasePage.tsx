import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import NextChapterCTA from '../components/NextChapterCTA.tsx';
import { defaultSupercarData } from '../features/model/data';
import { useDongXe } from '../features/model/hooks';
import { adaptDongXeToCarData } from '../features/model/types';

const ModelShowcasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch dòng xe từ API
  const { data: dongXeList, isLoading, isError } = useDongXe();
  
  // Tìm dòng xe theo id từ URL
  const currentDongXe = dongXeList?.find(dx => dx.maDongXe === Number(id)) || dongXeList?.[0];
  
  // Merge API data với form mẫu
  const carData = currentDongXe 
    ? adaptDongXeToCarData(currentDongXe, defaultSupercarData)
    : defaultSupercarData;

  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Scroll to top khi chuyển model
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8e826b] uppercase tracking-wider text-sm">Loading model...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load model data</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#d4af37] text-black font-bold uppercase text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070707] min-h-screen">
      <HeroSection
        carData={carData}
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />
      
      <OverviewSection carData={carData} />
      <PowertrainSection carData={carData} />
      <AerodynamicsSection carData={carData} />
      <SoundStudySection carData={carData} />
      <CockpitSection carData={carData} />
      <DetailGallerySection carData={carData} />
      <TechnicalSpecsSection carData={carData} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <AdPersonamSection carData={carData} onOpenConfigurator={() => setIsConfiguratorOpen(true)} />
      <JourneySection 
        carData={carData}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
      />
      <NextChapterCTA 
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* Modals */}
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
