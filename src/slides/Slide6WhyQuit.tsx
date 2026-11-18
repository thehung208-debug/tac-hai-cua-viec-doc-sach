import React from 'react';

export const Slide6WhyQuit: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 pt-2 pb-1 md:px-20 lg:px-24 md:pt-2.5 md:pb-1.5 font-typewriter h-full justify-between" 
      data-slide="6" 
      data-steps="3"
      id="slide-6"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-1 mb-1 sm:mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #04: THE LUCKY ESCAPE
          </span>
        </div>
        <div className="stamp-top-secret text-xs sm:text-sm">
          TOP SECRET // WHY PEOPLE QUIT
        </div>
      </div>

      {/* Main Grid: Balanced 7:5 Ratio */}
      <div className="my-auto -mt-4 sm:-mt-5 grid grid-cols-12 gap-6 md:gap-8 items-center max-w-[1300px] mx-auto w-full z-10">
        
        {/* Left 7 Columns: Title & 3 Reasons */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-1.5 sm:gap-2">
          
          <div>
            <h2 className="slide-6-title font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              Why 90% Quit Halfway
            </h2>
          </div>

          {/* 3 Step Cards with +20% Height and Maximized Text Size */}
          <div className="flex flex-col gap-2 sm:gap-2.5 mt-0.5 sm:mt-1 flex-1">
            
            {/* Card 1 */}
            <div 
              data-step-card="1"
              className="step-card dossier-card py-2.5 sm:py-3 px-5 sm:px-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[124px] md:min-h-[128px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#b45309] text-white flex-shrink-0 px-2.5 py-1.5 shadow-sm font-dossier-code">
                    REASON 01
                  </span>
                  <span className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black font-dossier-title text-[#b45309] uppercase tracking-wide truncate">
                    FAKE SMART PERSON
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="slide-6-pill-tag font-dossier-code text-xs sm:text-sm font-bold tracking-wider px-2.5 py-1 bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] rounded-sm uppercase whitespace-nowrap">
                    EGO BUYING
                  </span>
                  <span className="slide-6-pill-dark font-dossier-code text-xs font-bold px-2.5 py-1 bg-[#1c1917] text-[#e6dcc8] rounded-sm whitespace-nowrap">
                    0% READ
                  </span>
                </div>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[25px] lg:text-[27px] font-bold text-[#292524] font-typewriter mt-1.5 sm:mt-2 pen-write-anim text-left leading-[1.18]">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Buying books to look smart,
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#b45309] font-black">
                    then never reading them
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              data-step-card="2"
              className="step-card dossier-card py-2.5 sm:py-3 px-5 sm:px-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[124px] md:min-h-[128px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#b91c1c] text-white flex-shrink-0 px-2.5 py-1.5 shadow-sm font-dossier-code">
                    REASON 02
                  </span>
                  <span className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black font-dossier-title text-[#b91c1c] uppercase tracking-wide truncate">
                    15-SECOND EMPIRE
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="slide-6-pill-tag font-dossier-code text-xs sm:text-sm font-bold tracking-wider px-2.5 py-1 bg-[#b91c1c]/10 border border-[#b91c1c]/30 text-[#b91c1c] rounded-sm uppercase whitespace-nowrap">
                    DOPAMINE TRAP
                  </span>
                  <span className="slide-6-pill-dark font-dossier-code text-xs font-bold px-2.5 py-1 bg-[#1c1917] text-[#e6dcc8] rounded-sm whitespace-nowrap">
                    15s REELS
                  </span>
                </div>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[25px] lg:text-[27px] font-bold text-[#292524] font-typewriter mt-1.5 sm:mt-2 pen-write-anim text-left leading-[1.18]">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Losing the war
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#b91c1c] font-black">
                    against 15-second videos
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              data-step-card="3"
              className="step-card dossier-card py-2.5 sm:py-3 px-5 sm:px-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[124px] md:min-h-[128px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#0369a1] text-white flex-shrink-0 px-2.5 py-1.5 shadow-sm font-dossier-code">
                    REASON 03
                  </span>
                  <span className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black font-dossier-title text-[#0369a1] uppercase tracking-wide truncate">
                    SLAVE TO THE BOOK
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="slide-6-pill-tag font-dossier-code text-xs sm:text-sm font-bold tracking-wider px-2.5 py-1 bg-[#0369a1]/10 border border-[#0369a1]/30 text-[#0369a1] rounded-sm uppercase whitespace-nowrap">
                    SUNK-COST TRAP
                  </span>
                  <span className="slide-6-pill-dark font-dossier-code text-xs font-bold px-2.5 py-1 bg-[#1c1917] text-[#e6dcc8] rounded-sm whitespace-nowrap">
                    FORCED GUILT
                  </span>
                </div>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[25px] lg:text-[27px] font-bold text-[#292524] font-typewriter mt-1.5 sm:mt-2 pen-write-anim text-left leading-[1.18]">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Forcing yourself to finish
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#0369a1] font-black">
                    every single boring word
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right 5 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2 sm:p-2.5 rotate-1 max-w-[310px] sm:max-w-[325px] md:max-w-[340px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
            <div className="dossier-paperclip"></div>
            
            {/* Clean Header: Minimal Text, Larger Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1 mb-1.5 px-1">
              <span className="font-dossier-code text-xs sm:text-sm font-bold text-[#1c1917] tracking-wider">
                QUITTING SCENE
              </span>
              <span className="stamp-top-secret text-[11px] sm:text-xs">
                CASE FAILED
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[380px] sm:max-h-[400px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide6-claymation.webp"
                alt="Cat Sleeping on Book Illustration"
                className="w-full h-full object-contain filter contrast-105"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="h-2"></div>
    </div>
  );
};
