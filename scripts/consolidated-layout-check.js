async(page)=>{
 page=await page.context().newPage();const results=[];
 for(const width of [1440,768,390])for(const route of ['/','/commercial-leadership','/ai-consulting','/about','/contact','/privacy-policy','/terms-of-use','/cookie-policy','/frameworks/robotics-roi-model','/frameworks/automation-failure-framework','/glossary/autonomous-mobile-robot']){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4328'+route);await page.evaluate(()=>document.fonts.ready);
  const checks=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,mailLinks:document.querySelectorAll('a[href^="mailto:"]').length,canonical:document.querySelector('link[rel=canonical]').href}));
  await page.keyboard.press('Tab');checks.focus=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);await page.keyboard.press('Enter');checks.skip=await page.evaluate(()=>location.hash==='#main-content');
  if(width===390){await page.locator('summary').focus();await page.keyboard.press('Enter');checks.mobileMenu=await page.locator('details').evaluate(n=>n.open);await page.locator('summary').press('Enter');}
  await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`output/playwright/release-${width}-${route==='/'?'home':route.slice(1).replaceAll('/','-')}.png`,fullPage:true});results.push({route,width,...checks});
 }
 return {passed:results.every(r=>!r.overflow&&r.h1===1&&r.mailLinks===0&&r.focus==='solid'&&r.skip&&(r.width!==390||r.mobileMenu)),results};
}
