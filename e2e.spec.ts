import { test, expect } from '@playwright/test';

test('QA Portfolio', async ({ page }) => {
  await page.goto('http://localhost:3001/en', { waitUntil: 'networkidle' });
  
  // 1. Screenshots
  await page.screenshot({ path: 'screenshot-hero.png' });
  await page.screenshot({ path: 'screenshot-full.png', fullPage: true });

  let errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // 2. Hero content
  const heroText = await page.innerText('section:first-of-type');
  const hasProjects = heroText.toLowerCase().includes('15+ projects') || heroText.toLowerCase().includes('15+ shipped projects') || heroText.toLowerCase().includes('15+');
  const hasTests = heroText.toLowerCase().includes('308 tests');
  
  // 3. CTA Buttons
  const buttonsText = await page.$$eval('a, button', els => els.map(e => e.innerText.toLowerCase()));
  const hasSeeMyWork = buttonsText.some(t => t.includes('see my work'));
  const hasDownloadCV = buttonsText.some(t => t.includes('download cv') || t.includes('resume'));

  // 4. Monogram
  const hasMonogram = await page.evaluate(() => {
    const hero = document.querySelector('section');
    return hero && (hero.innerText.includes('SAERIX') || hero.querySelector('svg') !== null || hero.querySelector('.monogram') !== null);
  });

  // 5. Vision Section
  const hasVision = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).some(s => s.innerText.toLowerCase().includes('vision') || s.innerText.toLowerCase().includes('about') || s.innerText.toLowerCase().includes('manifesto'));
  });

  // 6. Blog Background
  const blogBg = await page.evaluate(() => {
    const blog = Array.from(document.querySelectorAll('section')).find(s => s.innerText.toLowerCase().includes('blog') || s.innerText.toLowerCase().includes('articles'));
    return blog ? window.getComputedStyle(blog).backgroundColor : null;
  });

  // 7. Font Inter Tight
  const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
  
  // 8. Accent color
  const hasAccent = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).some(el => {
      const style = window.getComputedStyle(el);
      return style.color === 'rgb(255, 102, 0)' || style.backgroundColor === 'rgb(255, 102, 0)' || style.borderColor === 'rgb(255, 102, 0)' || style.borderLeftColor === 'rgb(255, 102, 0)';
    });
  });

  console.log('---RESULTS---');
  console.log(JSON.stringify({
    consoleErrors: errors,
    hasProjects,
    hasTests,
    hasSeeMyWork,
    hasDownloadCV,
    hasMonogram,
    hasVision,
    blogBg,
    bodyFont,
    hasAccent
  }, null, 2));
  console.log('---END---');
});
