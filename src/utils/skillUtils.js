/**
 * Permet de gérer le clic sur une compétence en redirigeant l'utilisateur vers la page de liste des compétences
 * @param {*} skill Compétence à rechercher
 * @param {*} router  Objet de routage de Vue Router
 * @returns {boolean} Retourne true si la compétence est valide, sinon false
 */
const handleSkillClick = (skill, router) => {
  // Vérifiez si skill est défini et non nul
  if (skill == null) {
    console.error("Skill is null or undefined");
    return;
  }

  // Convertissez skill en chaîne de caractères et appliquez trim() et toLowerCase()
  const newSkill = String(skill).toLowerCase().trim();

  // Vérifiez si newSkill n'est pas vide
  if (newSkill) {
    router.push({ path: "/skillslist", query: { skill: newSkill } });
    return true;
  } else {
    console.error("Compétence vide après conversion");
    return false;
  }
};

export default handleSkillClick;
