import React from 'react';
import { Slide1Title } from '../slides/Slide1Title';
import { Slide2Roadmap } from '../slides/Slide2Roadmap';
import { Slide3StatsMerged } from '../slides/Slide3StatsMerged';
import { Slide4ToolsMerged } from '../slides/Slide4ToolsMerged';
import { Slide5HarmsMerged } from '../slides/Slide5HarmsMerged';
import { Slide6WhyQuit } from '../slides/Slide6WhyQuit';
import { Slide7HowToInfect } from '../slides/Slide7HowToInfect';
import { Slide8Conclusion } from '../slides/Slide8Conclusion';

export const DeckContainer: React.FC = () => {
  const slideTitles = [
    { n: 1, title: 'Cover: The Dangers of Reading Books' },
    { n: 2, title: 'Roadmap: 30-Minute Warning Plan' },
    { n: 3, title: 'Part 01: Crazy Numbers & Strange Facts' },
    { n: 4, title: 'Part 02: Three Dangerous Tools' },
    { n: 5, title: 'Part 03: 7 Terrible "Dangers" of Reading' },
    { n: 6, title: 'Part 04: Why Do 90% of Readers Quit Halfway?' },
    { n: 7, title: 'Part 05: 4 Steps to Get "Infected" Properly' },
    { n: 8, title: 'Conclusion: An Evil Blessing & Q&A' }
  ];

  return (
    <div id="deck-container">
      
      {/* 16:9 Aspect Constraint Viewport */}
      <div className="deck-viewport">
        
        {/* Stack of remaining pages along the right edge (thins out toward the end) */}
        <div className="page-stack" id="page-stack" aria-hidden="true"></div>

        {/* 8 Merged Slides */}
        <div className="slides-wrapper">
          <Slide1Title />
          <Slide2Roadmap />
          <Slide3StatsMerged />
          <Slide4ToolsMerged />
          <Slide5HarmsMerged />
          <Slide6WhyQuit />
          <Slide7HowToInfect />
          <Slide8Conclusion />
        </div>

        {/* Bottom Control Bar */}
        <div className="control-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Prev Slide / Step */}
            <button
              id="prev-slide-btn"
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof (window as any).prevStepOrSlide === 'function') {
                  (window as any).prevStepOrSlide();
                } else if (typeof (window as any).prevSlide === 'function') {
                  (window as any).prevSlide();
                }
              }}
              title="Back (Left arrow)"
            >
              <svg viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Slide / Step */}
            <button
              id="next-slide-btn"
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof (window as any).nextStepOrSlide === 'function') {
                  (window as any).nextStepOrSlide();
                } else if (typeof (window as any).nextSlide === 'function') {
                  (window as any).nextSlide();
                }
              }}
              title="Next (Right arrow / Space)"
            >
              <svg viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Interactive Slide Counter with Popover Picker */}
            <div className="slide-counter-wrapper">
              <span
                className="clickable-counter"
                id="counter"
                onClick={(e) => {
                  if (typeof (window as any).toggleSlidePicker === 'function') {
                    (window as any).toggleSlidePicker(e);
                  }
                }}
                title="Click to jump to any slide"
              >
                1 / 8
              </span>

              {/* Popover Grid */}
              <div
                className="slide-picker-popover"
                id="slide-picker"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="slide-picker-header">
                  <span className="slide-picker-title">Go to Slide (1 - 8)</span>
                  <button
                    className="slide-picker-close"
                    onClick={(e) => {
                      if (typeof (window as any).closeSlidePicker === 'function') {
                        (window as any).closeSlidePicker(e);
                      }
                    }}
                    title="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="slide-picker-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {slideTitles.map((s) => (
                    <button
                      key={s.n}
                      className="slide-picker-btn"
                      data-slide-target={s.n}
                      onClick={(e) => {
                        if (typeof (window as any).jumpToSlide === 'function') {
                          (window as any).jumpToSlide(s.n, e);
                        }
                      }}
                      title={s.title}
                    >
                      {s.n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Standalone Fullscreen Button in Bottom-Right Corner */}
        <button
          id="fullscreen-btn"
          className="standalone-fullscreen-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof (window as any).toggleFullscreen === 'function') {
              (window as any).toggleFullscreen();
            }
          }}
          title="Fullscreen (F key)"
        >
          <svg viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>

      </div>

      {/* Top Secret Evidence Lightbox Modal */}
      <div
        id="deck-lightbox-modal"
        className="deck-lightbox-modal"
        aria-hidden="true"
      >
        <div className="deck-lightbox-frame" id="deck-lightbox-frame">
          <img
            id="deck-lightbox-img"
            className="deck-lightbox-img"
            src=""
            alt="Evidence Detail"
          />
        </div>
      </div>

    </div>
  );
};
