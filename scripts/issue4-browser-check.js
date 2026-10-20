async(page)=>{
 page=await page.context().newPage();
 const results=[];
 for(const width of [1440,390])for(const route of ['/','/commercial-leadership','/ai-consulting','/about','/contact']){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4326'+route);await page.waitForLoadState('networkidle');
  const checks=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:[...document.querySelectorAll('h1')].map(n=>n.textContent),forms:document.forms.length,mailLinks:[...document.querySelectorAll('main a[href^="mailto:"]')].map(a=>a.getAttribute('href')),canonical:document.querySelector('link[rel=canonical]').href}));
  await page.keyboard.press('Tab');checks.focus=await page.evaluate(()=>({text:document.activeElement.textContent.trim(),outline:getComputedStyle(document.activeElement).outlineStyle}));
  await page.keyboard.press('Enter');checks.skip=await page.evaluate(()=>location.hash==='#main-content');
  if(width===390){await page.locator('summary').focus();await page.keyboard.press('Enter');checks.mobileMenu=await page.locator('details').evaluate(n=>n.open);await page.keyboard.press('Tab');checks.menuFocus=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);await page.locator('summary').focus();await page.keyboard.press('Enter');}
  await page.locator('h1').click();await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:`output/playwright/issue4-${width}-${route==='/'?'home':route.slice(1)}.png`,fullPage:true});
  results.push({route,width,...checks});
 }
 const noJSContext=await page.context().browser().newContext({javaScriptEnabled:false});const noJSPage=await noJSContext.newPage();const noJS=[];
 for(const route of ['/','/commercial-leadership','/ai-consulting','/about','/contact']){await noJSPage.goto('http://127.0.0.1:4326'+route);noJS.push({route,h1:await noJSPage.locator('h1').count(),articleVisible:await noJSPage.locator('article').isVisible(),forms:await noJSPage.locator('form').count()});}await noJSContext.close();
 return {passed:results.every(r=>!r.overflow&&r.h1.length===1&&r.forms===0&&r.skip&&r.focus.outline==='solid'&&(r.width!==390||(r.mobileMenu&&r.menuFocus==='solid')))&&noJS.every(r=>r.h1===1&&r.articleVisible&&r.forms===0),results,noJS};
}
