async (page) => {
 page = await page.context().newPage();
 const routes = /* ROUTES */ [];
 const normalize=s=>s.replace(/\s+/g,' ').trim();
 const parity=[];
 for(const route of routes){
  const capture=async(port)=>{
   await page.goto(`http://127.0.0.1:${port}${route}`); await page.locator('.detail-body').waitFor({state:'visible'});
   return page.locator('.detail-body').evaluate(body=>{
    // Normalize only documented presentation differences: removed duplicate H1,
    // restored figure captions/reference lists, and leaked internal directive lists.
    const clone=body.cloneNode(true);
    clone.querySelectorAll('[style*="display: none"],h1,figure,figcaption').forEach(n=>n.remove());
    clone.querySelectorAll('p').forEach(n=>{
     const t=n.textContent.trim();
     if(t.startsWith('[NO VISIBLE IMAGE')||/^All .+ →$/.test(t)||/^(Framework|Insights|Use Cases|Case Studies) hub:/.test(t)||/^(Related case studies|Related frameworks|Related insights|Related use cases?|Glossary terms?):/.test(t))n.remove();
    });
    clone.querySelectorAll('ul,ol').forEach(n=>{if(n.textContent.includes(':::'))n.remove();});
    return clone.textContent;
   });
  };
  const before=normalize(await capture(4324)),after=normalize(await capture(4325));
  let mismatch=null;
  if(before!==after){let i=0;while(before[i]===after[i]&&i<before.length)i++;mismatch={offset:i,before:before.slice(Math.max(0,i-80),i+180),after:after.slice(Math.max(0,i-80),i+180)};}
  parity.push({route,match:before===after,mismatch});
 }
 const layouts=[];
 const representatives=['/frameworks/robotics-roi-model','/insights/why-robotics-pilots-fail-to-scale','/use-cases/retail-dc-automation-evaluation','/case-studies/retail-dc-peak-demand-automation-assessment'];
 for(const width of [1440,768,390])for(const route of representatives){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4325'+route);
  await page.waitForLoadState('networkidle');
  const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,visibleH1:[...document.querySelectorAll('h1')].filter(x=>x.getBoundingClientRect().height>0).length,images:[...document.querySelectorAll('.detail-body img')].length,bodyFont:getComputedStyle(document.querySelector('.detail-body')).fontFamily}));
  await page.keyboard.press('Tab');
  result.keyboard=await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim(),outline:getComputedStyle(document.activeElement).outlineStyle}));
  await page.screenshot({path:`output/playwright/issue2-${width}-${route.split('/')[1]}.png`});
  layouts.push({route,width,...result});
 }
 return {passed:parity.every(r=>r.match)&&layouts.every(r=>!r.overflow&&r.visibleH1===1&&r.keyboard.outline!=='none'),parity,layouts};
}
