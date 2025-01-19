/**
 * Classe utilitaire pour la manipulation des dates.
 */
class DateUtils {
    /**
     * Formate une plage de dates en une chaîne lisible.
     * 
     * @param {string} startDate - La date de début au format ISO (YYYY-MM-DD).
     * @param {string} endDate - La date de fin au format ISO (YYYY-MM-DD).
     * @param {string} [locale='fr'] - La locale pour le formatage de la date.
     * @returns {string} - La plage de dates formatée.
     * @throws {Error} - Si l'une des dates est null ou si la date de début est supérieure à la date de fin.
     */
    static formatDateRange(startDate, endDate, locale = 'fr') {
        if (!endDate || startDate === endDate) {
            return this.formatDate(startDate, locale);
        }

        // Une des deux dates est null
        if (startDate === null || endDate === null) {
            throw new Error('La date de début ou la date de fin est null');
        }

        // La date de début est supérieure à la date de fin
        if (new Date(startDate) > new Date(endDate)) {
            throw new Error('La date de début est supérieure à la date de fin');
        }

        const options = { year: 'numeric', month: 'short' };

        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        
        const start = capitalizeFirstLetter(new Date(startDate).toLocaleDateString(locale, options));
        const end = capitalizeFirstLetter(new Date(endDate).toLocaleDateString(locale, options));
        
        return `${start} - ${end}`;
        
    }

    /**
     * Formate une date en une chaîne lisible.
     * 
     * @param {string} date - La date à formater au format ISO (YYYY-MM-DD).
     * @param {string} [locale='fr'] - La locale pour le formatage de la date.
     * @returns {string} - La date formatée.
     */
    static formatDate(date, locale = 'fr') {
        const options = { year: 'numeric', month: 'short' };
        return new Date(date).toLocaleDateString(locale, options);
    }

    /**
     * Vérifie si une date est passée.
     * 
     * @param {string} date - La date à vérifier au format ISO (YYYY-MM-DD).
     * @returns {boolean} - True si la date est passée, sinon false.
     */
    static isPastDate(date) {
        if (!date || date === null || date === '' || date === 'Invalid Date') {
            throw new Error('Format de date invalide. date: '+date);
        }

        return new Date(date) <= new Date();
    }

    /**
     * Vérifie si une date est future.
     * 
     * @param {Date} date 
     * @returns 
     */
    static isFutureDate(date){
        if (!date || date === null || date === '' || date === 'Invalid Date') {
            throw new Error('Format de date invalide. date: '+date);
        }

        return new Date(date) > new Date();
    }
}

export default DateUtils;