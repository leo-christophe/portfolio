import { getLangFromUrl } from "./traduction.js";

const lang = getLangFromUrl();

import dataEN from "../data/data_en.json";
import dataFR from "../data/data_fr.json";

let json = null;
if (lang === "en") {
    json = dataEN;
} else if (lang === "fr") {
    json = dataFR;
}

// Accessing the sorted valid skills from the JSON data
const sortedCompetences = json.sorted_valid_skills;

/**
 * @function levenshtein
 * @description Calcul de la distance de Levenshtein entre deux mots
 * @param {String} a Mot 1 
 * @param {String} b Mot 2
 * @returns {Number} Distance de Levenshtein entre les deux mots
 */
function levenshtein(a, b) {
    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

/**
 * @function findClosestCompetence
 * @description Trouve la compétence la plus proche d'une entrée donnée
 * @param {Array} input Tableau de compétences triées
 * @param {*} tolerance Seuil de tolérance de distance de Levenshtein pour la recherche de la compétence la plus proche
 * @returns String La compétence la plus proche
 */
function findClosestCompetence(input, tolerance=10) {
    let closestCompetence = input;
    let minDistance = Infinity;

    // Iterate over each category of competencies
    for (const categoryObject of sortedCompetences) {
        for (const competencesInCategory of Object.values(categoryObject)) {
            // Iterate over each competence in the category
            for (const competence of competencesInCategory) {
                const distance = levenshtein(input.toLowerCase(), competence.toLowerCase());

                // Update if the distance is smaller
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCompetence = competence;
                } 
            }
            
            
        }
    }

    // seuil de tolérance de 10 de distances soit 10 caractères différents au maximum (insertion, suppression, substitution)
    if (minDistance <= tolerance){
        return closestCompetence;
    } else {
        return input;
    }
}

export { findClosestCompetence, levenshtein };