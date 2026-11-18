import React from 'react';

export const Slide2Roadmap: React.FC = () => {
  const stages = [
    { step: 1, num: '#01', title: 'Crazy & scary numbers' },
    { step: 2, num: '#02', title: '3 dangerous tools' },
    { step: 3, num: '#03', title: '7 terrible dangers' },
    { step: 4, num: '#04', title: 'Why 90% escape' },
    { step: 5, num: '#05', title: '4 steps to get infected' }
  ];

  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-8 py-5 md:px-12 md:py-6 font-typewriter h-full justify-between" 
      data-slide="2" 
      data-steps="5"
      id="slide-2"
    >
      {/* Top Secret Header Strip */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            INVESTIGATION PLAN: 30-MINUTE WARNING
          </span>
        </div>
        <div className="stamp-classified text-xs sm:text-sm">
          CLASSIFIED // 5 PARTS
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-8 md:gap-10 items-center max-w-[1280px] mx-auto w-full z-10">
        
        {/* Left 7 Columns: Header & 5 Stages */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
          
          <div>
            <h2 
              className="slide-2-title font-bold text-[#141413] leading-[1.04] font-dossier-title uppercase pen-write-anim"
              data-pause-between-lines="true"
            >
              <div className="write-line-row">
                <span className="write-line">5 PARTS OF THE</span>
              </div>
              <div className="write-line-row">
                <span className="write-line">DARK TRUTH</span>
              </div>
            </h2>
          </div>

          {/* 5 Bold Dossier Step Cards with Clear Generous Separation */}
          <div className="flex flex-col gap-3.5 sm:gap-4.5 mt-2 sm:mt-3">
            {stages.map((s) => (
              <div 
                key={s.step}
                data-step-card={s.step}
                className="step-card dossier-card py-3 sm:py-3.5 px-4.5 sm:px-5.5 flex items-center justify-between cursor-pointer border-2 border-[#1c1917]"
              >
                <div className="flex items-center gap-4">
                  <span className="dossier-tag text-xs sm:text-sm bg-[#1c1917] text-[#e6dcc8] flex-shrink-0 font-bold font-dossier-code px-2.5 py-1">
                    {s.num}
                  </span>
                  <div className="font-dossier-title font-bold text-lg sm:text-xl md:text-2xl text-[#b91c1c] leading-tight pen-write-anim text-left">
                    {s.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 5 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[360px] sm:max-w-[390px] md:max-w-[400px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
            <div className="dossier-paperclip"></div>
            
            {/* Header: Minimal Text, Clean Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                CASE MAP
              </span>
              <span className="stamp-top-secret text-xs">
                CONFIDENTIAL
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide2-claymation.webp"
                alt="Detective Corkboard Roadmap"
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
