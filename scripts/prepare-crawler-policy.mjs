// Produces a review artifact only. Never overwrites public/robots.txt.
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const [gpt,claude,google,out]=process.argv.slice(2);
if (![gpt,claude,google].every(v=>['allow','disallow'].includes(v)) || !out || resolve(out)===resolve('public/robots.txt')) throw Error('Usage: node scripts/prepare-crawler-policy.mjs allow|disallow allow|disallow allow|disallow OUTPUT (not public/robots.txt)');
let text=readFileSync('public/robots.txt','utf8');
for (const [bot,rule] of [['GPTBot',gpt],['ClaudeBot',claude],['Google-Extended',google]]) {
 const re=new RegExp(`(User-agent: ${bot}\\n)(?:Allow|Disallow): /`);
 if(!re.test(text))throw Error('Missing exact group '+bot);
 text=text.replace(re,`$1${rule==='allow'?'Allow':'Disallow'}: /`);
}
writeFileSync(out,text);
