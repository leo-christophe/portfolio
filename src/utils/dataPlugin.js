import dataEN from '../data/data_en.json';
import dataFR from '../data/data_fr.json';
import { getLangFromUrl } from './traduction';

let data = null;

export default {
    install(app) {
        // Utilise l'importation dynamique ici si nécessaire
        const lang = getLangFromUrl(); // Assume cette fonction est définie
        if (lang === 'en') {
            data = dataEN;
        } else if (lang === 'fr') {
            data = dataFR;
        }

        // Ajouter les données à l'instance globale
        app.config.globalProperties.$JSONData = data;
    }
};
