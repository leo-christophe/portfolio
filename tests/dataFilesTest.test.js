import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const dataEN = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/data_en.json'), 'utf-8'));
const dataFR = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/data_fr.json'), 'utf-8'));

describe('Test des fichiers JSON data_en.json et data_fr.json', () => {
    it('Les titres de formations doivent correspondre en français et en anglais', () => {
        dataEN.formations.forEach((formation, index) => {
            const formationFR = dataFR.formations[index];
            expect(formationFR.id).toBe(formation.id);  // Vérification de correspondance d'ID
            expect(formationFR.titre).not.toBe(formation.titre);  // Les titres doivent être différents
        });
        });

  // Test pour les formations
  it('Les formations doivent être correctement définies dans les deux fichiers', () => {
    expect(dataEN.formations).toBeInstanceOf(Array);
    expect(dataFR.formations).toBeInstanceOf(Array);
    expect(dataEN.formations.length).toBeGreaterThan(0);
    expect(dataFR.formations.length).toBeGreaterThan(0);

    // Comparaison d'une propriété entre les fichiers
    dataEN.formations.forEach((formation, index) => {
      const formationFR = dataFR.formations[index];
      expect(formation.titre).not.toBeUndefined();
      expect(formationFR.titre).not.toBeUndefined();
    });
  });

  it('Chaque formation doit contenir les bonnes propriétés', () => {
    dataEN.formations.forEach(formation => {
      expect(formation).toHaveProperty('id');
      expect(formation).toHaveProperty('titre');
      expect(formation).toHaveProperty('lieu');
      expect(formation).toHaveProperty('ville');
      expect(formation).toHaveProperty('departement');
      expect(formation).toHaveProperty('obtention');
      expect(formation).toHaveProperty('annees');
    });
  });

  it('Les IDs des formations doivent être uniques', () => {
    const ids = dataEN.formations.map(formation => formation.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  // Test pour les expériences
  it('Les expériences doivent correspondre entre les deux fichiers', () => {
    expect(dataEN.experiences).toBeInstanceOf(Array);
    expect(dataFR.experiences).toBeInstanceOf(Array);
    expect(dataEN.experiences.length).toBeGreaterThan(0);
    expect(dataFR.experiences.length).toBeGreaterThan(0);

    dataEN.experiences.forEach((experience, index) => {
      const experienceFR = dataFR.experiences[index];
      expect(experience.id).toBe(experienceFR.id);
      expect(experience.contrat).not.toBeUndefined();
      expect(experienceFR.contrat).not.toBeUndefined();
    });
  });

  it('Les dates des expériences doivent être un tableau de deux dates', () => {
    dataEN.experiences.forEach(experience => {
      expect(experience.dates).toBeInstanceOf(Array);
      expect(experience.dates.length).toBe(2);
      experience.dates.forEach(date => {
        expect(typeof date).toBe('string');
      });
    });
  });

  it('Les dates des expériences doivent être logiquement valides', () => {
    dataEN.experiences.forEach(experience => {
      const startDate = new Date(experience.dates[0]);
      const endDate = new Date(experience.dates[1]);
      expect(startDate.getTime()).toBeLessThan(endDate.getTime());
    });
  });
  

  // Test pour les projets
  it('Les projets doivent correspondre entre les fichiers', () => {
    expect(dataEN.projects).toBeInstanceOf(Array);
    expect(dataFR.projects).toBeInstanceOf(Array);
    expect(dataEN.projects.length).toBeGreaterThan(0);
    expect(dataFR.projects.length).toBeGreaterThan(0);

    dataEN.projects.forEach((project, index) => {
      const projectFR = dataFR.projects[index];
      expect(project.nom).toBe(projectFR.nom);
      expect(project.titre).not.toBeUndefined();
      expect(projectFR.titre).not.toBeUndefined();
    });
  });

  // Test des compétences
  it('Les compétences principales doivent être correctement définies', () => {
    expect(dataEN.main_hard_skills).toBeInstanceOf(Array);
    expect(dataFR.main_hard_skills).toBeInstanceOf(Array);
    expect(dataEN.main_hard_skills.length).toBe(dataFR.main_hard_skills.length);
  });

  // Test des liens (links)
  it('Les liens (links) doivent exister et être valides dans les deux fichiers', () => {
    expect(dataEN.links).toBeInstanceOf(Array);
    expect(dataFR.links).toBeInstanceOf(Array);
    dataEN.links.forEach((link, index) => {
      const linkFR = dataFR.links[index];
      expect(link.name).toBe(linkFR.name);
      expect(link.url).toBe(linkFR.url);
    });
  });
});
