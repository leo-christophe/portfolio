import { levenshtein, findClosestCompetence } from "../src/utils/levenshtein";
import { describe, it, expect } from 'vitest';

describe('Fonction Levenshtein', () => {
  it('doit retourner 0 pour des chaînes identiques', () => {
    expect(levenshtein('test', 'test')).toBe(0);
  });

  it('doit retourner la distance correcte pour des chaînes différentes', () => {
    expect(levenshtein('test', 'tent')).toBe(1); // 1 substitution
    expect(levenshtein('kitten', 'sitting')).toBe(3); // 3 opérations
    expect(levenshtein('flaw', 'lawn')).toBe(2); // 2 substitutions
  });

  it('doit retourner la longueur de la chaîne lorsqu\'elle est comparée à une chaîne vide', () => {
    expect(levenshtein('test', '')).toBe(4); // Suppression de tous les caractères
    expect(levenshtein('', 'test')).toBe(4); // Ajout de tous les caractères
  });
});

const sortedCompetences = [
    {
        web: ['Javascript', 'Vue', 'Excel'],
        mobile: ['Android', 'iOS', 'Flutter']
    },
    {
        backend: ['PHP', 'Laravel', 'Node.js'],
        database: ['MySQL', 'PostgreSQL', 'MongoDB']
    }
];

// Simuler l'importation de sortedCompetences dans le test
vi.mock('./sortedCompetences', () => ({
    sortedCompetences
}));

describe('findClosestCompetence', () => {
    it('doit retourner la compétence la plus proche', () => {
        expect(findClosestCompetence('JavaScrip')).toBe('Javascript');
        expect(findClosestCompetence('Laraval')).toBe('Laravel');
        expect(findClosestCompetence('Excell')).toBe('Excel');
        expect(findClosestCompetence('PPPPHHQP')).toBe('PHP');
        expect(findClosestCompetence('Postgre')).toBe('PostgreSQL');
    });

    it('doit retourner l\'entrée si la distance est supérieure à la tolérance', () => {
        expect(findClosestCompetence('Laraval', 2)).toBe('Laravel');
        expect(findClosestCompetence('Excell', 3)).toBe('Excel');
        expect(findClosestCompetence('PPPPHHQP', 4)).toBe('PPPPHHQP');
        expect(findClosestCompetence('Postgre', 5)).toBe('PostgreSQL');
        expect(findClosestCompetence('JavScrip', 1)).toBe('JavScrip');
    });
});
