const validateEvent = require('../src/validateEvent');
const sortTrashschedule = require('../src/sortTrashschedule');

test('validate Trashschedule event', () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  expect(validateEvent({ name: 'Restmüll', day: day + 1, month: month, year: year }, year, month, day)).toBe(true);
  expect(validateEvent({ name: 'Restmüll', day: day - 1, month: month, year: year }, year, month, day)).toBe(false);
});

test('sort Trashschedule event array', () => {
  const trashschedule = [
    { name: 'Restmüll', day: 25, month: 8, year: 2021 },
    { name: 'Papier', day: 2, month: 2, year: 2021 },
    { name: 'Biotonne', day: 5, month: 9, year: 2021 },
    { name: 'Restmüll', day: 23, month: 3, year: 2021 },
    { name: 'Papier', day: 5, month: 7, year: 2021 },
    { name: 'Biotonne', day: 8, month: 12, year: 2021 },
    { name: 'Papier', day: 16, month: 1, year: 2021 },
  ];
  const trashscheduleSorted = [
    { name: 'Papier', day: 16, month: 1, year: 2021 },
    { name: 'Papier', day: 2, month: 2, year: 2021 },
    { name: 'Restmüll', day: 23, month: 3, year: 2021 },
    { name: 'Papier', day: 5, month: 7, year: 2021 },
    { name: 'Restmüll', day: 25, month: 8, year: 2021 },
    { name: 'Biotonne', day: 5, month: 9, year: 2021 },
    { name: 'Biotonne', day: 8, month: 12, year: 2021 },
  ];

  expect(sortTrashschedule(trashschedule)).toStrictEqual(trashscheduleSorted);
});
