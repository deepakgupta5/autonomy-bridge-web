import {readFileSync,writeFileSync} from 'node:fs';import {spawnSync} from 'node:child_process';
const parts=[];
for(const width of [1440,768,390])parts.push(readFileSync('scripts/consolidated-layout-check.js','utf8').replaceAll('4328','4332').replace("'/glossary/autonomous-mobile-robot'","'/glossary/autonomous-mobile-robot','/frameworks/vendor-economics-framework'").replace('page.context().newPage()','(await page.context().browser().newContext()).newPage()').replaceAll('release-${width}', 'final-${width}').replace('[1440,768,390]',`[${width}]`));
parts.push(readFileSync('scripts/consolidated-form-check.js','utf8').replaceAll('4328','4332'));
const reports=[];
for(const [i,code] of parts.entries()){
 const result=spawnSync(`${process.env.HOME}/.codex/skills/playwright/scripts/playwright_cli.sh`,['--session','abrelease','run-code',code],{encoding:'utf8',maxBuffer:10*1024*1024});
 const match=result.stdout.match(/### Result\n([^\n]+)/);if(!match){console.log('Part '+i+'\n'+result.stdout+result.stderr);process.exit(1);}reports.push(JSON.parse(match[1]));console.log('Part '+i+': '+reports.at(-1).passed);
}
const report={...reports[3],passed:reports.every(r=>r.passed),results:reports.slice(0,3).flatMap(r=>r.results),artifact:'/private/tmp/ab-final-approved',loopback:'http://127.0.0.1:4332'};writeFileSync('docs/consolidated-release/final-release/browser.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));process.exit(report.passed?0:1);
