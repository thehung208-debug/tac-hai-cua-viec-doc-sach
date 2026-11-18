// @ts-nocheck
// Interactive Deck Engine with 3D Book Page Flip & Pen Writing Reveals

export function initDeckEngine(): () => void {
  let currentSlide = 1;
  let currentStep = 0;
  let isPageFlipping = false;
  const totalSlides = 8;

  // Clean up any legacy leaf-back elements left in the DOM
  document.querySelectorAll('.slide-leaf-back').forEach((el) => el.remove());

  const slideTitles = [
    'Cover: The Dangers of Reading Books',
    'Roadmap: 30-Minute Warning Plan',
    'Part 01: Crazy Numbers & Strange Facts',
    'Part 02: Three Dangerous Tools',
    'Part 03: 7 Terrible "Dangers" of Reading',
    'Part 04: Why Do 90% of Readers Quit Halfway?',
    'Part 05: 4 Steps to Get "Infected" Properly',
    'Conclusion: An Evil Blessing & Q&A'
  ];

  const pageStack = document.getElementById('page-stack');

  // Remaining-pages stack on the right edge. With a duration, the layer that leaves
  // (or comes back) animates over the page-flip so it thins *while* the page turns.
  function syncPageStack(durationMs: number) {
    if (!pageStack) return;
    const remaining = totalSlides - currentSlide;
    const live = Array.from(pageStack.children).filter(
      (el) => !el.classList.contains('leaving')
    ) as HTMLElement[];
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';

    while (live.length < remaining) {
      const edge = document.createElement('div');
      edge.className = 'page-stack-edge';
      if (durationMs > 0) {
        edge.style.width = '0px';
        edge.style.opacity = '0';
        pageStack.appendChild(edge);
        void edge.offsetWidth;
        edge.style.transition = `width ${durationMs}ms ${ease}, opacity ${durationMs}ms ${ease}`;
        edge.style.width = '';
        edge.style.opacity = '';
      } else {
        pageStack.appendChild(edge);
      }
      live.push(edge);
    }

    while (live.length > remaining) {
      const edge = live.pop() as HTMLElement;
      if (durationMs > 0) {
        edge.classList.add('leaving');
        edge.style.transition = `width ${durationMs}ms ${ease}, opacity ${durationMs}ms ${ease}`;
        edge.style.width = '0px';
        edge.style.opacity = '0';
        setTimeout(() => edge.remove(), durationMs);
      } else {
        edge.remove();
      }
    }
  }
  const counter = document.getElementById('counter');
  const titleDisplay = document.getElementById('current-slide-title');

  // ==========================================================================
  // HANDWRITING SYNCHRONIZATION ENGINE: quill pen and text move together, slowly
  // ==========================================================================
  let activeHandwriteRaf: number | null = null;
  let activeCounterRaf: number | null = null;
  let activeQuillEl: HTMLElement | null = null;
  let activeTextEl: HTMLElement | null = null;
  const CLIP_HIDDEN = 'polygon(0 0, 0 0, 0 100%, 0 100%)';

  function stopCurrentHandwriting() {
    if (activeHandwriteRaf !== null) {
      cancelAnimationFrame(activeHandwriteRaf);
      activeHandwriteRaf = null;
    }
    if (activeCounterRaf !== null) {
      cancelAnimationFrame(activeCounterRaf);
      activeCounterRaf = null;
    }
    if (activeQuillEl) {
      activeQuillEl.remove();
      activeQuillEl = null;
    }
    if (activeTextEl) {
      activeTextEl.style.clipPath = 'none';
      activeTextEl.style.opacity = '1';
      activeTextEl.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
        l.style.clipPath = 'none';
        l.style.opacity = '1';
      });
      activeTextEl = null;
    }
  }

  // Ensures text is divided into isolated lines (.write-line inside .write-line-row)
  // so that each line reveals strictly left-to-right, top line first, bottom line second.
  function prepareTextLines(textEl: HTMLElement): HTMLElement[] {
    let existingLines = Array.from(textEl.querySelectorAll<HTMLElement>('.write-line'));
    if (existingLines.length > 0) {
      existingLines.forEach(l => {
        if (!l.parentElement?.classList.contains('write-line-row')) {
          const row = document.createElement('div');
          row.className = 'write-line-row';
          l.parentElement?.insertBefore(row, l);
          row.appendChild(l);
        }
      });
      return existingLines;
    }

    const rawHtml = textEl.getAttribute('data-raw-content') || textEl.innerHTML;
    if (!textEl.hasAttribute('data-raw-content')) {
      textEl.setAttribute('data-raw-content', rawHtml);
    }

    // Explicit <br>
    if (/<br\s*\/?>/i.test(rawHtml)) {
      const parts = rawHtml.split(/<br\s*\/?>/i);
      textEl.innerHTML = parts
        .map(p => `<div class="write-line-row"><span class="write-line">${p.trim()}</span></div>`)
        .join('');
      return Array.from(textEl.querySelectorAll<HTMLElement>('.write-line'));
    }

    // Dynamic word-level wrapping measurement
    const words = (textEl.textContent || '').trim().split(/\s+/).filter(Boolean);
    if (words.length <= 1) {
      textEl.innerHTML = `<div class="write-line-row"><span class="write-line">${textEl.innerHTML.trim()}</span></div>`;
      return Array.from(textEl.querySelectorAll<HTMLElement>('.write-line'));
    }

    textEl.innerHTML = words.map((w, i) => `<span data-measure-w="${i}" style="display:inline-block;">${w}</span> `).join('');
    const wordSpans = Array.from(textEl.querySelectorAll<HTMLElement>('[data-measure-w]'));

    const lineGroups: string[][] = [];
    let currentGroup: string[] = [];
    let lastTop = -99999;

    wordSpans.forEach(sp => {
      const top = Math.round(sp.getBoundingClientRect().top);
      if (Math.abs(top - lastTop) > 6) {
        if (currentGroup.length > 0) {
          lineGroups.push(currentGroup);
        }
        currentGroup = [sp.textContent || ''];
        lastTop = top;
      } else {
        currentGroup.push(sp.textContent || '');
      }
    });
    if (currentGroup.length > 0) {
      lineGroups.push(currentGroup);
    }

    textEl.innerHTML = lineGroups.map(grp => 
      `<div class="write-line-row"><span class="write-line">${grp.join(' ')}</span></div>`
    ).join('');

    return Array.from(textEl.querySelectorAll<HTMLElement>('.write-line'));
  }

  function animateQuillHandwriting(container: HTMLElement) {
    stopCurrentHandwriting();

    // 1. Animated number counter (e.g. Slide 3 Card 1: -68%)
    const counterEl = container.querySelector<HTMLElement>('[data-counter-target]');
    if (counterEl) {
      const targetStr = counterEl.getAttribute('data-counter-target') || '-68%';
      const isNegative = targetStr.startsWith('-');
      const targetNum = parseInt(targetStr.replace(/[^0-9]/g, ''), 10) || 68;
      const countDuration = 950;
      const countStart = performance.now();
      function countFrame(now: number) {
        const elapsed = now - countStart;
        const p = Math.min(1, elapsed / countDuration);
        const ease = 1 - Math.pow(1 - p, 3);
        const currentVal = Math.round(targetNum * ease);
        counterEl.textContent = `${isNegative ? '-' : ''}${currentVal}%`;
        if (p < 1) {
          activeCounterRaf = requestAnimationFrame(countFrame);
        } else {
          counterEl.textContent = targetStr;
          activeCounterRaf = null;
        }
      }
      activeCounterRaf = requestAnimationFrame(countFrame);
    }

    // 2. Quill Handwriting Animation
    const textEl = container.classList.contains('pen-write-anim')
      ? container
      : container.querySelector<HTMLElement>('.pen-write-anim');

    if (!textEl) return;

    activeTextEl = textEl;
    textEl.style.position = 'relative';
    textEl.style.opacity = '1';

    // Measure font size for proportional quill scaling
    const compStyle = window.getComputedStyle(textEl);
    const fontSize = parseFloat(compStyle.fontSize) || 24;
    const scaleRatio = Math.max(0.65, Math.min(2.5, fontSize / 28));

    // Ensure all lines are isolated as .write-line spans so each line reveals strictly left-to-right
    const lineEls = prepareTextLines(textEl);

    lineEls.forEach(l => {
      l.style.clipPath = CLIP_HIDDEN;
      l.style.opacity = '1';
    });
    textEl.style.clipPath = 'none';

    const quill = document.createElement('div');
    quill.className = 'active-quill-writer';
    quill.innerHTML = `
      <div class="quill-pen-img"></div>
      <div class="quill-nib-glow"></div>
    `;
    // Positioned purely with transform (GPU-composited) instead of left/top (layout every frame)
    quill.style.left = '0px';
    quill.style.top = '0px';
    quill.style.opacity = '0';
    textEl.appendChild(quill);
    activeQuillEl = quill;

    // Wait 1 frame so layout measurements are accurate
    requestAnimationFrame(() => {
      if (activeTextEl !== textEl) return;

      const textRect = textEl.getBoundingClientRect();
      const nibOffsetX = 5;
      const nibOffsetY = 48;

      interface LineInfo {
        el: HTMLElement;
        startX: number;
        width: number;
        baselineY: number;
        textLen: number;
      }

      const lines: LineInfo[] = [];
      lineEls.forEach(l => {
        const range = document.createRange();
        range.selectNodeContents(l);
        const r = range.getBoundingClientRect();
        const rect = (r.width > 0 && r.height > 0) ? r : l.getBoundingClientRect();

        lines.push({
          el: l,
          startX: rect.left - textRect.left,
          width: Math.max(10, rect.width),
          baselineY: (rect.top - textRect.top) + (rect.height * 0.72),
          textLen: Math.max(1, (l.textContent || '').trim().length)
        });
      });

      if (lines.length === 0) {
        textEl.style.clipPath = 'none';
        quill.remove();
        return;
      }

      // Check whether this element is a slide title or card content
      const isSlideTitle = 
        Boolean(textEl.closest('h1, h2, [data-slide-title], .slide-1-title-col, .slide-8-title-col')) &&
        !Boolean(textEl.closest('[data-step-card], .step-card'));

      // Check for Slide 1 dramatic pause (fast line 1, hesitate pause, punchy line 2)
      const hasDramaticPause = 
        textEl.getAttribute('data-pause-between-lines') === 'true' || 
        textEl.closest('[data-pause-between-lines="true"]') !== null;

      const totalChars = lines.reduce((acc, l) => acc + l.textLen, 0);

      // Card text speed: ~32ms per char
      // Slide title runs 2x slower: exactly 64ms per char
      const cardMsPerChar = 32;
      const titleMsPerChar = cardMsPerChar * 2;
      const msPerChar = isSlideTitle ? titleMsPerChar : cardMsPerChar;

      let totalWritingTime = totalChars * msPerChar;
      if (isSlideTitle) {
        totalWritingTime = Math.max(1400, Math.min(3800, totalWritingTime));
      } else {
        totalWritingTime = Math.max(700, Math.min(1800, totalWritingTime));
      }

      const returnDuration = isSlideTitle ? 200 : 120;
      const dramaticPauseDuration = 550;

      interface LineSchedule {
        lineIdx: number;
        writeStart: number;
        writeEnd: number;
        returnEnd?: number;
      }

      const schedule: LineSchedule[] = [];
      let schedTime = 0;

      for (let i = 0; i < lines.length; i++) {
        const lineWriteDuration = (lines[i].textLen / totalChars) * totalWritingTime;
        const writeStart = schedTime;
        const writeEnd = schedTime + lineWriteDuration;
        schedTime = writeEnd;

        let returnEnd: number | undefined = undefined;
        if (i < lines.length - 1) {
          const isDramaticPauseLine = hasDramaticPause && (
            lines.length === 2 ? i === 0 : i === 1
          );
          const retDuration = isDramaticPauseLine ? dramaticPauseDuration : returnDuration;
          returnEnd = schedTime + retDuration;
          schedTime = returnEnd;
        }

        schedule.push({
          lineIdx: i,
          writeStart,
          writeEnd,
          returnEnd
        });
      }

      const totalDuration = schedTime;
      const startTime = performance.now();

      // Only touch the DOM when a value actually changes
      const lastClip: string[] = lines.map(() => CLIP_HIDDEN);
      function setLineClip(i: number, value: string) {
        if (lastClip[i] !== value) {
          lines[i].el.style.clipPath = value;
          lastClip[i] = value;
        }
      }
      let quillX = 0;
      let quillY = 0;
      let quillShown = false;
      function placeQuill(x: number, y: number, tilt: number) {
        quillX = x;
        quillY = y;
        quill.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scaleRatio}) rotate(${tilt.toFixed(2)}deg)`;
        if (!quillShown) {
          quill.style.opacity = '1';
          quillShown = true;
        }
      }

      function frame(now: number) {
        if (activeTextEl !== textEl) return;

        const elapsed = now - startTime;

        if (elapsed >= totalDuration) {
          lines.forEach(l => {
            l.el.style.clipPath = 'none';
            l.el.style.opacity = '1';
          });
          textEl.style.clipPath = 'none';
          textEl.style.opacity = '1';

          quill.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
          quill.style.transform = `translate(${quillX.toFixed(1)}px, ${(quillY - 14).toFixed(1)}px) scale(${scaleRatio * 0.9}) rotate(-22deg)`;
          quill.style.opacity = '0';

          setTimeout(() => {
            if (quill.parentNode) quill.remove();
            if (activeQuillEl === quill) activeQuillEl = null;
          }, 450);

          activeHandwriteRaf = null;
          activeTextEl = null;

          // If on Slide 1 and finished writing, trigger sequential stamps!
          if (hasDramaticPause || (currentSlide === 1 && currentStep === 1)) {
            triggerSlide1StampsAnimation();
          }
          return;
        }

        for (let i = 0; i < schedule.length; i++) {
          const seg = schedule[i];

          if (elapsed < seg.writeStart) {
            setLineClip(i, CLIP_HIDDEN);
          } else if (elapsed <= seg.writeEnd) {
            // Line i is actively being written: lines before it are full, lines after it are hidden
            for (let p = 0; p < i; p++) setLineClip(p, 'none');
            for (let f = i + 1; f < lines.length; f++) setLineClip(f, CLIP_HIDDEN);

            const lineFraction = Math.max(0, Math.min(1, (elapsed - seg.writeStart) / (seg.writeEnd - seg.writeStart)));
            const pct = (lineFraction * 100).toFixed(2);
            setLineClip(i, `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`);

            // Quill follows the line: the nib glides over each letter from left to right
            const currLine = lines[i];
            const currentX = currLine.startX + lineFraction * currLine.width;
            const bobY = Math.sin(lineFraction * Math.PI * 16) * 1.8;
            const tilt = -14 + Math.cos(lineFraction * Math.PI * 14) * 3;

            placeQuill(currentX - nibOffsetX, currLine.baselineY - nibOffsetY + bobY, tilt);
            break;

          } else if (seg.returnEnd && elapsed <= seg.returnEnd) {
            // Carriage return or pause between Line i and Line i+1
            for (let p = 0; p <= i; p++) setLineClip(p, 'none');
            for (let f = i + 1; f < lines.length; f++) setLineClip(f, CLIP_HIDDEN);

            const p = (elapsed - seg.writeEnd) / (seg.returnEnd - seg.writeEnd);
            const currLine = lines[i];
            const nextLine = lines[i + 1];

            if (hasDramaticPause && (lines.length === 2 ? i === 0 : i === 1)) {
              const hoverBob = Math.sin(p * Math.PI * 8) * 3 - 3;
              const hoverTilt = -18 + Math.sin(p * Math.PI * 6) * 4;
              const endX = currLine.startX + currLine.width;
              placeQuill(endX - nibOffsetX, currLine.baselineY - nibOffsetY + hoverBob, hoverTilt);
            } else {
              const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
              const endX = currLine.startX + currLine.width;
              const startNextX = nextLine.startX;
              const currentX = endX * (1 - ease) + startNextX * ease;
              const currentY = currLine.baselineY * (1 - ease) + nextLine.baselineY * ease;
              const liftY = -12 * Math.sin(p * Math.PI);
              const tilt = -14 - 10 * Math.sin(p * Math.PI);

              placeQuill(currentX - nibOffsetX, currentY - nibOffsetY + liftY, tilt);
            }
            break;
          }
        }

        activeHandwriteRaf = requestAnimationFrame(frame);
      }

      activeHandwriteRaf = requestAnimationFrame(frame);
    });
  }

  function getSlideMaxSteps(slideEl: HTMLElement | null): number {
    if (!slideEl) return 0;
    const stepsAttr = slideEl.getAttribute('data-steps');
    return stepsAttr ? parseInt(stepsAttr, 10) : 0;
  }

  function getCurrentSlideEl(): HTMLElement | null {
    return document.querySelector(`.slide[data-slide="${currentSlide}"]`);
  }

  function updateStepVisuals(slideEl: HTMLElement | null) {
    if (!slideEl) return;
    slideEl.setAttribute('data-current-step', String(currentStep));

    if (isPageFlipping) {
      return;
    }

    let spotlightCardToAnimate: HTMLElement | null = null;

    // Handle universal step-cards
    const stepCards = Array.from(slideEl.querySelectorAll<HTMLElement>('[data-step-card]'));
    if (stepCards.length > 0) {
      const maxSteps = getSlideMaxSteps(slideEl);
      stepCards.forEach((card) => {
        const cardStep = parseInt(card.getAttribute('data-step-card') || '0', 10);
        card.classList.remove('step-hidden', 'step-spotlight', 'step-docked', 'step-dimmed');

        const penText = card.querySelector<HTMLElement>('.pen-write-anim');

        if (currentStep === 0) {
          card.classList.add('step-hidden');
          if (penText) {
            penText.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            penText.style.opacity = '0.2';
            penText.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
              l.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            });
          }
        } else if (cardStep === currentStep) {
          card.classList.add('step-spotlight');
          spotlightCardToAnimate = card;
        } else if (cardStep < currentStep) {
          card.classList.add('step-docked');
          if (penText) {
            const rawContent = penText.getAttribute('data-raw-content');
            if (rawContent) {
              penText.innerHTML = rawContent;
            }
            penText.style.clipPath = 'none';
            penText.style.opacity = '1';
            penText.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
              l.style.clipPath = 'none';
            });
          }
        } else {
          card.classList.add('step-hidden');
          if (penText) {
            penText.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            penText.style.opacity = '0.2';
            penText.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
              l.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            });
          }
        }
      });
    }

    // Handle custom elements with data-step-reveal (e.g. Slide 1 and Slide 8 Spotlight Titles at step 1)
    const stepReveals = Array.from(slideEl.querySelectorAll<HTMLElement>('[data-step-reveal]'));
    if (stepReveals.length > 0) {
      stepReveals.forEach((el) => {
        const revealStep = parseInt(el.getAttribute('data-step-reveal') || '0', 10);
        const penText = el.querySelector<HTMLElement>('.pen-write-anim') || (el.classList.contains('pen-write-anim') ? el : null);
        if (currentStep >= revealStep) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.pointerEvents = 'auto';
          if (currentStep === revealStep && penText) {
            spotlightCardToAnimate = el;
          } else if (penText) {
            penText.style.clipPath = 'none';
            penText.style.opacity = '1';
          }
        } else {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
          if (penText) {
            penText.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            penText.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
              l.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            });
          }
        }
      });
    }

    // Step 0: For Slides 2..7, animate the main slide title on initial slide arrival
    if (currentStep === 0) {
      if (currentSlide >= 2 && currentSlide <= 7) {
        const slideTitleEl = slideEl.querySelector<HTMLElement>('h1.pen-write-anim, h2.pen-write-anim, [data-slide-title].pen-write-anim');
        if (slideTitleEl && !spotlightCardToAnimate) {
          spotlightCardToAnimate = slideTitleEl;
        }
      }
    } else {
      // Ensure slide titles outside cards and outside the active spotlight element remain completely visible
      const slideTitles = slideEl.querySelectorAll<HTMLElement>('h1.pen-write-anim, h2.pen-write-anim, [data-slide-title].pen-write-anim');
      slideTitles.forEach(t => {
        if (spotlightCardToAnimate && (spotlightCardToAnimate === t || spotlightCardToAnimate.contains(t))) {
          return;
        }
        if (!t.closest('[data-step-card], .step-card')) {
          t.style.clipPath = 'none';
          t.style.opacity = '1';
          t.querySelectorAll<HTMLElement>('.write-line').forEach(l => {
            l.style.clipPath = 'none';
            l.style.opacity = '1';
          });
        }
      });
    }

    if (spotlightCardToAnimate) {
      animateQuillHandwriting(spotlightCardToAnimate);
    } else {
      stopCurrentHandwriting();
    }
  }

  // Timers for stamp/shake effects: cleared on every slide change so nothing fires late on another slide
  const fxTimers = new Set<number>();
  function fxTimeout(fn: () => void, ms: number) {
    const id = window.setTimeout(() => {
      fxTimers.delete(id);
      fn();
    }, ms);
    fxTimers.add(id);
  }
  function clearFxTimers() {
    fxTimers.forEach((id) => clearTimeout(id));
    fxTimers.clear();
  }

  // One shared AudioContext (browsers cap how many can exist; creating one per stamp leaks)
  let sharedAudioCtx: AudioContext | null = null;
  let stampNoiseBuffer: AudioBuffer | null = null;
  function getAudioCtx(): AudioContext | null {
    if (sharedAudioCtx) return sharedAudioCtx;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    sharedAudioCtx = new AudioCtx();
    return sharedAudioCtx;
  }

  function playStampAudioThud() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      // 1. Bass impact (rubber membrane thud)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.16);

      gain.gain.setValueAtTime(0.65, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

      // 2. Paper noise friction
      if (!stampNoiseBuffer) {
        const bufferSize = Math.floor(ctx.sampleRate * 0.08);
        stampNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = stampNoiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
      }
      const noise = ctx.createBufferSource();
      noise.buffer = stampNoiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch (e) {
      // Audio autoplay gracefully handled
    }
  }

  function triggerSlide1StampsAnimation() {
    const stamp1 = document.getElementById('slide1Stamp1');
    const stamp2 = document.getElementById('slide1Stamp2');
    const slide1 = document.getElementById('slide-1');
    if (!stamp1 || !stamp2) return;

    // Reset stamps
    stamp1.classList.remove('animate-stamp-realistic');
    stamp2.classList.remove('animate-stamp-realistic');
    stamp1.style.opacity = '0';
    stamp2.style.opacity = '0';

    // Stamp 1: TOP SECRET FILE (slams first)
    fxTimeout(() => {
      const endAngle1 = (Math.random() * 4 - 8).toFixed(1); // -8deg to -4deg
      const startAngle1 = (parseFloat(endAngle1) - 10).toFixed(1);
      const midAngle1 = (parseFloat(endAngle1) + 2).toFixed(1);

      stamp1.style.setProperty('--start-rot', `${startAngle1}deg`);
      stamp1.style.setProperty('--mid-rot', `${midAngle1}deg`);
      stamp1.style.setProperty('--end-rot', `${endAngle1}deg`);
      void stamp1.offsetWidth;
      stamp1.classList.add('animate-stamp-realistic');
      stamp1.style.opacity = '1';

      if (slide1) {
        slide1.classList.remove('animate-shake');
        fxTimeout(() => {
          void slide1.offsetWidth;
          slide1.classList.add('animate-shake');
          playStampAudioThud();
        }, 200);
      }
    }, 120);

    // Stamp 2: INTERNAL USE ONLY (slams 450ms after stamp 1)
    fxTimeout(() => {
      const endAngle2 = (Math.random() * 4 + 4).toFixed(1); // +4deg to +8deg
      const startAngle2 = (parseFloat(endAngle2) - 10).toFixed(1);
      const midAngle2 = (parseFloat(endAngle2) + 2).toFixed(1);

      stamp2.style.setProperty('--start-rot', `${startAngle2}deg`);
      stamp2.style.setProperty('--mid-rot', `${midAngle2}deg`);
      stamp2.style.setProperty('--end-rot', `${endAngle2}deg`);
      void stamp2.offsetWidth;
      stamp2.classList.add('animate-stamp-realistic');
      stamp2.style.opacity = '1';

      if (slide1) {
        slide1.classList.remove('animate-shake');
        fxTimeout(() => {
          void slide1.offsetWidth;
          slide1.classList.add('animate-shake');
          playStampAudioThud();
        }, 200);
      }
    }, 580);
  }

  function triggerSlide8StampAnimation() {
    const stampEl = document.getElementById('caseClosedStampElement');
    const slide8 = document.getElementById('slide-8');
    if (!stampEl) return;

    // Natural, authoritative stamp angle placed at top-right, strictly clear of character holding board
    const endAngle = -10;
    const startAngle = -20;
    const midAngle = -8;

    stampEl.style.setProperty('--start-rot', `${startAngle}deg`);
    stampEl.style.setProperty('--mid-rot', `${midAngle}deg`);
    stampEl.style.setProperty('--end-rot', `${endAngle}deg`);

    // Reset and trigger stamp slam animation
    stampEl.classList.remove('animate-stamp-realistic');
    void stampEl.offsetWidth;
    stampEl.classList.add('animate-stamp-realistic');

    // Trigger full screen/slide shake at impact time (~210ms) - identical to Slide 1
    if (slide8) {
      slide8.classList.remove('animate-shake');
      fxTimeout(() => {
        void slide8.offsetWidth;
        slide8.classList.add('animate-shake');
        playStampAudioThud();
      }, 210);
    }
  }

  function updateUI() {
    // 1. Page stack is synced by goToSlide (animated with the flip) and on initial load

    // 2. Update counter text
    if (counter) {
      counter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    // 3. Update title display
    if (titleDisplay && slideTitles[currentSlide - 1]) {
      titleDisplay.textContent = slideTitles[currentSlide - 1];
    }

    // 4. Update picker active state
    const pickerBtns = document.querySelectorAll('.slide-picker-btn');
    pickerBtns.forEach((btn) => {
      const target = parseInt(btn.getAttribute('data-slide-target') || '0', 10);
      if (target === currentSlide) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 5. Update step visuals
    const currentSlideEl = getCurrentSlideEl();
    updateStepVisuals(currentSlideEl);

    if (currentSlide === 8 && currentStep === 0) {
      fxTimeout(triggerSlide8StampAnimation, 120);
    }

    // 6. Update browser URL hash
    window.location.hash = `slide-${currentSlide}`;

    // 7. Update book corner peel buttons (Inspired by book_page_flip)
    const cornerPrev = document.getElementById('book-corner-prev-btn');
    const cornerNext = document.getElementById('book-corner-next-btn');
    if (cornerPrev) {
      cornerPrev.style.display = currentSlide > 1 ? 'block' : 'none';
    }
    if (cornerNext) {
      cornerNext.style.display = currentSlide < totalSlides ? 'block' : 'none';
    }
  }

  // ==========================================================================
  // REALISTIC PAGE CURL: turns the page like a real book
  // The bottom-right corner C=(W,H) is pulled along an arc, up and then left to (-W,H).
  // The fold line is the perpendicular bisector of C and the drag point P. The part of the page
  // beyond the fold is clipped from the front and shown as the back (mirrored across the fold).
  // Constraints |P-(0,H)| <= W and |P-(0,0)| <= sqrt(W²+H²) keep both left corners fixed.
  // ==========================================================================
  const PAGE_CURL_DURATION = 1100;
  let activeCurlCleanup: (() => void) | null = null;

  type Pt = [number, number];

  // Clip the page rectangle by the fold line; keepBeyond = side containing corner C
  function clipPageByFold(W: number, H: number, mx: number, my: number, nx: number, ny: number, keepBeyond: boolean): Pt[] {
    const rect: Pt[] = [[0, 0], [W, 0], [W, H], [0, H]];
    const side = (p: Pt) => {
      const v = (p[0] - mx) * nx + (p[1] - my) * ny;
      return keepBeyond ? v : -v;
    };
    const out: Pt[] = [];
    for (let i = 0; i < 4; i++) {
      const a = rect[i];
      const b = rect[(i + 1) % 4];
      const fa = side(a);
      const fb = side(b);
      if (fa >= 0) out.push(a);
      if ((fa >= 0) !== (fb >= 0)) {
        const k = fa / (fa - fb);
        out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
      }
    }
    return out;
  }

  function toClipPolygon(pts: Pt[]): string {
    if (pts.length < 3) return 'polygon(0px 0px, 0px 0px, 0px 0px)';
    return `polygon(${pts.map((p) => `${p[0].toFixed(2)}px ${p[1].toFixed(2)}px`).join(', ')})`;
  }

  // Position a long gradient strip whose left edge lies on the fold line, pointing along `angle`
  function placeFoldStrip(el: HTMLElement, mx: number, my: number, angle: number, len: number, halfH: number) {
    el.style.width = `${len}px`;
    el.style.height = `${halfH * 2}px`;
    el.style.transformOrigin = `0px ${halfH}px`;
    el.style.transform = `translate(${mx}px, ${my - halfH}px) rotate(${angle}rad)`;
  }

  function easeInOutPage(t: number): number {
    // Slow lift at the start, confident sweep through the middle, gentle settle
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function runPageCurl(turningEl: HTMLElement, underEl: HTMLElement, forward: boolean, onDone: () => void) {
    if (activeCurlCleanup) activeCurlCleanup();

    const wrapper = turningEl.parentElement as HTMLElement;
    const W = wrapper.offsetWidth;
    const H = wrapper.offsetHeight;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    underEl.classList.add('active', 'flip-under');
    turningEl.classList.add('active', 'flip-turning');

    const castShadow = document.createElement('div');
    castShadow.className = 'flip-cast-shadow';
    const flapWrap = document.createElement('div');
    flapWrap.className = 'flip-flap-wrap';
    const flap = document.createElement('div');
    flap.className = 'flip-flap';
    flap.style.width = `${W}px`;
    flap.style.height = `${H}px`;
    const flapShade = document.createElement('div');
    flapShade.className = 'flip-flap-shade';
    flap.appendChild(flapShade);
    flapWrap.appendChild(flap);
    wrapper.appendChild(castShadow);
    wrapper.appendChild(flapWrap);

    const diag = Math.hypot(W, H);
    const lift = Math.min(H * 0.42, W * 0.9); // how high the corner travels
    let raf: number | null = null;
    let finished = false;

    function render(p: number) {
      const theta = Math.PI * p;
      const px = W * Math.cos(theta);
      const py = H - lift * Math.sin(theta);
      const dx = W - px;
      const dy = H - py;
      const dist = Math.hypot(dx, dy);

      if (dist < 0.5) {
        turningEl.style.clipPath = 'none';
        flapWrap.style.opacity = '0';
        castShadow.style.opacity = '0';
        return;
      }
      flapWrap.style.opacity = '1';
      castShadow.style.opacity = '1';

      const nx = dx / dist;
      const ny = dy / dist;
      const mx = (W + px) / 2;
      const my = (H + py) / 2;
      const d = dist / 2; // distance from fold line to the lifted corner
      const angle = Math.atan2(ny, nx);
      const strength = Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, p))), 0.55);

      // 1. Front of turning page: only the part that has not been folded
      turningEl.style.clipPath = toClipPolygon(clipPageByFold(W, H, mx, my, nx, ny, false));

      // 2. Back of the page: the folded part, mirrored across the fold line
      flap.style.clipPath = toClipPolygon(clipPageByFold(W, H, mx, my, nx, ny, true));
      const k = 2 * (mx * nx + my * ny);
      const a = 1 - 2 * nx * nx;
      const b = -2 * nx * ny;
      const dd = 1 - 2 * ny * ny;
      flap.style.transform = `matrix(${a}, ${b}, ${b}, ${dd}, ${k * nx}, ${k * ny})`;

      // Curvature lighting on the back of the page (in its own local coordinates)
      const hl = Math.max(6, Math.min(36, d * 0.08));
      placeFoldStrip(flapShade, mx, my, angle, diag * 1.5, diag);
      flapShade.style.background = `linear-gradient(to right,
        rgba(70, 45, 20, 0.38) 0px,
        rgba(255, 252, 240, 0.55) ${hl}px,
        rgba(255, 252, 240, 0.12) ${hl * 3}px,
        rgba(90, 65, 35, 0) ${Math.max(hl * 4, d * 0.55)}px,
        rgba(90, 65, 35, 0.16) ${Math.max(hl * 5, d * 1.3)}px)`;

      // The flap's shadow onto the front page is a fixed drop-shadow in CSS (.flip-flap-wrap):
      // rewriting the filter every frame forced a full re-raster of a viewport-sized layer.

      // 3. Cast shadow on the page underneath, hugging the fold line
      const shadowW = Math.max(18, Math.min(160, d * 0.45)) * (0.4 + 0.6 * strength);
      placeFoldStrip(castShadow, mx, my, angle, shadowW, diag);
      castShadow.style.background = `linear-gradient(to right,
        rgba(25, 15, 5, ${(0.55 * strength).toFixed(3)}) 0%,
        rgba(25, 15, 5, ${(0.22 * strength).toFixed(3)}) 35%,
        rgba(25, 15, 5, 0) 100%)`;
    }

    function finish() {
      if (finished) return;
      finished = true;
      if (raf !== null) cancelAnimationFrame(raf);
      castShadow.remove();
      flapWrap.remove();
      turningEl.style.clipPath = '';
      turningEl.classList.remove('flip-turning');
      underEl.classList.remove('flip-under');
      activeCurlCleanup = null;
      onDone();
    }
    activeCurlCleanup = finish;

    if (reduceMotion || W === 0 || H === 0) {
      finish();
      return;
    }

    // Paint the first frame synchronously so nothing flashes before the animation starts
    render(forward ? 0 : 1);

    const start = performance.now();
    function frame(now: number) {
      const t = Math.min(1, (now - start) / PAGE_CURL_DURATION);
      const e = easeInOutPage(t);
      render(forward ? e : 1 - e);
      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        finish();
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function goToSlide(n: number, direction?: 'forward' | 'backward') {
    if (n < 1) n = 1;
    if (n > totalSlides) n = totalSlides;
    if (n === currentSlide) return;
    if (isPageFlipping) return;

    stopCurrentHandwriting();
    clearFxTimers();

    const oldSlideNum = currentSlide;
    const targetSlideNum = n;
    const dir = direction || (targetSlideNum > oldSlideNum ? 'forward' : 'backward');

    const oldSlideEl = document.querySelector(`.slide[data-slide="${oldSlideNum}"]`);
    const newSlideEl = document.querySelector(`.slide[data-slide="${targetSlideNum}"]`);

    currentSlide = targetSlideNum;
    currentStep = 0;
    isPageFlipping = true;

    if (oldSlideEl && newSlideEl) {
      // Forward: the current page curls away revealing the next one underneath.
      // Backward: the previous page curls back down over the current one.
      const forward = dir === 'forward';
      const turningEl = (forward ? oldSlideEl : newSlideEl) as HTMLElement;
      const underEl = (forward ? newSlideEl : oldSlideEl) as HTMLElement;

      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      syncPageStack(reduceMotion ? 0 : PAGE_CURL_DURATION);

      runPageCurl(turningEl, underEl, forward, () => {
        document.querySelectorAll('.slide').forEach((s) => {
          const sNum = parseInt(s.getAttribute('data-slide') || '0', 10);
          if (sNum === currentSlide) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
        isPageFlipping = false;
        if (currentSlide === 8 && currentStep === 0) {
          triggerSlide8StampAnimation();
        }
        updateStepVisuals(getCurrentSlideEl());
      });
    } else {
      const slides = document.querySelectorAll('.slide');
      slides.forEach((slide) => {
        const slideNum = parseInt(slide.getAttribute('data-slide') || '0', 10);
        if (slideNum === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      isPageFlipping = false;
      syncPageStack(0);
    }

    updateUI();
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1, 'forward');
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1, 'backward');
    }
  }

  function nextStepOrSlide() {
    const slideEl = getCurrentSlideEl();
    const maxSteps = getSlideMaxSteps(slideEl);

    if (currentStep < maxSteps) {
      currentStep++;
      updateStepVisuals(slideEl);
    } else {
      nextSlide();
    }
  }

  function prevStepOrSlide() {
    const slideEl = getCurrentSlideEl();

    if (currentStep > 0) {
      currentStep--;
      updateStepVisuals(slideEl);
    } else {
      prevSlide();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  function toggleSlidePicker(e?: Event) {
    if (e) e.stopPropagation();
    const picker = document.getElementById('slide-picker');
    if (picker) {
      picker.classList.toggle('active');
    }
  }

  function closeSlidePicker(e?: Event) {
    if (e) e.stopPropagation();
    const picker = document.getElementById('slide-picker');
    if (picker) {
      picker.classList.remove('active');
    }
  }

  // Bind globals for inline onclick attributes
  window.jumpToSlide = (n: number, e?: Event) => {
    if (e) e.stopPropagation();
    goToSlide(n);
    closeSlidePicker();
  };
  window.goToSlide = goToSlide;
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.nextStepOrSlide = nextStepOrSlide;
  window.prevStepOrSlide = prevStepOrSlide;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleSlidePicker = toggleSlidePicker;
  window.closeSlidePicker = closeSlidePicker;
  window.setSlideStep = (step: number) => {
    currentStep = step;
    updateStepVisuals(getCurrentSlideEl());
  };

  // Keyboard controls
  const handleKeyDown = (e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        nextStepOrSlide();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        prevStepOrSlide();
        break;
      case 'PageDown':
      case 'ArrowDown':
      case 'l':
      case 'j':
        e.preventDefault();
        nextSlide();
        break;
      case 'PageUp':
      case 'ArrowUp':
      case 'h':
      case 'k':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        closeSlidePicker();
        break;
      default:
        break;
    }
  };

  // Close popover when clicking anywhere else & handle card click
  const handleDocClick = (e: MouseEvent) => {
    const picker = document.getElementById('slide-picker');
    const counterBtn = document.getElementById('counter');
    if (picker && !picker.contains(e.target as Node) && e.target !== counterBtn) {
      closeSlidePicker();
    }

    // Direct card click support (Spotlight / Toggle)
    const cardTarget = (e.target as HTMLElement).closest<HTMLElement>('[data-step-card]');
    if (cardTarget) {
      const slideEl = getCurrentSlideEl();
      if (slideEl && slideEl.contains(cardTarget)) {
        const cardStep = parseInt(cardTarget.getAttribute('data-step-card') || '0', 10);
        const maxSteps = getSlideMaxSteps(slideEl);
        if (currentStep === cardStep) {
          currentStep = maxSteps;
        } else {
          currentStep = cardStep;
        }
        updateStepVisuals(slideEl);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('click', handleDocClick);

  // Drag / Swipe Gestures on Slides (Natural Page Turn Drag)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  const handlePointerDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, .clickable-counter, .slide-picker-popover, .step-card, .book-corner-peel')) {
      return;
    }
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    touchStartTime = performance.now();
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (touchStartTime === 0) return;
    const dx = e.clientX - touchStartX;
    const dy = e.clientY - touchStartY;
    const dt = performance.now() - touchStartTime;
    touchStartTime = 0;

    // Horizontal swipe threshold: 60px within 800ms
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 800) {
      if (dx < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const slidesWrapper = document.querySelector('.slides-wrapper');
  if (slidesWrapper) {
    slidesWrapper.addEventListener('pointerdown', handlePointerDown as EventListener);
    window.addEventListener('pointerup', handlePointerUp as EventListener);
  }

  // Read URL hash on initial load
  const hash = window.location.hash;
  const match = hash.match(/slide-(\d+)/);
  if (match && match[1]) {
    const target = parseInt(match[1], 10);
    if (target >= 1 && target <= totalSlides) {
      currentSlide = target;
    }
  }

  // Initial draw: set active slide without animation
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide) => {
    const slideNum = parseInt(slide.getAttribute('data-slide') || '0', 10);
    if (slideNum === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  syncPageStack(0);
  updateUI();

  return () => {
    stopCurrentHandwriting();
    clearFxTimers();
    if (activeCurlCleanup) activeCurlCleanup();
    if (sharedAudioCtx) {
      sharedAudioCtx.close().catch(() => {});
      sharedAudioCtx = null;
      stampNoiseBuffer = null;
    }
    window.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('click', handleDocClick);
    if (slidesWrapper) {
      slidesWrapper.removeEventListener('pointerdown', handlePointerDown as EventListener);
    }
    window.removeEventListener('pointerup', handlePointerUp as EventListener);
  };
}
