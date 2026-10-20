async (page) => {
 const results=[];const requests=[];const errors=[];
 page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
 await page.context().clearCookies();
 for(const width of [1440,768,390]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/commercial-leadership','/ai-consulting','/about','/research','/contact','/privacy-policy','/cookie-policy','/terms-of-use','/methodology']){
   await page.goto('http://127.0.0.1:4322'+route);
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('main h1').length,markers:/\[Confirm:|Selected proof withheld|\[Publication date\]/.test(document.body.innerText),banner:!!document.querySelector('.preview-notice'),robots:document.querySelector('meta[name=robots]')?.content}));
   if(state.overflow||state.headings!==1||state.markers||state.banner||state.robots!=='index,follow')throw Error(route+' '+width+' '+JSON.stringify(state));
   results.push({route,width,passed:true});
  }
 }
 await page.goto('http://127.0.0.1:4322/contact');
 if(await page.locator('form').count())throw Error('Email-only must not render form');
 if(!(await page.locator('a[href="mailto:deepak@autonomybridge.com"]').count()))throw Error('Missing email');
 await page.keyboard.press('Tab');
 if(!(await page.locator('.skip-link').evaluate(e=>document.activeElement===e)))throw Error('Skip focus');
 await page.keyboard.press('Enter');
 if(!page.url().endsWith('#main-content'))throw Error('Skip target');
 await page.goto('http://127.0.0.1:4322/contact-success');
 if(!(await page.locator('#unconfirmed').isVisible())||await page.locator('#confirmed').isVisible())throw Error('False success');
 if(await page.locator('meta[name=robots]').getAttribute('content')!=='noindex,nofollow')throw Error('Success index');
 await page.goto('http://127.0.0.1:4322/');
 await page.screenshot({path:'output/playwright/full-v2-home-mobile.png',fullPage:true});
 const storage=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}));
 const cookies=await page.context().cookies();
 const external=requests.filter(u=>!u.startsWith('http://127.0.0.1:4322/'));
 if(external.length||cookies.length||storage.local.length||storage.session.length||errors.length)throw Error(JSON.stringify({external,cookies,storage,errors}));
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'output/playwright/full-v2-home-desktop.png',fullPage:true});
 return {passed:true,layouts:results,keyboard:'Skip link focus and target passed',contact:'Email-only; direct success URL unconfirmed and noindex',optionalRequests:external,browserStorage:storage,cookieCount:cookies.length,pageErrors:errors,limitations:'Local clean browser only. Existing favicon.ico 404. No deployed-host verification or real enquiry.'};
}
