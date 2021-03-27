/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    const trashschedule = config.trashschedule;
    const skipHour = config.skipHour;

    let currentDay; // current day 1 - 31
    let currentMonth; // current month 0 - 11
    let currentYear; // current year yyyy
    let currentHour; // current hour hh
    let currentMinute; // current minute mm

    // refresh time vars
    function setCurrentDate() {
      const date = new Date();
      currentDay = date.getDate();
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
      currentHour = date.getHours();
      currentMinute = date.getMinutes();
    }

    // sort trashschedule array by yyyy, mm, dd
    function sortTrashschedule() {
      trashschedule.sort((a, b) => {
        if (new Date(a.year, a.month, a.day) > new Date(b.year, b.month, b.day)) {
          return -1;
        }
        if (new Date(a.year, a.month, a.day) < new Date(b.year, b.month, b.day)) {
          return 1;
        }
        return 0;
      });
    }

    // send next three trashschedule events related to current date
    function sendNextThreeTrashEvents() {
      sortTrashschedule();
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleElement = trashschedule[index];
        const trashscheduleYear = trashscheduleElement.year;
        const trashscheduleMonth = trashscheduleElement.month - 1;
        const trashscheduleDay = trashscheduleElement.day;
        if (trashscheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          if (currentHour < skipHour) {
            trashscheduleElement.daysleft = 0;
            node.send({ payload: trashscheduleElement });
            trashschedule[index - 1].daysLeft = Math.round((new Date(
              trashschedule[index - 1].year,
              trashschedule[index - 1].month - 1,
              trashschedule[index - 1].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 1] });
            trashschedule[index - 2].daysLeft = Math.round((new Date(
              trashschedule[index - 2].year,
              trashschedule[index - 2].month - 1,
              trashschedule[index - 2].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 2] });
            break;
          } else {
            trashschedule[index - 1].daysleft = Math.round((new Date(
              trashschedule[index - 1].year,
              trashschedule[index - 1].month - 1,
              trashschedule[index - 1].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 1] });
            trashschedule[index - 2].daysleft = Math.round((new Date(
              trashschedule[index - 2].year,
              trashschedule[index - 2].month - 1,
              trashschedule[index - 2].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 2] });
            trashschedule[index - 3].daysleft = Math.round((new Date(
              trashschedule[index - 3].year,
              trashschedule[index - 3].month - 1,
              trashschedule[index - 3].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 3] });
            break;
          }
        }
      }
    }

    // check wether today is trashschedule event
    function checkTrashschedule() {
      sortTrashschedule();
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleElement = trashschedule[index];
        const trashscheduleYear = trashscheduleElement.year;
        const trashscheduleMonth = trashscheduleElement.month - 1;
        const trashscheduleDay = trashscheduleElement.day;
        if (trashscheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          if (currentHour < skipHour) {
            trashscheduleElement.daysleft = 0;
            node.send({ payload: trashscheduleElement });
            break;
          } else {
            trashschedule[index - 1].daysleft = Math.round((new Date(
              trashschedule[index - 1].year,
              trashschedule[index - 1].month - 1,
              trashschedule[index - 1].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            node.send({ payload: trashschedule[index - 1] });
            break;
          }
        }
      }
    }

    // set interval to update time and send trashschedule event at 00:01 o'clock
    const dailyInterval = setInterval(() => {
      setCurrentDate();
      if (currentHour === 0 && currentMinute === 1) {
        checkTrashschedule();
      }
    });

    // listen to node's input
    this.on('input', (msg) => {
      const payload = msg.payload;
      switch (payload) {
        case 'checkTrashschedule':
          checkTrashschedule();
          break;
        case 'checkNextThree':
          sendNextThreeTrashEvents();
          break;
        default:
          break;
      }
    });

    // listen wether node has been closed
    this.on('close', () => {
      clearInterval(dailyInterval);
    });
  }
  RED.nodes.registerType('trashschedule', trashschedule);
};
