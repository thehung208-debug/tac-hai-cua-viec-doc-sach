import React from 'react';

export const Slide5HarmsMerged: React.FC = () => {
  const harms = [
    { id: 1, title: 'Sleeping so well you sleep forever' },
    { id: 2, title: 'Knowing too much' },
    { id: 3, title: 'A dangerously big vocabulary' },
    { id: 4, title: 'A wild, uncontrollable imagination' },
    { id: 5, title: 'A domino disaster for money & free time' },
    { id: 6, title: 'You can never become a thief' },
    { id: 7, title: 'Hiding in the bathroom all day' }
  ];

  return (
    <div 
      className="slide dossier-paper text-[#1c1917] px-16 py-5 md:px-20 lg:px-24 md:py-6 font-typewriter h-full justify-between relative overflow-hidden" 
      data-slide="5" 
      data-steps="8"
      id="slide-5"
    >
      {/* Cinematic Spotlight Vignette Backdrop */}
      <div className="slide5-spotlight-backdrop"></div>

      {/* Top Secret Header */}
      <div className="flex justify-between items-center z-10 border-b-2 border-[#1c1917] pb-2.5 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="font-dossier-code text-sm sm:text-base font-bold tracking-wider text-[#1c1917]">
            EVIDENCE FILE #03: 7 TERRIBLE DANGERS
          </span>
        </div>
        <div className="stamp-top-secret text-xs sm:text-sm">
          TOP SECRET // MAIN CASE
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="my-auto pt-2 sm:pt-4 grid grid-cols-12 gap-8 md:gap-10 items-center max-w-[1280px] mx-auto w-full">
        
        {/* Left 7 Columns: Title & 7 Harms in a clean 2-column layout */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
          
          <div>
            <h2 className="slide-title-150 font-bold text-[#141413] font-dossier-title leading-[1.05] uppercase pen-write-anim whitespace-nowrap">
              7 Terrible Dangers
            </h2>
          </div>

          {/* 7 Clean Compact Dossier Cards with Generous Spacing and Stable Placement Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-4 sm:gap-x-5 mt-2.5 sm:mt-3.5">
            {harms.map((h, idx) => (
              <div
                key={h.id}
                className={`step-card-slot min-h-[62px] sm:min-h-[68px] flex items-stretch ${
                  idx === 6 ? 'sm:col-span-2' : ''
                }`}
              >
                <div
                  data-step-card={h.id}
                  className="step-card dossier-card py-3 sm:py-3.5 px-4 sm:px-5 flex items-center gap-3.5 cursor-pointer border-2 border-[#1c1917] w-full"
                >
                  <span className="dossier-tag text-xs sm:text-sm bg-[#1c1917] text-[#e6dcc8] flex-shrink-0 font-bold font-dossier-code px-2.5 py-1">
                    #{h.id.toString().padStart(2, '0')}
                  </span>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-dossier-title font-bold text-sm sm:text-base md:text-lg text-[#b91c1c] leading-snug pen-write-anim">
                      {h.title}
                    </div>
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
            
            {/* Clean Header: Minimal Text, Larger Font */}
            <div className="flex justify-between items-center border-b border-[#1c1917]/30 pb-1.5 mb-2 px-1">
              <span className="font-dossier-code text-sm font-bold text-[#1c1917] tracking-wider">
                ANATOMY DRAWING
              </span>
              <span className="stamp-top-secret text-xs">
                CONFIDENTIAL
              </span>
            </div>

            {/* True 3:4 Uncropped Image Frame */}
            <div className="w-full aspect-[3/4] max-h-[460px] rounded border border-[#1c1917] overflow-hidden relative bg-[#1c1917]">
              <img
                src="/assets/slide5-claymation.webp"
                alt="Brain Anatomy & Harms Illustration"
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
