import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3001/en', { waitUntil: 'networkidle' });
  
  // 1. Take screenshots
  await page.screenshot({ path: 'screenshot-hero.png' });
  await page.screenshot({ path: 'screenshot-full.png', fullPage: true });

  // 2. Page load & Console
  let consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 3. Hero Content
  const heroText = await page.evaluate(() => {
    const hero = document.querySelector('section'); // assuming first section is hero
    return hero ? hero.innerText : '';
  });
  
  const hasProjects = heroText.toLowerCase().includes('15+ projects') || heroText.toLowerCase().includes('15+ shipped projects') || heroText.toLowerCase().includes('15+');
  const hasTests = heroText.toLowerCase().includes('308 tests');
  
  // 4. CTA buttons
  const buttonTexts = await page.evaluate(() => Array.from(document.querySelectorAll('a, button')).map(b => b.innerText.toLowerCase()));
  const hasSeeMyWork = buttonTexts.some(t => t.includes('see my work'));
  const hasDownloadCV = buttonTexts.some(t => t.includes('download cv') || t.includes('resume'));

  // 5. Monogram
  // Check if "SAERIX" text exists in the hero, or geometric SVG element in hero
  const hasMonogram = await page.evaluate(() => {
    const hero = document.querySelector('section');
    return hero && (hero.innerText.includes('SAERIX') || hero.querySelector('svg') !== null || hero.querySelector('.monogram') !== null);
  });

  // 6. Nav Links smooth scroll (simulate click and wait to see scroll Y change)
  // For verification, just check they are href="#something"
  const navLinks = await page.evaluate(() => Array.from(document.querySelectorAll('nav a')).map(a => a.getAttribute('href')));
  
  // 7. Vision Section
  const visionSection = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const vision = sections.find(s => s.innerText.toLowerCase().includes('vision') || s.innerText.toLowerCase().includes('about') || s.innerText.toLowerCase().includes('manifesto'));
    return vision ? vision.innerText.substring(0, 100) : null;
  });

  // 8. Blog Section Dark
  const blogBg = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const blog = sections.find(s => s.innerText.toLowerCase().includes('blog') || s.innerText.toLowerCase().includes('articles'));
    if (!blog) return null;
    return window.getComputedStyle(blog).backgroundColor;
  });

  // 9. Font Inter Tight
  const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
  
  // 10. Accent color #FF6600 (rgb(255, 102, 0))
  // Just check if any element has this color
  const hasAccent = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).some(el => {
      const style = window.getComputedStyle(el);
      return style.color === 'rgb(255, 102, 0)' || style.backgroundColor === 'rgb(255, 102, 0)' || style.borderColor === 'rgb(255, 102, 0)' || style.borderLeftColor === 'rgb(255, 102, 0)';
    });
  });

  console.log(JSON.stringify({
    consoleErrors,
    hasProjects,
    hasTests,
    hasSeeMyWork,
    hasDownloadCV,
    hasMonogram,
    navLinks,
    visionSection: !!visionSection,
    blogBg,
    bodyFont,
    hasAccent
  }, null, 2));

  await browser.close();
})();
