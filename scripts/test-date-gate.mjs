import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {copyFileSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {validCalendarDate} from '../config/deployment-policy.mjs';

const source = readFileSync(new URL('../config/deployment-policy.mjs', import.meta.url), 'utf8');
const fixture = mkdtempSync(join(tmpdir(), 'ab-date-gate-'));
mkdirSync(join(fixture, 'config'));
mkdirSync(join(fixture, 'scripts'));
copyFileSync(new URL('preview-build-guard.mjs', import.meta.url), join(fixture, 'scripts/preview-build-guard.mjs'));
writeFileSync(join(fixture, 'package.json'), '{"type":"module"}\n');
const siteId = '3df07dc5-6950-4241-98eb-cf95df3d271d';
const env = {...process.env, SITE_ID: siteId, CONTEXT: 'production'};
delete env.NETLIFY;
delete env.AB_PRIVATE_PREVIEW;

function run(publicationDate, researchRevisionDate, extraEnv = {}) {
  const policy = source.replace("mode: 'local'", "mode: 'production'")
    .replace("publicationDate: ''", `publicationDate: ${JSON.stringify(publicationDate)}`)
    .replace('researchRevisionDate: null', `researchRevisionDate: ${JSON.stringify(researchRevisionDate)}`);
  assert.notEqual(policy, source);
  writeFileSync(join(fixture, 'config/deployment-policy.mjs'), policy);
  return spawnSync(process.execPath, ['scripts/preview-build-guard.mjs'],
    {cwd: fixture, env: {...env, ...extraEnv}, encoding: 'utf8'});
}

for (const value of ['2000-01-02', '2000-02-29', '2024-02-29']) assert(validCalendarDate(value));
for (const value of ['', null, '2000-1-02', '2000-13-01', '2000-02-30', '2001-02-29', '0000-01-01']) assert(!validCalendarDate(value));
for (const [publicationDate, researchRevisionDate] of [
  ['', null], ['', '2000-01-03'], ['2000-01-02', null],
  ['2000-1-02', '2000-01-03'], ['2000-01-02', '2000-1-03'],
  ['2000-02-30', '2000-01-03'], ['2000-01-02', '2001-02-29'],
]) {
  const result = run(publicationDate, researchRevisionDate);
  assert.notEqual(result.status, 0, JSON.stringify([publicationDate, researchRevisionDate]));
  assert.match(result.stderr, /explicit valid publicationDate and researchRevisionDate/);
}
for (const extraEnv of [{}, {NETLIFY: 'true'}]) {
  const result = run('2000-02-29', '2000-01-03', extraEnv);
  assert.equal(result.status, 0, result.stderr);
}
assert.notEqual(run('2000-02-29', '2000-01-03', {SITE_ID: 'wrong'}).status, 0);
const releasePatch = new URL('prepare-release-patch.py', import.meta.url).pathname;
for (const date of ['2000-02-30', '2000-1-02']) {
  const result = spawnSync('python3', [releasePatch, '--origin', 'https://autonomybridge.com',
    '--site-id', siteId, '--publication-date', date, '--research-revision-date', '2000-01-03']);
  assert.equal(result.status, 2);
}
console.log(JSON.stringify({passed: true, fixture, rejected_date_pairs: 7,
  valid_synthetic_pair: ['2000-02-29', '2000-01-03'],
  local_and_netlify_production_guard: 'passed', invalid_target_rejected: true}));
