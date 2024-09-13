import json from '../data/data.json';
// Accéder aux compétences valides triées
const sortedCompetences = json.sorted_valid_skills;

// Fonction pour calculer la distance de Levenshtein
function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

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

// Fonction pour trouver la compétence la plus proche
function findClosestCompetence(input) {
    let closestCompetence = input;
    let minDistance = Infinity;

    // Parcourir chaque catégorie de compétences
    for (const category of sortedCompetences) {
        const competencesInCategory = Object.values(category)[0];

        // Parcourir chaque compétence dans la catégorie
        for (const competence of competencesInCategory) {
            const distance = levenshtein(input.toLowerCase(), competence.toLowerCase());

            if (distance < minDistance) {
                minDistance = distance;
                closestCompetence = competence;
            }
        }
    }

    return closestCompetence;
}

export { findClosestCompetence, levenshtein };
