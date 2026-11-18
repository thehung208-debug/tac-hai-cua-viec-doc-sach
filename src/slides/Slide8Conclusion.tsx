import React from 'react';

export const Slide8Conclusion: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-8 py-5 md:px-12 md:py-6 font-typewriter h-full justify-between" 
      data-slide="8" 
      data-steps="1"
      id="slide-8"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            FINAL REPORT // CASE CLOSED
          </span>
        </div>
        <div className="stamp-top-secret text-xs sm:text-sm font-bold">
          CONFIRMED BY AGENT FORREST GUMP
        </div>
      </div>

      {/* Main Slide Content: Dynamic 2-Phase Grid */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-6 md:gap-8 items-center max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Left Column: Spotlight Final Blessing (Revealed on Step 1) */}
        <div 
          data-step-reveal="1"
          className="slide-8-title-col col-span-12 md:col-span-7 flex flex-col justify-center gap-4 text-left transition-all duration-700 pr-2"
        >
          <div>
            {/* Giant Punchy Spotlight Blessing (4 Sequential Non-Wrapping Lines, Clear of Photo Frame) */}
            <h2 
              className="slide-8-hero-title font-black text-[#141413] leading-[1.12] font-dossier-title tracking-tight uppercase pen-write-anim"
              data-pause-between-lines="true"
            >
              <div className="write-line-row">
                <span className="write-line whitespace-nowrap">I Hope You Catch</span>
              </div>
              <div className="write-line-row">
                <span className="write-line whitespace-nowrap">the Reading Disease</span>
              </div>
              <div className="write-line-row mt-2">
                <span className="write-line text-[#b91c1c] whitespace-nowrap">And Never</span>
              </div>
              <div className="write-line-row">
                <span className="write-line text-[#b91c1c] underline decoration-[#b91c1c] decoration-8 whitespace-nowrap">
                  Find a Cure!
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* Right Column / Center at Step 0: Evidence Board Image Frame with Stamp Slam */}
        <div className="slide-8-image-col col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center transition-all duration-700">
          <div 
            id="slide8PhotoFrame"
            className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[270px] sm:max-w-[280px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative transition-all duration-700"
          >
            <div className="dossier-paperclip"></div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[390px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide8-claymation.webp"
                alt="Case Closed Illustration"
                className="w-full h-full object-contain filter contrast-105"
              />

              {/* Realistic Stamp Slam Element: Top-Right, completely clear of character holding board */}
              <div 
                id="caseClosedStampWrapper"
                className="absolute top-3.5 right-3.5 pointer-events-none z-30"
              >
                <div 
                  id="caseClosedStampElement"
                  className="stamp-rect-realistic animate-stamp-realistic text-center shadow-lg"
                >
                  <span className="text-sm sm:text-base md:text-lg font-black tracking-widest uppercase block leading-tight">
                    CASE CLOSED
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] block text-[#7f1d1d] mt-0.5 border-t border-[#b91c1c]/40 pt-0.5">
                    FILE #Kos-11-26-PL
                  </span>
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
