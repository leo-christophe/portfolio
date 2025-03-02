import dataEN from "../data/data_en.json";
import dataFR from "../data/data_fr.json";

let data = null;

export default {
  install(app) {
    // Utilise l'importation dynamique ici si nécessaire
    const lang = localStorage.getItem("lang"); // Assume cette fonction est définie
    if (lang === "en") {
      data = dataEN;
    } else if (lang === "fr") {
      data = dataFR;
    } else {
      data = dataFR;
    }

    // Ajouter les données à l'instance globale
    app.config.globalProperties.$JSONData = data;
  },
};
