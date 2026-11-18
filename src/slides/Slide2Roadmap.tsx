import React from 'react';

export const Slide2Roadmap: React.FC = () => {
  const stages = [
    { step: 1, num: '#01', title: 'Crazy & scary numbers', badge: '3 Shocking Facts' },
    { step: 2, num: '#02', title: '3 dangerous tools', badge: '3 Lethal Mediums' },
    { step: 3, num: '#03', title: '7 terrible dangers', badge: '7 Fatal Symptoms' },
    { step: 4, num: '#04', title: 'Why 90% escape', badge: '3 Escape Traps' },
    { step: 5, num: '#05', title: '4 steps to get infected', badge: 'Action Protocol' }
  ];

  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 py-5 md:px-20 lg:px-24 md:py-6 font-typewriter h-full justify-between" 
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

      {/* Main Grid: Balanced 7:5 Ratio */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-6 md:gap-8 items-center max-w-[1300px] mx-auto w-full z-10">
        
        {/* Left 7 Columns: Header Centered & 5 Stages with Optimized Right Badges */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-2.5 sm:gap-3">
          
          <div className="w-full text-center">
            <h2 
              className="slide-2-title font-bold text-[#141413] leading-[1.04] font-dossier-title uppercase pen-write-anim text-center inline-block"
              data-pause-between-lines="true"
            >
              <div className="write-line-row text-center">
                <span className="write-line">5 PARTS OF THE</span>
              </div>
              <div className="write-line-row text-center">
                <span className="write-line">DARK TRUTH</span>
              </div>
            </h2>
          </div>

          {/* 5 Bold Dossier Step Cards: Balanced with Left Info & Right Classified Badges */}
          <div className="flex flex-col gap-2.5 sm:gap-3 mt-1.5 sm:mt-2">
            {stages.map((s) => (
              <div 
                key={s.step}
                data-step-card={s.step}
                className="step-card dossier-card py-2.5 sm:py-3 px-4 sm:px-5 md:px-6 flex items-center justify-between cursor-pointer border-2 border-[#1c1917] w-full min-h-[54px] sm:min-h-[58px]"
              >
                {/* Left: Tag + Title */}
                <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                  <span className="dossier-tag text-sm sm:text-base md:text-lg bg-[#1c1917] text-[#e6dcc8] flex-shrink-0 font-bold font-dossier-code px-3 py-1.5 shadow-sm">
                    {s.num}
                  </span>
                  <div className="slide-2-card-title font-dossier-title font-bold text-[#b91c1c] leading-tight pen-write-anim text-left whitespace-nowrap min-w-0">
                    {s.title}
                  </div>
                </div>

                {/* Right: Thematic Dossier Badge & Arrow filling empty space */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 ml-3">
                  <span className="slide-2-badge font-dossier-code text-xs sm:text-sm font-bold tracking-wider text-[#78716c] uppercase px-2.5 py-1 bg-[#1c1917]/5 border border-[#1c1917]/25 rounded-sm whitespace-nowrap hidden sm:inline-block">
                    {s.badge}
                  </span>
                  <span className="slide-2-arrow font-dossier-title font-black text-sm sm:text-base text-[#b91c1c] flex-shrink-0">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 5 Columns: Classified Evidence Board (True 3:4 Aspect Ratio, Zero Crop) */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="dossier-card evidence-photo-frame p-2.5 sm:p-3 rotate-1 max-w-[340px] sm:max-w-[360px] md:max-w-[380px] w-full bg-[#fbf5e8] border-2 border-[#1c1917] shadow-xl relative">
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
