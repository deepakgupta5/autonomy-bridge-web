async(page)=>{ page=await page.context().newPage(); const results=[];
 const browser=page.context().browser();const noJSContext=await browser.newContext({javaScriptEnabled:false});const noJSPage=await noJSContext.newPage();await noJSPage.goto('http://127.0.0.1:4328/contact');const noJS={form:await noJSPage.locator('form[name=contact]').count(),disabled:await noJSPage.locator('button[type=submit]').isDisabled(),instruction:await noJSPage.locator('noscript').innerText()};await noJSContext.close();
 // ALL requests in these isolated contexts are intercepted. No production request is sent.
 const formResults=[];
 for(const mode of ['accepted','unknown']){
  const context=await browser.newContext({serviceWorkers:'block'});let posts=0,receiptGets=0,unexpected=0;
  await context.route('**/*',async route=>{
   const req=route.request(),url=new URL(req.url());
   if(url.origin!=='https://autonomybridge.com'){unexpected++;return route.abort();}
   if(req.method()==='POST'){posts++;return route.fulfill({status:200,contentType:'text/html',body:'Not acceptance proof'});}
   if(url.pathname==='/.netlify/functions/contact-receipt'){receiptGets++;return route.fulfill({status:mode==='accepted'?200:202,contentType:'application/json',body:JSON.stringify({accepted:mode==='accepted',reference:url.searchParams.get('reference')})});}
   if(req.method()!=='GET'){unexpected++;return route.abort();}
   const response=await route.fetch({url:'http://127.0.0.1:4328'+url.pathname+url.search});await route.fulfill({response});
  });
  const p=await context.newPage();await p.goto('https://autonomybridge.com/contact');await p.locator('button[type=submit]').click();const invalid={name:await p.locator('#name-error').innerText(),email:await p.locator('#email-error').innerText(),company:await p.locator('#company').getAttribute('required'),message:await p.locator('#message-error').innerText(),focus:await p.evaluate(()=>document.activeElement.id),posts};
  await p.locator('#name').fill('Offline fixture');await p.locator('#email').fill('not-an-email');await p.locator('#message').fill('Offline privacy request, intercepted only.');await p.locator('button[type=submit]').click();const invalidEmail=await p.locator('#email-error').innerText();await p.locator('#email').fill('fixture@example.invalid');await p.locator('button[type=submit]').click();
  let state;
  if(mode==='accepted'){await p.waitForURL('**/contact-success');state={confirmed:await p.locator('#confirmed').isVisible(),message:await p.locator('#confirmed').innerText()};}
  else {await p.waitForFunction(()=>document.querySelector('button[type=submit]')?.dataset.outcome==='unknown',{},{timeout:25000});state={status:await p.locator('#form-status').innerText(),disabled:await p.locator('button[type=submit]').isDisabled(),preserved:await p.locator('#message').inputValue(),focus:await p.evaluate(()=>document.activeElement.id)};}
  formResults.push({mode,invalid,invalidEmail,posts,receiptGets,unexpected,state});await context.close();
 }
 await page.goto('http://127.0.0.1:4328/contact');await page.locator('#name').fill('Local fixture');await page.locator('#email').fill('fixture@example.invalid');await page.locator('#company').fill('Fixture');await page.locator('#message').fill('Must reject before transmission on loopback');await page.locator('button[type=submit]').click();const rejected={status:await page.locator('#form-status').innerText(),preserved:await page.locator('#message').inputValue(),retryEnabled:await page.locator('button[type=submit]').isEnabled()};
 return {passed:results.every(r=>!r.overflow&&r.h1===1&&r.mailLinks===0&&r.focus==='solid'&&r.skip&&(r.width!==390||r.mobileMenu))&&noJS.form===1&&noJS.disabled&&noJS.instruction.includes('No enquiry has been sent')&&formResults.every(r=>r.invalid.posts===0&&r.invalid.focus==='name'&&Boolean(r.invalid.name)&&Boolean(r.invalid.email)&&Boolean(r.invalid.message)&&!r.invalid.company&&r.invalidEmail.includes('valid email')&&r.posts===1&&r.unexpected===0&&(r.mode==='accepted'?r.state.confirmed:r.state.disabled&&r.state.preserved.includes('Offline privacy')&&r.state.focus==='form-status'))&&rejected.status.includes('was not submitted')&&rejected.retryEnabled,results,noJS,formResults,rejected,scope:'All production-origin requests intercepted and fulfilled locally; no real enquiry, Netlify event or mailbox delivery tested.'};
}
