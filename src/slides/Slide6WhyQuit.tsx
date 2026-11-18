import React from 'react';

export const Slide6WhyQuit: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 py-5 md:px-20 lg:px-24 md:py-6 font-typewriter h-full justify-between" 
      data-slide="6" 
      data-steps="3"
      id="slide-6"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #04: THE LUCKY ESCAPE
          </span>
        </div>
        <div className="stamp-top-secret text-xs sm:text-sm">
          TOP SECRET // WHY PEOPLE QUIT
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-6 md:gap-8 items-center max-w-[1300px] mx-auto w-full z-10">
        
        {/* Left 8 Columns: Title & 3 Reasons */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col gap-3.5">
          
          <div>
            <h2 className="slide-6-title font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              Why 90% Quit Halfway
            </h2>
          </div>

          {/* 3 Step Cards with Generous Spacing and Inline Category Badges */}
          <div className="flex flex-col gap-4 sm:gap-5 mt-2 sm:mt-3 flex-1">
            
            {/* Card 1 */}
            <div 
              data-step-card="1"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[125px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-sm sm:text-base font-bold bg-[#b45309] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  REASON 01
                </span>
                <span className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-black font-dossier-title text-[#b45309] uppercase tracking-wide">
                  FAKE SMART PERSON
                </span>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Buying books to look smart,
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#b45309]">
                    then never reading them
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              data-step-card="2"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[125px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-sm sm:text-base font-bold bg-[#b91c1c] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  REASON 02
                </span>
                <span className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-black font-dossier-title text-[#b91c1c] uppercase tracking-wide">
                  15-SECOND EMPIRE
                </span>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Losing the war
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#b91c1c]">
                    against 15-second videos
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              data-step-card="3"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[120px] sm:min-h-[125px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-sm sm:text-base font-bold bg-[#0369a1] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  REASON 03
                </span>
                <span className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-black font-dossier-title text-[#0369a1] uppercase tracking-wide">
                  SLAVE TO THE BOOK
                </span>
              </div>
              <div className="text-[19px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">
                    Forcing yourself to finish
                  </span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#0369a1]">
                    every single boring word
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right 4 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[340px] sm:max-w-[360px] md:max-w-[380px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
            <div className="dossier-paperclip"></div>
            
            {/* Clean Header: Minimal Text, Larger Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                QUITTING SCENE
              </span>
              <span className="stamp-top-secret text-xs">
                CASE FAILED
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
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
