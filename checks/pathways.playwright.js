// Run through Playwright MCP browser_run_code_unsafe (filename).
async (page) => {
  const p = await page.context().newPage();
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const results = [];
  try {
    await p.goto('http://127.0.0.1:3001/');
    for (const [width, height, reducedMotion, sticky] of [
      [320, 568, 'no-preference', true],
      [375, 667, 'no-preference', true],
      [390, 664, 'no-preference', true],
      [390, 844, 'no-preference', true],
      [768, 1024, 'no-preference', true],
      [844, 390, 'no-preference', false],
      [991, 667, 'no-preference', false],
      [390, 664, 'reduce', false],
    ]) {
      await p.setViewportSize({ width, height });
      await p.emulateMedia({ reducedMotion });
      const result = await p.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        await new Promise(requestAnimationFrame);
        const cards = [...document.querySelectorAll('.pathway')];
        const secondTop = cards[1].getBoundingClientRect().top;
        // Scroll until the second card should cover the first.
        window.scrollTo(0, secondTop - 80 + 40);
        await new Promise(requestAnimationFrame);
        const boxes = cards.map(card => card.getBoundingClientRect());
        return {
          position: getComputedStyle(cards[0]).position,
          tops: boxes.map(box => box.top),
          bottoms: boxes.map(box => box.bottom),
          front: document.elementFromPoint(boxes[1].left + 20, 100)?.closest('.pathway')?.id,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      assert(!result.overflow, `Horizontal overflow at ${width}x${height}`);
      if (sticky) {
        assert(result.position === 'sticky', `Stacking disabled at ${width}x${height}`);
        assert(result.tops.slice(0, 2).every(top => Math.abs(top - 80) < 1), `Cards failed to stack at ${width}x${height}`);
        assert(result.bottoms[1] <= height, `Stacked card cut off at ${width}x${height}`);
        assert(result.front === 'program-organization', 'Second card did not cover first');
      } else {
        assert(result.position === 'relative' && result.tops[0] < 0, 'Short-screen or reduced-motion fallback failed');
      }
      results.push({ width, height, reducedMotion, status: 'passed' });
    }
    return results;
  } finally { await p.close(); }
}
