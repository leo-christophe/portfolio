// Fonction pour sauvegarder dans le localStorage
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Fonction pour restaurer du localStorage
export function restoreFromLocalStorage(key, defaultValue = null) {
  const savedValue = localStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : defaultValue;
}

// Fonction pour récupérer la date la plus ancienne d'une liste de projets
export function getEarliestDate(projectDates) {
  return projectDates.reduce((earliest, current) => {
    return current.start < earliest ? current.start : earliest;
  }, projectDates[0].start);
}

// Fonction pour récupérer la date la plus récente d'une liste de projets
export function getLatestDate(projectDates) {
  return projectDates.reduce((latest, current) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (current.end.getDate() === new Date().getDate()) {
      current.end = tomorrow;
    }

    return current.end > latest ? current.end : latest;
  }, projectDates[0].end);
}

// Sauvegarder les filtres dans le localStorage
export function saveFiltersState(Compvalue, startDate, endDate, checkType) {
  saveToLocalStorage("filter_competences", Compvalue);
  saveToLocalStorage("filter_startDate", startDate);
  saveToLocalStorage("filter_endDate", endDate);
  saveToLocalStorage("filter_checkType", checkType);
}

// Récupérer les filtres depuis le localStorage
export function restoreFiltersState(Compvalue, startDate, endDate, checkType) {
  Compvalue.value = restoreFromLocalStorage("filter_competences", []);
  startDate.value = restoreFromLocalStorage("filter_startDate", null);
  endDate.value = restoreFromLocalStorage("filter_endDate", null);
  checkType.value = restoreFromLocalStorage("filter_checkType", []);
}

// Appliquer les classes CSS en fonction de l'état du filtre
export function applyFilterStateClasses(filters, iconFilter, filterState) {
  const filterClass =
    filterState === "activated" ? "filterActivated" : "filterDeactivated";
  const antiFilterClass =
    filterState !== "activated" ? "filterActivated" : "filterDeactivated";

  filters.classList.add(filterClass);
  filters.classList.remove(antiFilterClass);
  iconFilter.classList.add(
    filterState === "activated" ? "pi-angle-double-down" : "pi-angle-down",
  );
  iconFilter.classList.remove(
    filterState === "activated" ? "pi-angle-down" : "pi-angle-double-down",
  );
}
