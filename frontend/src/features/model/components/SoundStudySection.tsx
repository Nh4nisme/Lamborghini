import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, VolumeX } from 'lucide-react';
import { type CarModelData, getModelFolder } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SoundStudySectionProps {
  carData: CarModelData;
}

export const SoundStudySection: React.FC<SoundStudySectionProps> = ({ carData }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true); // Mặc định tắt tiếng
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const modelFolder = getModelFolder(carData.name);
  const sectionRef = useRef<HTMLElement>(null);
  const videoPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Khi chuyển model khác thì dừng cả video lẫn audio và reset
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [carData.name]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate video panel with scale
      if (videoPanelRef.current) {
        gsap.from(videoPanelRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate title and description
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [carData.name]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!isVideoMuted && audio && video) {
      audio.currentTime = video.currentTime;
      audio.play().catch(err => {
        console.log('Audio autoplay blocked or failed:', err);
      });
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Đồng bộ thời gian giữa video và file audio sound.mp3
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video && audio && !isVideoMuted && isVideoPlaying) {
      const diff = Math.abs(video.currentTime - audio.currentTime);
      // Nếu video loop lại từ đầu hoặc lệch quá 0.3s thì sync lại
      if (diff > 0.3) {
        audio.currentTime = video.currentTime;
      }
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      if (audio) {
        audio.pause();
      }
    } else {
      video.play().then(() => {
        if (!isVideoMuted && audio) {
          audio.currentTime = video.currentTime;
          audio.play().catch(err => console.log('Audio play error:', err));
        }
      }).catch(err => {
        console.log('Video play error:', err);
      });
    }
  };

  const handleMuteToggle = () => {
    const nextMuted = !isVideoMuted;
    setIsVideoMuted(nextMuted);

    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.muted = nextMuted;
    }

    if (audio) {
      audio.muted = nextMuted;
      if (!nextMuted) {
        // Mở tiếng: nếu video đang phát thì đồng bộ và phát sound.mp3
        if (isVideoPlaying && video) {
          audio.currentTime = video.currentTime;
          audio.play().catch(err => console.log('Audio play error:', err));
        }
      } else {
        // Tắt tiếng
        audio.pause();
      }
    }
  };

  return (
    <section ref={sectionRef} id="sound" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            04
          </span>
        </div>
        
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-6">
          04 / ENGINE SOUND
        </div>

        {/* Central Audio / Video Panel Container */}
        <div ref={videoPanelRef} className="relative border border-[#2b2518] overflow-hidden bg-[#0c0c0c] max-w-4xl mx-auto group">
          {/* File âm thanh sound.mp3 đi kèm với video sound-engine.mp4 */}
          <audio
            key={`audio-${modelFolder}`}
            ref={audioRef}
            src={`/Images/model-detail/${modelFolder}/sound.mp3`}
            loop
            preload="auto"
          />

          {/* Engine Visual - Local sound-engine video for all models */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden">
            <video
              key={`video-${modelFolder}`}
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted={isVideoMuted}
              playsInline
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onTimeUpdate={handleTimeUpdate}
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
                  className="w-20 h-20 rounded-full bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed transition-all transform hover:scale-105 flex items-center justify-center cursor-pointer shadow-lg shadow-lambo-primary/30"
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
                className="p-2.5 bg-black/80 border border-lambo-primary/50 hover:bg-lambo-primary/20 transition-colors cursor-pointer"
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
                className="p-2.5 bg-black/80 border border-lambo-primary/50 hover:bg-lambo-primary/20 transition-colors cursor-pointer"
                aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
              >
                {isVideoMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-lambo-primary" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Title & Description */}
        <div ref={titleRef} className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-wide mb-4 font-barlow"
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
