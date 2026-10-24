async (page) => {
  const base = 'http://127.0.0.1:4321';
  const results = [];
  function check(condition, label) { if (!condition) throw new Error(label); results.push(label); }
  const routes = /* ROUTES */ [];
  const httpFailures = [];
  for (let i=0; i<routes.length; i+=8) {
    await Promise.all(routes.slice(i,i+8).map(async path => {
      const response = await page.request.get(base+path);
      if (response.status() !== 200) httpFailures.push({path,status:response.status()});
    }));
  }
  check(routes.length === 160 && httpFailures.length === 0, 'All 160 local routes return HTTP 200');
  const layouts=[];
  for (const width of [1440,768,390]) {
    await page.setViewportSize({width,height:1000});
    for (const path of ['/', '/commercial-leadership', '/ai-consulting', '/about', '/research', '/contact', '/methodology', '/privacy-policy', '/sitemap', '/market-overview', '/glossary/automation-readiness', '/frameworks/pilot-to-scale-failure-framework']) {
      await page.goto(base+path);
      const state=await page.evaluate(()=>({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,headings:[...document.querySelectorAll('main h1')].filter(x=>getComputedStyle(x).display!=='none').length,active:[...document.querySelectorAll('nav[aria-label=Primary] [aria-current]')].map(x=>x.textContent.trim())}));
      if(state.overflow || state.headings!==1) throw new Error(JSON.stringify(state));
      layouts.push(state);
    }
  }
  await page.goto(base+'/contact');
  await page.keyboard.press('Tab');
  check(await page.locator('.skip-link').evaluate(e=>e===document.activeElement), 'Keyboard skip link receives first focus');
  await page.keyboard.press('Enter');
  check(await page.evaluate(()=>location.hash==='#main-content'), 'Skip link reaches main content');
  await page.getByRole('button',{name:'Send enquiry'}).click();
  check(await page.locator('#form-status').textContent()==='Please check the highlighted fields.', 'Required-fields summary');
  check(await page.locator('[aria-invalid=true]').count()===4, 'Four required fields, optional website');
  check(await page.locator('#name').evaluate(e=>e===document.activeElement), 'First invalid field focused');
  await page.locator('#name').fill('Local Preview Test');
  await page.locator('#email').fill('invalid');
  await page.locator('#company').fill('Local test only');
  await page.locator('#message').fill('Controlled interface test. No real delivery.');
  await page.getByRole('button',{name:'Send enquiry'}).click();
  check(await page.locator('#email-error').textContent()==='Please enter a valid email address.', 'Invalid email message');
  await page.locator('#email').fill('preview@example.invalid');
  const endpoint = '**/__preview/contact';
  await page.route(endpoint, route=>route.fulfill({status:422,body:'Rejected fixture'}));
  await page.getByRole('button',{name:'Send enquiry'}).click();
  await page.waitForFunction(()=>document.querySelector('#form-status').textContent.includes('was not submitted'));
  check(await page.locator('#message').inputValue()==='Controlled interface test. No real delivery.', 'Confirmed failure retains entered information');
  check(await page.getByRole('button',{name:'Send enquiry'}).isEnabled(), 'Confirmed failure permits retry');
  await page.unroute(endpoint);
  await page.route(endpoint, route=>route.fulfill({status:200,contentType:'text/html',body:'Ordinary page, not acceptance'}));
  await page.getByRole('button',{name:'Send enquiry'}).click();
  await page.waitForFunction(()=>document.querySelector('#form-status').textContent.includes('could not confirm'));
  check(page.url().includes('/contact'), 'HTTP 200 HTML never becomes acceptance');
  check(await page.getByRole('button',{name:'Send enquiry'}).isDisabled(), 'Unknown outcome prevents immediate duplicate submission');
  check(await page.locator('#name').inputValue()==='Local Preview Test', 'Unknown outcome retains entered information');
  await page.unroute(endpoint);
  await page.goto(base+'/contact');
  for (const [name,value] of Object.entries({name:'Local Preview Test',email:'preview@example.invalid',company:'Local test only',message:'Fixture only'})) await page.locator('#'+name).fill(value);
  await page.route(endpoint, route=>route.abort('failed'));
  await page.getByRole('button',{name:'Send enquiry'}).click();
  await page.waitForFunction(()=>document.querySelector('#form-status').textContent.includes('could not confirm'));
  check(await page.locator('#message').inputValue()==='Fixture only','Network failure is unknown and preserves input');
  await page.unroute(endpoint);
  await page.goto(base+'/contact');
  for (const [name,value] of Object.entries({name:'Local Preview Test',email:'preview@example.invalid',company:'Local test only',message:'Fixture only'})) await page.locator('#'+name).fill(value);
  await page.route(endpoint, route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({accepted:true})}));
  await page.getByRole('button',{name:'Send enquiry'}).click();
  await page.waitForURL('**/contact-success');
  check(await page.locator('#confirmed').isVisible(),'Explicit local acceptance fixture displays confirmation');
  await page.reload();
  check(await page.locator('#unconfirmed').isVisible(),'Direct success URL or reload does not claim acceptance');
  check(await page.locator('meta[name=robots]').getAttribute('content')==='noindex,nofollow','Success page excluded from indexing');
  await page.unroute(endpoint);
  await page.goto(base+'/contact');
  await page.setViewportSize({width:390,height:1000});
  await page.screenshot({path:'/private/tmp/ab-contact-mobile.png',fullPage:true});
  return {checks:results,httpRoutes:routes.length,layouts,transport:'Intercepted loopback-only fixtures; no real receiving service or mailbox tested'};
}
