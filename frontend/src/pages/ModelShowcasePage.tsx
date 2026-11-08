import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
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
import NextChapterCTA from '../components/NextChapterCTA';
import ScrollToTop from '../components/ScrollToTop';
import { defaultSupercarData } from '../features/model/data';
import { useModelDetail } from '../features/model/hooks';
import { adaptModelDetailToCarData } from '../features/model/types';
import { LoadingScreen } from '../components/LoadingScreen';

const ModelShowcasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const modelId = Number(id);
  
  // Fetch model detail từ API mới
  const { data: modelDetail, isLoading, isError } = useModelDetail(modelId);
  
  // Merge API data với form mẫu
  const carData = modelDetail 
    ? adaptModelDetailToCarData(modelDetail, defaultSupercarData)
    : defaultSupercarData;

  const navigate = useNavigate();
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Invalid ID
  if (!id || isNaN(modelId)) {
    return <Navigate to="/models/1" replace />;
  }

  // Scroll to top khi đổi model
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Error state
  if (isError || !modelDetail) {
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
        onOpenConfigurator={() => navigate(`/configurator/${modelId}`)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />
      
      <OverviewSection carData={carData} />
      <PowertrainSection carData={carData} />
      <AerodynamicsSection carData={carData} />
      <SoundStudySection carData={carData} />
      <CockpitSection carData={carData} />
      
      {/* Detail Gallery (In Detail) */}
      <DetailGallerySection carData={carData} />
      <TechnicalSpecsSection carData={carData} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <AdPersonamSection carData={carData} onOpenConfigurator={() => navigate(`/configurator/${modelId}`)} />
      <JourneySection 
        carData={carData}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenConfigurator={() => navigate(`/configurator/${modelId}`)}
      />
      <NextChapterCTA 
        onOpenConfigurator={() => navigate(`/configurator/${modelId}`)}
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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default ModelShowcasePage;
