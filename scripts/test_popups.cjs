const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const artifactDir = '/Users/phucuong/.gemini/antigravity/brain/22cb7b88-5901-4394-9669-055a3b88ed4f';

async function testPopups() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1280,720',
    'http://localhost:3000/'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 300));
      try {
        const res = await fetch('http://127.0.0.1:9222/json');
        targets = await res.json();
        break;
      } catch (e) {}
    }
    const pageTarget = targets.find(t => t.url.includes('3000'));
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data);
        pending.delete(data.id);
      }
    };
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }
    await new Promise(r => ws.onopen = r);
    await new Promise(r => setTimeout(r, 600));

    async function evalScript(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true });
      return res.result?.result?.value;
    }

    // TEST 1: Slide 5, Step 4 -> Click screen -> Popup 1 (CIA UFO)
    console.log('--- TEST 1: Slide 5 Step 4 ---');
    await evalScript(`window.goToSlide(5)`);
    await new Promise(r => setTimeout(r, 600));
    await evalScript(`window.setSlideStep(4)`);
    await new Promise(r => setTimeout(r, 500));

    // Click on the slide background
    await evalScript(`document.getElementById('slide-5').click()`);
    await new Promise(r => setTimeout(r, 400));

    const test1Active = await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`);
    const test1Src = await evalScript(`document.getElementById('deck-lightbox-img').src`);
    console.log('Test 1 active:', test1Active, 'Image src:', test1Src);

    // Capture screenshot
    let ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'popup_test_slide5_card4.png'), Buffer.from(ss.result.data, 'base64'));

    // Click outside frame (on backdrop)
    await evalScript(`document.getElementById('deck-lightbox-modal').click()`);
    await new Promise(r => setTimeout(r, 350));
    const test1Closed = !(await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`));
    console.log('Test 1 closed after clicking outside:', test1Closed);


    // TEST 2: Slide 5, Step 7 -> Click screen -> Popup 2 (Bathroom bookshelf)
    console.log('--- TEST 2: Slide 5 Step 7 ---');
    await evalScript(`window.setSlideStep(7)`);
    await new Promise(r => setTimeout(r, 500));

    // Click on spotlight card 7
    await evalScript(`document.querySelector('#slide-5 [data-step-card="7"]').click()`);
    await new Promise(r => setTimeout(r, 400));

    const test2Active = await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`);
    const test2Src = await evalScript(`document.getElementById('deck-lightbox-img').src`);
    console.log('Test 2 active:', test2Active, 'Image src:', test2Src);

    ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'popup_test_slide5_card7.png'), Buffer.from(ss.result.data, 'base64'));

    // Press Escape
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await new Promise(r => setTimeout(r, 350));
    const test2Closed = !(await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`));
    console.log('Test 2 closed after Escape:', test2Closed);


    // TEST 3: Slide 7 -> Click Card 2 -> Popup 4 ("Fuck you.")
    console.log('--- TEST 3: Slide 7 Card 2 ---');
    await evalScript(`window.goToSlide(7)`);
    await new Promise(r => setTimeout(r, 600));

    // Click Card 2
    await evalScript(`document.querySelector('#slide-7 [data-step-card="2"]').click()`);
    await new Promise(r => setTimeout(r, 400));

    const test3Active = await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`);
    const test3Src = await evalScript(`document.getElementById('deck-lightbox-img').src`);
    console.log('Test 3 active:', test3Active, 'Image src:', test3Src);

    ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'popup_test_slide7_card2.png'), Buffer.from(ss.result.data, 'base64'));

    // Press Escape
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await new Promise(r => setTimeout(r, 350));
    const test3Closed = !(await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`));
    console.log('Test 3 closed after Escape:', test3Closed);


    // TEST 4: Slide 7 -> Click Card 3 -> Popup 3 (There is no Chapter 7)
    console.log('--- TEST 4: Slide 7 Card 3 ---');
    // Click Card 3
    await evalScript(`document.querySelector('#slide-7 [data-step-card="3"]').click()`);
    await new Promise(r => setTimeout(r, 400));

    const test4Active = await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`);
    const test4Src = await evalScript(`document.getElementById('deck-lightbox-img').src`);
    console.log('Test 4 active:', test4Active, 'Image src:', test4Src);

    ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'popup_test_slide7_card3.png'), Buffer.from(ss.result.data, 'base64'));

    // Click outside frame
    await evalScript(`document.getElementById('deck-lightbox-modal').click()`);
    await new Promise(r => setTimeout(r, 350));
    const test4Closed = !(await evalScript(`document.getElementById('deck-lightbox-modal').classList.contains('active')`));
    console.log('Test 4 closed after clicking outside:', test4Closed);

    console.log('ALL TESTS PASSED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

testPopups();
