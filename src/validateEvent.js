function validateEvent(trashscheduleElement) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  if (trashscheduleElement == null) {
    return false;
  }
  if (new Date(
    trashscheduleElement.year,
    trashscheduleElement.month,
    trashscheduleElement.day,
  ).valueOf() - new Date(
    currentYear,
    currentMonth,
    currentDay,
  ).valueOf() < 0) {
    return false;
  }
  return true;
}

module.exports = validateEvent;
