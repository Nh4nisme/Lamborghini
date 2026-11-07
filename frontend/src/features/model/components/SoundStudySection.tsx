import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../soundEngine';
import { Volume2, Play, Square, Pause, VolumeX, Gauge } from 'lucide-react';
import type { CarModelData } from '../data';

interface SoundStudySectionProps {
  carData: CarModelData;
}

export const SoundStudySection: React.FC<SoundStudySectionProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(1100);
  const [isRevving, setIsRevving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Video player states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true); // Mặc định TẮT âm
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleRpmUpdate = (newRpm: number) => {
      setRpm(newRpm);
    };
    soundEngine.onRpm(handleRpmUpdate);
    return () => {
      soundEngine.offRpm(handleRpmUpdate);
      soundEngine.stop();
    };
  }, []);

  const toggleSound = async () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      const ok = await soundEngine.start();
      if (ok) {
        setIsPlaying(true);
      }
    }
  };

  const handleStartRev = () => {
    if (!isPlaying) {
      soundEngine.start().then(() => {
        setIsPlaying(true);
        soundEngine.revTo(9500);
        setIsRevving(true);
      });
    } else {
      soundEngine.revTo(9500);
      setIsRevving(true);
    }
  };

  const handleEndRev = () => {
    soundEngine.releaseThrottle();
    setIsRevving(false);
  };
  
  // Video controls
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Draw audio spectrum visualizer
  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const freqOffset = (i / bars) * Math.PI * 4;
        const amplitude = (rpm / 10000) * 45 + Math.sin(phase + freqOffset) * 15 + Math.random() * 8;
        const barHeight = Math.max(4, Math.min(canvas.height - 4, amplitude));

        // Gold gradient
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#70571c');
        grad.addColorStop(0.7, '#d4af37');
        grad.addColorStop(1, '#fffae0');

        ctx.fillStyle = grad;
        ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
      }

      phase += 0.15 + (rpm / 10000) * 0.2;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, rpm]);

  return (
    <section id="sound-study" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-6">
          03 / ENGINE SOUND
        </div>

        {/* Central Audio / Video Panel Container */}
        <div className="relative border border-[#2b2518] overflow-hidden bg-[#0c0c0c] max-w-4xl mx-auto group">
          {/* Engine Visual - Video cho Revuelto, Image cho models khác */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden">
            {carData.name === 'REVUELTO' ? (
              // Video Player cho Revuelto
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted={isVideoMuted}
                  playsInline
                >
                  <source
                    src="https://videolamborghini-meride-tv.akamaized.net/video/folder2/1771605825Temerario_00-Mecha-H_Card-Engine_lamborghini.mp4"
                    type="video/mp4"
                  />
                </video>
                
                {/* Play/Pause Overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="w-20 h-20 rounded-full bg-[#d4af37] hover:bg-[#e6be43] transition-colors flex items-center justify-center"
                    >
                      <Play className="w-10 h-10 text-black ml-1" />
                    </button>
                  </div>
                )}
                
                {/* Video Control Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors"
                    aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors"
                    aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isVideoMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-[#d4af37]" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              // Fallback image cho models khác với audio controls
              <>
                <img
                  src={carData.soundStudy.image}
                  alt="High-revving Flat Plane Crankshaft Twin Turbo Engine Sound"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Hexagonal Gold Play Button in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleSound}
                    className="relative group/btn cursor-pointer transition-transform duration-300 hover:scale-110"
                    aria-label={isPlaying ? 'Stop engine sound' : 'Start engine sound'}
                  >
                    {/* Yellow / Gold Hexagon Shape matching screenshot */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d4af37] flex items-center justify-center shadow-2xl shadow-[#d4af37]/30 transition-all group-hover/btn:bg-[#ecc74a]">
                      {isPlaying ? (
                        <Square className="w-7 h-7 text-black fill-black" />
                      ) : (
                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Live Audio Visualizer Overlay when playing */}
                {isPlaying && (
                  <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-col gap-2">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={50}
                      className="w-full h-10 opacity-90"
                    />
                    <div className="flex items-center justify-between text-xs text-[#d4af37] font-mono tracking-wider">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        <span>{rpm.toLocaleString()} RPM</span>
                      </div>
                      <div className="text-[10px] uppercase text-[#a09176]">
                        Flat-Plane V8 Acoustic Frequencies Active
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Interactive Gas Pedal & Throttle Control Bar (when playing) */}
          {isPlaying && (
            <div className="p-4 bg-[#14120e] border-t border-[#383020] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Throttle Control:
                </span>
                <button
                  onMouseDown={handleStartRev}
                  onMouseUp={handleEndRev}
                  onTouchStart={handleStartRev}
                  onTouchEnd={handleEndRev}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none ${
                    isRevving
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-95'
                      : 'bg-[#d4af37] text-black hover:bg-[#ecc74a]'
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {isRevving ? 'REV TO 10,000 RPM (HOLDING)' : 'PRESS & HOLD TO REV'}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#888]">
                <Volume2 className="w-4 h-4 text-[#d4af37]" />
                <span>Web Audio Synthesizer Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Title & Disclaimer matching screenshot */}
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
