import { levenshtein, findClosestCompetence  } from "../src/utils/levenshtein";
import { describe, it, expect } from 'vitest';

describe('Levenshtein Function', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshtein('test', 'test')).toBe(0);
  });

  it('should return the correct distance for different strings', () => {
    expect(levenshtein('test', 'tent')).toBe(1); // 1 substitution
    expect(levenshtein('kitten', 'sitting')).toBe(3); // 3 opérations
    expect(levenshtein('flaw', 'lawn')).toBe(2); // 2 substitutions
  });

  it('should return the length of the string when compared with an empty string', () => {
    expect(levenshtein('test', '')).toBe(4); // Suppression de tous les caractères
    expect(levenshtein('', 'test')).toBe(4); // Ajout de tous les caractères
  });
});


