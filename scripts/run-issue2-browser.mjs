import {readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const routes=JSON.parse(readFileSync('docs/issue-2/static-html.json')).pages.map(p=>p.route);
const code=readFileSync('scripts/issue2-browser-check.js','utf8').replace('/* ROUTES */ []',JSON.stringify(routes));
const r=spawnSync(`${process.env.HOME}/.codex/skills/playwright/scripts/playwright_cli.sh`,['--session','abissue2','run-code',code],{encoding:'utf8',maxBuffer:10*1024*1024});
const match=r.stdout.match(/### Result\n([^\n]+)/);
if(match){const result=JSON.parse(match[1]);writeFileSync('docs/issue-2/browser.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({passed:result.passed,parity_failures:result.parity.filter(x=>!x.match),layouts:result.layouts},null,2));process.exit(result.passed?0:1);}
console.log(r.stdout+r.stderr);process.exit(1);
