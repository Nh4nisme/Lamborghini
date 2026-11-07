import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, VolumeX } from 'lucide-react';
import { type CarModelData, getModelFolder } from '../data';

interface SoundStudySectionProps {
  carData: CarModelData;
}

export const SoundStudySection: React.FC<SoundStudySectionProps> = ({ carData }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelFolder = getModelFolder(carData.name);

  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [carData.name]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(err => {
          console.log('Video play error:', err);
        });
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section id="sound" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            04
          </span>
        </div>
        
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-6">
          04 / ENGINE SOUND
        </div>

        {/* Central Audio / Video Panel Container */}
        <div className="relative border border-[#2b2518] overflow-hidden bg-[#0c0c0c] max-w-4xl mx-auto group">
          {/* Engine Visual - Local sound-engine video for all models */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden">
            <video
              key={modelFolder}
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted={isVideoMuted}
              playsInline
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source
                src={`/Images/model-detail/${modelFolder}/sound-engine.mp4`}
                type="video/mp4"
              />
            </video>
            
            {/* Play/Pause Center Overlay */}
            {!isVideoPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-[#d4af37] hover:bg-[#e6be43] transition-all transform hover:scale-105 flex items-center justify-center cursor-pointer shadow-lg shadow-[#d4af37]/30"
                  aria-label="Play engine sound video"
                >
                  <Play className="w-10 h-10 text-black ml-1 fill-black" />
                </button>
              </div>
            )}
            
            {/* Video Control Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <button
                onClick={handlePlayPause}
                className="p-2.5 bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                {isVideoPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white" />
                )}
              </button>
              
              <button
                onClick={handleMuteToggle}
                className="p-2.5 bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
                aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
              >
                {isVideoMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#d4af37]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Title & Description */}
        <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-wide mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.soundStudy.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mb-6">
              {carData.soundStudy.description}
            </p>
          </div>

          {/* Label on the right */}
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8e826b] self-end sm:self-auto">
            SOUND STUDY
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoundStudySection;
