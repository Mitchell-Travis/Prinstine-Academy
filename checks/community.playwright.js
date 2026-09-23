// Run through Playwright MCP browser_run_code_unsafe (filename).
async (page) => {
  const p = await page.context().newPage();
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const results = [];
  // Isolate our controls from Facebook's variable network/login behavior.
  await p.route('https://www.facebook.com/plugins/video.php?*', r => r.fulfill({ contentType: 'text/html', body: 'Player fixture' }));
  try {
    for (const width of [1440, 1024, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      await p.emulateMedia({ reducedMotion: 'no-preference' });
      await p.goto('http://127.0.0.1:3001/');
      await p.waitForLoadState('networkidle');
      const section = p.locator('#community');
      await section.scrollIntoViewIfNeeded();
      await p.waitForTimeout(550);
      const geometry = () => section.locator('[aria-roledescription="slide"]').evaluateAll(els => els.map(e => {
        const r = e.getBoundingClientRect(); return { x: r.x, width: r.width, height: r.height };
      }));
      const initial = await geometry();
      assert(initial.length === 5, 'Missing reels');
      assert(Math.abs(initial[1].x + initial[1].width / 2 - width / 2) < 1, 'Initial card not centered');
      assert(await section.locator('iframe').count() === 0, 'Facebook loaded before click');
      const next = section.getByRole('button', { name: 'Next video', exact: true });
      await next.click();
      await p.waitForTimeout(200);
      const midway = await geometry();
      assert(midway[2].x < initial[2].x && midway[2].x > initial[1].x, 'No intermediate horizontal motion');
      assert(Math.abs(midway[2].width - initial[2].width) < 1, 'Cards resize during motion');
      assert(Math.abs(midway[2].height - initial[2].height) < 1, 'Cards change height during motion');
      await p.waitForTimeout(400);
      const settled = await geometry();
      assert(Math.abs(settled[2].x + settled[2].width / 2 - width / 2) < 1, 'New card not centered');
      assert(await section.locator('.community-window').evaluate(e => e.scrollLeft) === 0, 'Frame acquired unwanted native scroll');
      const box = await section.locator('.community-window').boundingBox();
      await p.mouse.move(width / 2, box.y + box.height / 2);
      await p.mouse.down();
      await p.mouse.move(width / 2 - 100, box.y + box.height / 2, { steps: 8 });
      await p.mouse.up();
      await p.waitForTimeout(600);
      assert((await section.locator('[aria-live]').innerText()).startsWith('04'), 'Dragging failed');
      assert(await section.locator('iframe').count() === 0, 'Dragging accidentally played a video');
      const play = section.getByRole('button', { name: 'Load Facebook video: Discover learning at Prinstine Academy' });
      await play.focus();
      await p.keyboard.press('Enter');
      await section.locator('iframe').waitFor({ timeout: 3000 });
      await section.getByRole('button', { name: 'Close video', exact: true }).click();
      await p.waitForFunction(() => !document.querySelector('#community iframe'));
      assert(await play.evaluate(e => e === document.activeElement), 'Focus not restored');
      await p.emulateMedia({ reducedMotion: 'reduce' });
      assert(await section.locator('.community-rail').evaluate(e => getComputedStyle(e).transitionDuration) === '0s', 'Reduced motion ignored');
      await next.click();
      assert(await next.isDisabled(), 'Final boundary missing');
      const previous = section.getByRole('button', { name: 'Previous video', exact: true });
      for (let i = 0; i < 4; i++) await previous.click();
      assert(await previous.isDisabled(), 'First boundary missing');
      await next.click();
      assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Page overflows');
      if ([1440, 390].includes(width)) {
        await section.screenshot({ path: `outreach/community-smooth-${width}.png`, animations: 'disabled' });
      }
      results.push({ width, motion: 'passed', drag: 'passed', controls: 'passed' });
    }
    return results;
  } finally { await p.unroute('https://www.facebook.com/plugins/video.php?*'); }
}
