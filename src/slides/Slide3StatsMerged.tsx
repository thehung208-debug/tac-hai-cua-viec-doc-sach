import React from 'react';

export const Slide3StatsMerged: React.FC = () => {
  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 pt-3.5 pb-2 md:px-20 lg:px-24 md:pt-4 md:pb-2.5 font-typewriter h-full justify-between" 
      data-slide="3" 
      data-steps="3"
      id="slide-3"
    >
      {/* Top Secret Header */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-1.5 mb-1.5 sm:mb-2">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #01: NUMBERS THAT SPEAK
          </span>
        </div>
        <div className="stamp-top-secret text-xs sm:text-sm">
          TOP SECRET // SCIENCE REPORT
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto -mt-1 sm:-mt-1.5 grid grid-cols-12 gap-6 md:gap-8 items-center max-w-[1300px] mx-auto w-full z-10 slide-3-main-grid">
        
        {/* Left 8 Columns: Title & 3 Large Dossier Cards */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col gap-2">
          
          <div>
            <h2 className="slide-title-170 font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              3 Crazy Numbers
            </h2>
          </div>

          {/* 3 Clean Dossier Cards with +30% Height and Maximized Text Size */}
          <div className="flex flex-col gap-2.5 sm:gap-3 mt-1 flex-1">
            
            {/* Card 1: Lost the right to be stressed & Animated Counter to -68% */}
            <div 
              data-step-card="1"
              className="step-card dossier-card py-4 sm:py-5 px-5 sm:px-7 pl-7 sm:pl-9 lg:pl-11 flex items-center gap-5 sm:gap-7 cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[150px] sm:min-h-[156px] w-full"
            >
              <div 
                className="font-dossier-title font-black text-6xl sm:text-7xl md:text-[80px] lg:text-[86px] text-[#b91c1c] flex-shrink-0 leading-none stat-counter-num tracking-tight"
                data-counter-target="-68%"
              >
                -68%
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-[26px] sm:text-[30px] md:text-[35px] lg:text-[39px] font-bold text-[#141413] font-dossier-title leading-[1.18] pen-write-anim">
                  <div className="write-line-row block">
                    <span className="write-line whitespace-nowrap block">You lose the right</span>
                  </div>
                  <div className="write-line-row block mt-0.5 sm:mt-1">
                    <span className="write-line whitespace-nowrap block text-[#b91c1c] font-black">to get mad</span>
                  </div>
                </h3>
              </div>
            </div>

            {/* Card 2: Tsundoku */}
            <div 
              data-step-card="2"
              className="step-card dossier-card py-4 sm:py-5 px-5 sm:px-7 pl-7 sm:pl-9 lg:pl-11 flex items-center gap-5 sm:gap-6 cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[150px] sm:min-h-[156px] w-full"
            >
              <div className="font-dossier-title font-black text-xl sm:text-2xl md:text-3xl text-[#b45309] flex-shrink-0 leading-tight text-center bg-[#fef3c7] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded border-2 border-[#b45309]/60 tracking-wider">
                TSUNDOKU
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-[20px] sm:text-[23px] md:text-[26px] lg:text-[29px] font-bold text-[#141413] font-dossier-title leading-[1.2] pen-write-anim">
                  <div className="write-line-row block">
                    <span className="write-line whitespace-nowrap block">Buying mountains of books,</span>
                  </div>
                  <div className="write-line-row block mt-0.5 sm:mt-1">
                    <span className="write-line whitespace-nowrap block text-[#b45309] font-black">never reading them</span>
                  </div>
                </h3>
              </div>
            </div>

            {/* Card 3: Forced to live 2 more years */}
            <div 
              data-step-card="3"
              className="step-card dossier-card py-4 sm:py-5 px-5 sm:px-7 pl-7 sm:pl-9 lg:pl-11 flex items-center gap-5 sm:gap-6 cursor-pointer border-2 border-[#1c1917] flex-1 min-h-[150px] sm:min-h-[156px] w-full"
            >
              <div className="font-dossier-title font-black text-4xl sm:text-5xl md:text-6xl lg:text-[66px] text-[#0369a1] flex-shrink-0 leading-none tracking-tight">
                +2 YEARS
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-[21px] sm:text-[24px] md:text-[28px] lg:text-[31px] font-bold text-[#141413] font-dossier-title leading-[1.2] pen-write-anim">
                  <div className="write-line-row block">
                    <span className="write-line whitespace-nowrap block">You are forced</span>
                  </div>
                  <div className="write-line-row block mt-0.5 sm:mt-1">
                    <span className="write-line whitespace-nowrap block text-[#0369a1] font-black">to live 2 years longer</span>
                  </div>
                </h3>
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
                MEDICAL REPORT
              </span>
              <span className="stamp-verified text-xs">
                VERIFIED
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide3-claymation.webp"
                alt="Tsundoku Stress Evidence"
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
