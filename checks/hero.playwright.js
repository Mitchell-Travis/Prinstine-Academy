// Run with the Playwright MCP browser_run_code_unsafe filename argument.
async (page) => {
  page = await page.context().newPage();
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const results = [];
  for (const width of [1440, 1280, 1200, 1199, 1024, 820, 769, 768, 767, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto('http://127.0.0.1:3001/');
    await page.waitForLoadState('networkidle');
    check(response.ok(), `HTTP error at ${width}px`);
    await page.locator('.academy-hero-photo img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px`);
    check(await page.locator('h1').count() === 1, 'Expected one main heading');
    const frame = await page.locator('.academy-hero-photo').evaluate(el => {
      const style = getComputedStyle(el);
      return { aspect: el.offsetWidth / el.offsetHeight, perspective: style.transform, border: style.borderTopWidth, bottomBorder: style.borderBottomWidth };
    });
    check(Math.abs(frame.aspect - 1.55) < .03, `Incorrect tablet-frame proportions at ${width}px`);
    check(frame.perspective.startsWith('matrix3d'), 'Tablet frame lost its 3D perspective');
    check(frame.border === frame.bottomBorder, 'Tablet frame has uneven bezels');
    check(await page.locator('.academy-header img').count() === 0, 'Image logo was not removed');
    check((await page.locator('.academy-wordmark').innerText()).includes('Prinstine'), 'Missing wordmark');
    const verify = page.locator('.academy-actions a').filter({ hasText: 'Verify certificate' });
    check(await verify.isVisible() === (width >= 768), 'Certificate label missing on tablet or desktop');
    if (width >= 768) await verify.click({ trial: true });
    check(await page.locator('.nav-toggle').isVisible() === (width < 1200), 'Incorrect navigation breakpoint');
    const columns = await page.locator('.academy-hero-inner').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    check(columns === (width <= 768 ? 1 : 2), `Wrong hero layout at ${width}px`);
    const alignment = await page.evaluate(() => Math.abs(document.querySelector('.academy-wordmark').getBoundingClientRect().left - document.querySelector('#hero-title').getBoundingClientRect().left));
    check(alignment < 1, `Wordmark and hero are misaligned at ${width}px`);
    check(await page.locator('.page-rails').evaluate(el => getComputedStyle(el).pointerEvents) === 'none', 'Rails intercept clicks');
    const spacing = await page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect();
      const rails = box('.page-rails > div');
      const navRails = box('.nav-rails > div');
      const gap = parseFloat(getComputedStyle(document.querySelector('main')).getPropertyValue('--rail-gap'));
      const lefts = ['.academy-wordmark', '#hero-title', '.pathways-grid', '.community-window', '#concept-title'].map(s => box(s).left);
      const rights = ['.academy-actions', '.pathways-grid', '.community-window'].map(s => box(s).right);
      return { gap, lefts: lefts.map(x => x - rails.left), rights: rights.map(x => rails.right - x), railAlignment: Math.abs(navRails.left - rails.left) + Math.abs(navRails.right - rails.right), navBorder: getComputedStyle(document.querySelector('.nav-rails > div')).borderBottomWidth };
    });
    check(spacing.lefts.every(gap => Math.abs(gap - spacing.gap) < 1), `Inconsistent left rail spacing at ${width}px`);
    check(spacing.rights.every(gap => Math.abs(gap - spacing.gap) < 1), `Inconsistent right rail spacing at ${width}px`);
    check(spacing.railAlignment < 1 && spacing.navBorder === '1px', 'Navigation rail lines do not align');
    const iconStrokes = await page.locator('.academy-header svg').evaluateAll(icons => icons.map(icon => icon.getAttribute('stroke-width')));
    check(iconStrokes.every(stroke => stroke === '1.75'), 'Inconsistent navigation icon strokes');
    if (width >= 768) check(await page.locator('.academy-actions a[href="mailto:info@prinstineacademy.org"]').isVisible(), 'Tablet secondary action missing');
    if (width >= 896) {
      const programs = page.getByRole('button', { name: 'Programs', exact: true });
      await programs.click();
      check(await page.locator('#program-navigation').isVisible(), 'Programs dropdown failed');
      await page.keyboard.press('Escape');
      check(await page.locator('#program-navigation').isHidden(), 'Programs dropdown did not close');
      check(await programs.evaluate(el => el === document.activeElement), 'Dropdown focus not restored');
      await programs.click();
      await page.locator('#program-navigation a').first().click();
      check(await page.locator('#program-navigation').isHidden(), 'Dropdown stayed open after selection');
    }
    const brokenAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash));
    check(!brokenAnchors.length, `Broken anchors: ${brokenAnchors}`);
    await page.locator('.academy-hero-actions a').first().focus();
    await page.keyboard.press('Tab');
    check(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle === 'solid'), 'Keyboard focus is not visible');
    check(await page.locator('.academy-actions a').filter({ hasText: 'Enroll now' }).getAttribute('href') === 'https://prinstineacademy.org/register', 'Incorrect enrollment link');
    if (width < 1200) {
      const toggle = page.getByRole('button', { name: 'Open navigation' });
      await toggle.focus();
      await page.keyboard.press('Enter');
      check(await page.locator('#mobile-navigation').isVisible(), 'Menu did not open by keyboard');
      await page.keyboard.press('Escape');
      check(await page.locator('#mobile-navigation').isHidden(), 'Escape did not close menu');
      check(await toggle.evaluate(el => el === document.activeElement), 'Menu did not restore focus');
      await toggle.click();
      await page.locator('#mobile-navigation a[href="#pathways"]').click();
      check(await page.locator('#mobile-navigation').isHidden(), 'Menu stayed open after navigation');
      check(page.url().endsWith('#pathways'), 'Programs link did not navigate');
    }
    results.push({ width, status: 'passed' });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.clock.install();
  await page.goto('http://127.0.0.1:3001/');
  await page.waitForLoadState('networkidle');
  await page.mouse.move(0, 0);
  const gallery = page.getByRole('group', { name: /^Prinstine Academy photos/ });
  const selected = () => gallery.locator('img[aria-hidden="false"]').getAttribute('src');
  check(await gallery.locator('img').count() === 4, 'Expected four hero photos');
  check(await gallery.locator('button, svg').count() === 0, 'Hero must display only images, without controls');
  await gallery.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.clock.fastForward(6100);
  check((await selected()).endsWith('/hero-cohort-2.jpeg'), 'Slideshow did not advance');
  await gallery.hover();
  await page.clock.fastForward(12000);
  check((await selected()).endsWith('/hero-cohort-2.jpeg'), 'Hover did not pause slideshow');
  await page.mouse.move(0, 0);
  for (const file of ['hero-cohort-3.jpeg', 'prinstine-hero.jpeg', 'cohort-group.jpeg']) {
    await page.clock.fastForward(6100);
    check((await selected()).endsWith(`/${file}`), 'Slideshow did not cycle through all four photos');
  }
  await gallery.focus();
  await page.clock.fastForward(12000);
  check((await selected()).endsWith('/cohort-group.jpeg'), 'Slideshow moved during keyboard focus');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.academy-hero-actions a').first().focus();
  await page.clock.fastForward(12000);
  check((await selected()).endsWith('/cohort-group.jpeg'), 'Reduced motion did not stop slideshow');
  const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  try {
    const mobile = await context.newPage();
    await mobile.goto('http://127.0.0.1:3001/');
    check(await mobile.locator('.academy-hero-photo').evaluate(el => getComputedStyle(el).animationName) === 'none', 'Hero ignores reduced motion');
    const mobileGallery = mobile.getByRole('group', { name: /^Prinstine Academy photos/ });
    check(await mobileGallery.locator('button').count() === 0, 'Mobile hero still displays controls');
    await mobile.getByRole('button', { name: 'Open navigation' }).tap();
    check(await mobile.locator('#mobile-navigation').isVisible(), 'Touch menu failed');
  } finally { await context.close(); }
  return { results, slideshow: 'passed', reducedMotion: 'passed', touchMenu: 'passed' };
}
