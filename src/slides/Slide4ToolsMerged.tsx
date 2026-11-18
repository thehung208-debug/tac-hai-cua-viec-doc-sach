import React from 'react';

export const Slide4ToolsMerged: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-8 py-5 md:px-12 md:py-6 font-typewriter h-full justify-between" 
      data-slide="4" 
      data-steps="3"
      id="slide-4"
    >
      {/* Top Secret Header */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #02: THREE DANGEROUS TOOLS
          </span>
        </div>
        <div className="stamp-classified text-xs sm:text-sm">
          CONFIDENTIAL // WEAPONS REPORT
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-8 md:gap-10 items-center max-w-[1280px] mx-auto w-full z-10">
        
        {/* Left 7 Columns: Title & 3 Weapons */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3.5">
          
          <div>
            <h2 className="slide-title-150 font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              3 Dangerous Tools
            </h2>
          </div>

          {/* 3 Step Cards with Generous Spacing and Inline Category Badges */}
          <div className="flex flex-col gap-4 sm:gap-5 mt-2 sm:mt-3 flex-1">
            
            {/* Medium 1: Paper book */}
            <div 
              data-step-card="1"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[115px] sm:min-h-[120px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#b45309] text-white flex-shrink-0">
                  WEAPON #01
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black font-dossier-title text-[#b45309] uppercase tracking-wide">
                  PAPER BOOK
                </span>
              </div>
              <div className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">Addictive smell,</span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#b45309] font-bold">free gym weights in your backpack</span>
                </div>
              </div>
            </div>

            {/* Medium 2: E-Reader */}
            <div 
              data-step-card="2"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[115px] sm:min-h-[120px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#0369a1] text-white flex-shrink-0">
                  WEAPON #02
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black font-dossier-title text-[#0369a1] uppercase tracking-wide">
                  E-BOOK
                </span>
              </div>
              <div className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">A library in your pocket,</span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#0369a1] font-bold">"Low Battery!" on the final page</span>
                </div>
              </div>
            </div>

            {/* Medium 3: Audiobook */}
            <div 
              data-step-card="3"
              className="step-card dossier-card p-5.5 sm:p-6 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[115px] sm:min-h-[120px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm font-bold bg-[#15803d] text-white flex-shrink-0">
                  WEAPON #03
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black font-dossier-title text-[#15803d] uppercase tracking-wide">
                  AUDIOBOOK
                </span>
              </div>
              <div className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-bold text-[#292524] font-typewriter mt-2.5 pen-write-anim text-left leading-snug">
                <div className="write-line-row block">
                  <span className="write-line whitespace-nowrap block">A strong sleeping pill</span>
                </div>
                <div className="write-line-row block mt-0.5 sm:mt-1">
                  <span className="write-line whitespace-nowrap block text-[#15803d] font-bold">while you wash dishes or drive</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right 5 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[360px] sm:max-w-[390px] md:max-w-[400px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
            <div className="dossier-paperclip"></div>
            
            {/* Clean Header: Minimal Text, Larger Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                EVIDENCE REPORT #03
              </span>
              <span className="stamp-top-secret text-xs">
                TOP SECRET
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide4-claymation.webp"
                alt="3 Delivery Weapons Illustration"
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
