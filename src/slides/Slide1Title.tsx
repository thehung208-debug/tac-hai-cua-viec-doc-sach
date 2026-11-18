import React from 'react';

export const Slide1Title: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 py-5 md:px-20 lg:px-24 md:py-6 font-typewriter h-full justify-between" 
      data-slide="1"
      data-steps="1"
      id="slide-1"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-base sm:text-xl md:text-2xl font-black tracking-wider text-[#1c1917] whitespace-nowrap">
            FILE NO: #Kos-11-26-PL // SECRET BUREAU OF KNOWLEDGE
          </span>
        </div>
      </div>

      {/* Main Slide Content: Dynamic 2-Phase Grid */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-8 md:gap-10 items-center max-w-[1280px] mx-auto w-full z-10 relative">
        
        {/* Left Column: Spotlight Title (Revealed on Step 1) */}
        <div 
          data-step-reveal="1"
          className="slide-1-title-col col-span-12 md:col-span-7 flex flex-col justify-center gap-4 text-left transition-[opacity,transform] duration-700 pr-2"
        >
          <div>
            {/* Giant Punchy Spotlight Title (Enlarged 120%, Bold & Grand Headline) */}
            <h1 
              className="slide-1-hero-title font-black text-[#141413] leading-[1.04] font-dossier-title tracking-tight uppercase pen-write-anim"
              data-pause-between-lines="true"
            >
              <div className="write-line-row">
                <span className="write-line">THE DANGERS OF</span>
              </div>
              <div className="write-line-row">
                <span className="write-line text-[#b91c1c] underline decoration-[#b91c1c] decoration-8 whitespace-nowrap mt-1">
                  READING BOOKS!
                </span>
              </div>
            </h1>

            {/* Dual Red Realistic Stamps (Slam sequentially on Step 1) */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <div 
                id="slide1Stamp1" 
                className="stamp-rect-realistic text-sm sm:text-base md:text-lg font-bold opacity-0 shadow-lg"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                TOP SECRET FILE
              </div>
              <div 
                id="slide1Stamp2" 
                className="stamp-rect-realistic text-sm sm:text-base md:text-lg font-bold opacity-0 shadow-lg"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                INTERNAL USE ONLY
              </div>
            </div>
          </div>
        </div>

        {/* Right Column / Center at Step 0: Evidence Board Image Frame */}
        <div className="slide-1-image-col col-span-12 md:col-span-5 flex flex-col items-center justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[360px] sm:max-w-[380px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative transition-[transform,max-width,box-shadow] duration-700">
            <div className="dossier-paperclip"></div>
            
            {/* Header: Minimal Text, Clean Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                EVIDENCE #01
              </span>
              <span className="stamp-top-secret text-xs">
                TOP SECRET
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide1-claymation.webp"
                alt="Classified Evidence: Agent Forrest Gump"
                className="w-full h-full object-contain filter contrast-105"
              />
              <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                <div className="stamp-top-secret text-xs font-bold stamp-slam-anim bg-[#fef2f2]/95 px-3 py-1 shadow-md border-2 border-[#b91c1c] text-[#b91c1c]">
                  AGENT FORREST GUMP
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="h-2"></div>
    </div>
  );
};
