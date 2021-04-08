function sortTrashschedule(trashschedule) {
  trashschedule.sort((a, b) => {
    if (new Date(a.year, a.month - 1, a.day) > new Date(b.year, b.month - 1, b.day)) {
      return 1;
    }
    if (new Date(a.year, a.month - 1, a.day) < new Date(b.year, b.month - 1, b.day)) {
      return -1;
    }
    return 0;
  });
  return trashschedule;
}

module.exports = sortTrashschedule;
