import { useRouter } from 'vue-router';

const handleSkillClick = (skill, router) => {
  // Vérifiez si skill est défini et non nul
  if (skill == null) {
    console.error('Skill is null or undefined');
    return;
  }

  // Affichez la valeur originale de skill
  console.log('Original skill:', skill);

  // Convertissez skill en chaîne de caractères et appliquez trim() et toLowerCase()
  const newSkill = String(skill).toLowerCase().replace(/\s+/g, "").trim();
  console.log('Trimmed and lowercase skill:', newSkill);

  // Vérifiez si newSkill n'est pas vide
  if (newSkill) {
    console.log('Navigating to /skills with skill:', newSkill);
    router.push({ path: '/skillslist', query: { skill: newSkill } });
  } else {
    console.error('Skill is empty after trimming');
  }
};

export default handleSkillClick;