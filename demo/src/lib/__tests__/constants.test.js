import { describe, it, expect } from 'vitest';
import { UMBRAL, DATASET_URL, GITHUB_USER, REPO_NAME } from '../constants';
import { STRINGS } from '../strings';

describe('constants', () => {
  it('UMBRAL is 0.5', () => {
    expect(UMBRAL).toBe(0.5);
  });

  it('English and Spanish strings define the same keys with the same kind of value', () => {
    const shape = (dict) => Object.keys(dict).sort().map((k) => `${k}:${typeof dict[k]}`);
    expect(shape(STRINGS.es)).toEqual(shape(STRINGS.en));
  });

  it('DATASET_URL is a valid URL', () => {
    expect(DATASET_URL).toMatch(/^https?:\/\//);
  });

  it('GITHUB_USER defaults to abarriuso', () => {
    expect(GITHUB_USER).toBe('abarriuso');
  });

  it('REPO_NAME defaults to melanoma-detection', () => {
    expect(REPO_NAME).toBe('melanoma-detection');
  });
});
