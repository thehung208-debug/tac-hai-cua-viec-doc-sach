import React from 'react';

export const Slide4ToolsMerged: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 py-5 md:px-20 lg:px-24 md:py-6 font-typewriter h-full justify-between" 
      data-slide="4" 
      data-steps="3"
      id="slide-4"
    >
      {/* Top Secret Header */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2 mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #02: THREE DANGEROUS TOOLS
          </span>
        </div>
        <div className="stamp-classified text-xs sm:text-sm">
          CONFIDENTIAL // WEAPONS REPORT
        </div>
      </div>

      {/* Main Grid: 2 Columns - Centered in Slide */}
      <div className="my-auto grid grid-cols-12 gap-6 md:gap-8 items-center max-w-[1300px] mx-auto w-full z-10">
        
        {/* Left 8 Columns: Title & 3 Weapons */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col gap-3">
          
          <div>
            <h2 className="slide-4-title font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              3 Dangerous Tools
            </h2>
          </div>

          {/* 3 Step Cards with +20% Height and Maximized Typography */}
          <div className="flex flex-col gap-2.5 sm:gap-3 mt-1 sm:mt-1.5 flex-1">
            
            {/* Medium 1: Paper book */}
            <div 
              data-step-card="1"
              className="step-card dossier-card py-3.5 sm:py-4 md:py-4.5 px-6 sm:px-7 md:px-8 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[136px] sm:min-h-[142px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm md:text-base font-bold bg-[#b45309] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  WEAPON #01
                </span>
                <span className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-black font-dossier-title text-[#b45309] uppercase tracking-wide">
                  PAPER BOOK
                </span>
              </div>
              <div className="text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] font-bold text-[#292524] font-typewriter mt-2 sm:mt-2.5 pen-write-anim text-left leading-tight">
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
              className="step-card dossier-card py-3.5 sm:py-4 md:py-4.5 px-6 sm:px-7 md:px-8 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[136px] sm:min-h-[142px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm md:text-base font-bold bg-[#0369a1] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  WEAPON #02
                </span>
                <span className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-black font-dossier-title text-[#0369a1] uppercase tracking-wide">
                  E-BOOK
                </span>
              </div>
              <div className="text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] font-bold text-[#292524] font-typewriter mt-2 sm:mt-2.5 pen-write-anim text-left leading-tight">
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
              className="step-card dossier-card py-3.5 sm:py-4 md:py-4.5 px-6 sm:px-7 md:px-8 flex flex-col justify-center cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[136px] sm:min-h-[142px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="dossier-tag text-xs sm:text-sm md:text-base font-bold bg-[#15803d] text-white flex-shrink-0 px-3 py-1.5 shadow-sm font-dossier-code">
                  WEAPON #03
                </span>
                <span className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-black font-dossier-title text-[#15803d] uppercase tracking-wide">
                  AUDIOBOOK
                </span>
              </div>
              <div className="text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] font-bold text-[#292524] font-typewriter mt-2 sm:mt-2.5 pen-write-anim text-left leading-tight">
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

        {/* Right 4 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[340px] sm:max-w-[360px] md:max-w-[380px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
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

      <div className="h-6 sm:h-8"></div>
    </div>
  );
};
