import React from 'react';

export const Slide7HowToInfect: React.FC = () => {
  const steps = [
    {
      num: '01',
      topic: 'THE 5-PAGE RULE',
      color: '#b91c1c'
    },
    {
      num: '02',
      topic: 'DESSERT FIRST, VEGETABLES LATER',
      color: '#b45309'
    },
    {
      num: '03',
      topic: 'THE 50-PAGE RULE',
      color: '#0369a1'
    },
    {
      num: '04',
      topic: 'SECRET WEAPONS FOR DEEPTALKS',
      color: '#15803d'
    }
  ];

  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-8 py-5 md:px-12 md:py-6 font-typewriter h-full justify-between" 
      data-slide="7" 
      data-steps="4"
      id="slide-7"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            FIELD MANUAL: HOW BOOKS ENTER YOUR BRAIN
          </span>
        </div>
        <div className="stamp-classified text-xs sm:text-sm">
          CLASSIFIED // FOR BRAVE RISK-TAKERS ONLY
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-6 items-center max-w-6xl mx-auto w-full z-10">
        
        {/* Left 7 Columns: Title & 4 Steps Grid (No Scrollbar!) */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3.5">
          
          <div>
            <h2 className="slide-main-title font-bold text-[#141413] font-dossier-title leading-[1.12] uppercase pen-write-anim whitespace-nowrap">
              4 Steps to Get "Infected"
            </h2>
          </div>

          {/* 4 Prominent Horizontal Dossier Strips (Main Content Only, Sub-notes Removed) */}
          <div className="flex flex-col gap-3 sm:gap-3.5 mt-1.5 flex-1 justify-between w-full">
            {steps.map((s, idx) => (
              <div 
                key={s.num}
                data-step-card={idx + 1}
                className="step-card dossier-card py-3.5 sm:py-4 px-5 sm:px-6 flex items-center gap-4 sm:gap-5 cursor-pointer border-2 border-[#1c1917] min-h-[72px] sm:min-h-[78px] w-full"
              >
                <span 
                  className="dossier-tag text-xs sm:text-sm font-bold flex-shrink-0 text-white px-3 sm:px-3.5 py-1.5 shadow-sm font-dossier-code tracking-wider"
                  style={{ backgroundColor: s.color }}
                >
                  STEP {s.num}
                </span>
                <div className="flex text-left items-center flex-1 min-w-0">
                  <div 
                    className="font-dossier-title font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-wide pen-write-anim leading-tight"
                    style={{ color: s.color }}
                  >
                    {s.topic}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 5 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[270px] sm:max-w-[285px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
            <div className="dossier-paperclip"></div>
            
            {/* Clean Header: Minimal Text, Larger Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                OPERATION FILE
              </span>
              <span className="stamp-top-secret text-xs">
                TOP SECRET
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[390px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide7-claymation.webp"
                alt="Tactical Operation Illustration"
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
