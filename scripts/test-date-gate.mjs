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

function run(dates, extraEnv = {}) {
  const policy = source.replace(/mode: '(?:local|production)'/, "mode: 'production'")
    .replace(/publicationDate: (?:''|'\d{4}-\d{2}-\d{2}')/, `publicationDate: ${JSON.stringify(dates.publicationDate)}`)
    .replace(/researchRevisionDate: (?:null|'\d{4}-\d{2}-\d{2}')/, `researchRevisionDate: ${JSON.stringify(dates.researchRevisionDate)}`)
    .replace(/termsRevisionDate: (?:null|'\d{4}-\d{2}-\d{2}')/, `termsRevisionDate: ${JSON.stringify(dates.termsRevisionDate)}`)
    .replace(/cookieRevisionDate: (?:null|'\d{4}-\d{2}-\d{2}')/, `cookieRevisionDate: ${JSON.stringify(dates.cookieRevisionDate)}`)
    .replace(/methodologyRevisionDate: (?:null|'\d{4}-\d{2}-\d{2}')/, `methodologyRevisionDate: ${JSON.stringify(dates.methodologyRevisionDate)}`);
  assert.notEqual(policy, source);
  writeFileSync(join(fixture, 'config/deployment-policy.mjs'), policy);
  return spawnSync(process.execPath, ['scripts/preview-build-guard.mjs'],
    {cwd: fixture, env: {...env, ...extraEnv}, encoding: 'utf8'});
}

for (const value of ['2000-01-02', '2000-02-29', '2024-02-29']) assert(validCalendarDate(value));
for (const value of ['', null, '2000-1-02', '2000-13-01', '2000-02-30', '2001-02-29', '0000-01-01']) assert(!validCalendarDate(value));
const validDates = {publicationDate:'2026-04-01', researchRevisionDate:'2026-03-01',
  termsRevisionDate:'2026-04-02', cookieRevisionDate:'2026-04-03',
  methodologyRevisionDate:'2026-04-04'};
const invalidDates = [
  {publicationDate:''}, {researchRevisionDate:null}, {researchRevisionDate:'2026-03-02'},
  {termsRevisionDate:null}, {cookieRevisionDate:'2000-02-30'},
  {methodologyRevisionDate:null}, {methodologyRevisionDate:'2026-02-28'},
];
for (const change of invalidDates) {
  const result = run({...validDates, ...change});
  assert.notEqual(result.status, 0, JSON.stringify(change));
}
for (const extraEnv of [{}, {NETLIFY: 'true'}]) {
  const result = run(validDates, extraEnv);
  assert.equal(result.status, 0, result.stderr);
}
assert.notEqual(run(validDates, {SITE_ID: 'wrong'}).status, 0);
const releasePatch = new URL('prepare-release-patch.py', import.meta.url).pathname;
for (const date of ['2000-02-30', '2000-1-02']) {
  const result = spawnSync('python3', [releasePatch, '--origin', 'https://autonomybridge.com',
    '--site-id', siteId, '--publication-date', date, '--research-revision-date', '2026-03-01',
    '--terms-revision-date', '2026-03-01', '--cookie-revision-date', '2026-03-01',
    '--methodology-revision-date', '2026-03-01']);
  assert.equal(result.status, 2);
}
console.log(JSON.stringify({passed: true, fixture, rejected_date_configurations: invalidDates.length,
  distinct_date_fixture: validDates,
  local_and_netlify_production_guard: 'passed', invalid_target_rejected: true}));
