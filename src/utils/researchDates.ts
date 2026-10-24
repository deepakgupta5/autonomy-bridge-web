import {deploymentPolicy} from '../../config/deployment-policy.mjs';
import revised from '../../config/material-research-revisions.json';
export const materiallyRevised = (path: string) => revised.includes(path);
export const researchReleaseDate = deploymentPolicy.mode === 'production'
  ? deploymentPolicy.researchRevisionDate as string | null : null;
export function researchDateSchema(entry: Record<string, any>, path: string) {
  if (!/^\/(frameworks|insights|use-cases|case-studies|glossary|market-overview)(?:\/|$)/.test(path)) return entry;
  const copy = {...entry};
  // Source records do not establish actual public publication dates.
  delete copy.datePublished; delete copy.dateModified;
  if (materiallyRevised(path) && researchReleaseDate && (copy['@type'] !== 'FAQPage')) copy.dateModified = researchReleaseDate;
  return copy;
}
