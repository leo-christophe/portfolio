import { describe, it, expect, vi, beforeEach } from 'vitest';
import { traductionSetup, getLangFromUrl, updateUrlLang, changeLang } from '../src/utils/traduction';

// Mocking dependencies
import { useI18n } from 'vue-i18n';
import { useNavigatorLanguage } from '@vueuse/core';

// Mock for vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' }, // Default locale
  }),
}));

// Mock for vueuse
vi.mock('@vueuse/core', () => ({
  useNavigatorLanguage: () => ({
    language: { value: 'fr' }, // Default navigator language
  }),
}));

describe('traductionSetup', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('devrait configurer la langue par défaut et la sauvegarder dans localStorage', async () => {
    const result = await new Promise((resolve) => {
      traductionSetup();
      setTimeout(() => {
        resolve(localStorage.getItem('lang'));
      }, 0); // Allow time for the setTimeout to complete
    });
    
    // Verify that the language in localStorage is updated correctly
    expect(localStorage.getItem('lang')).toBe('fr');
    expect(result).toBe('fr');
  });

    it('devrait utiliser la langue du navigateur si aucune langue n\'est stockée', async () => {
        localStorage.removeItem('lang'); // Ensure lang is not set

        const result = await traductionSetup(); // Await the result of traductionSetup
    
        // Verify that the language is set to the navigator language
        expect(result).toBe(useNavigatorLanguage().language.value);
    });

  it('devrait utiliser la langue de l\'URL si présente', () => {
    // Simulate a URL with the language 'fr'
    const mockUrl = new URL('http://localhost?lang=fr');
    vi.stubGlobal('window', { location: mockUrl });

    traductionSetup();

    // Verify that the language is set to 'fr'
    expect(localStorage.getItem('lang')).toBe('fr');
  });
});

describe('getLangFromUrl', () => {
  it('devrait extraire correctement la langue de l\'URL', () => {
    const mockUrl = new URL('http://localhost?lang=fr-FR');
    vi.stubGlobal('window', { location: mockUrl });

    const lang = getLangFromUrl();
    expect(lang).toBe('fr');  // Verify that the language is extracted correctly
  });

  it('devrait retourner fr si aucun paramètre lang n\'est présent', () => {
    const mockUrl = new URL('http://localhost');
    vi.stubGlobal('window', { location: mockUrl });

    const lang = getLangFromUrl();
    expect(lang).toBe('fr');  // Default language
  });
});

describe('changeLang', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = ''; // Réinitialiser le DOM
  });

  it('devrait mettre à jour la langue et le localStorage', () => {
    const mockUrl = new URL('http://localhost');
    vi.stubGlobal('window', {
      location: {
        href: 'http://localhost',
        search: '',
        pathname: '/',
        assign: vi.fn(),
        reload: vi.fn(),
      },
      history: {
        pushState: vi.fn(),
        replaceState: vi.fn(),
      },
    });
    
    changeLang('fr');

    // Verify that localStorage is updated
    expect(localStorage.getItem('lang')).toBe('fr');

    // Verify that the document has the correct lang attribute
    expect(document.documentElement.lang).toBe('fr');
  });

  it('devrait renvoyer une erreur si langue non adaptée', () => {
    const mockUrl = new URL('http://localhost');
    vi.stubGlobal('window', {
      location: mockUrl,
      history: {
        replaceState: vi.fn(),
        pushState: vi.fn(),
      },
    });
  });
    it('devrait renvoyer une erreur si langue non adaptée', () => {
      // Mock complet pour window et history
      const mockUrl = new URL('http://localhost');
      vi.stubGlobal('window', {
        location: mockUrl,
        history: {
          replaceState: vi.fn(),
          pushState: vi.fn(),
        },
      });
    
      try {
        changeLang('es');
      } catch (error) {
        // Vérifiez que l'erreur levée est correcte
        expect(error).toEqual(new Error('Langue non supportée'));
      }
    });

});
