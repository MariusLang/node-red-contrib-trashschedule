/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    const trashschedule = config.trashschedule;

    let currentDay;
    let currentMonth;
    let currentYear;
    let currentHour;
    let currentMinute;

    function setCurrentDate() {
      const date = new Date();
      currentDay = date.getDate();
      currentMonth = date.getMonth() + 1;
      currentYear = date.getFullYear();
      currentHour = date.getHours();
      currentMinute = date.getMinutes();
    }

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

    function sendNextTrashEvent() {
      sortTrashschedule();
      for (let index = 0; index < trashschedule.length; index += 1) {
        if (new Date(
          trashschedule[index].year,
          trashschedule[index].month,
          trashschedule[index].day,
        ).valueOf() < new Date(currentYear, currentMonth, currentDay).valueOf()) {
          trashschedule[index - 1].daysleft = (new Date(
            trashschedule[index - 1].year,
            trashschedule[index - 1].month,
            trashschedule[index - 1].day,
          ).valueOf() - new Date(currentYear, currentMonth, currentDay).valueOf()) / 86400000;
          node.send({ payload: trashschedule[index - 1] });
          break;
        }
      }
    }

    function checkTrashschedule() {
      sortTrashschedule();
      let result;
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleObject = trashschedule[index];
        const trashscheduleDay = trashscheduleObject.day;
        const trashscheduleMonth = trashscheduleObject.month;
        const trashScheduleYear = trashscheduleObject.year;

        if (trashScheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          trashscheduleObject.daysleft = 0;
          result = trashscheduleObject;
          break;
        } else {
          result = false;
        }
      }
      if (!result) {
        sendNextTrashEvent();
      } else {
        node.send({ payload: result });
      }
    }

    const dailyInterval = setInterval(() => {
      setCurrentDate();
      if (currentHour === 0 && currentMinute === 1) {
        checkTrashschedule();
      }
    });

    this.on('input', (msg) => {
      const payload = msg.payload;
      switch (payload) {
        case 'checkTrashschedule':
          checkTrashschedule();
          break;
        default:
          break;
      }
    });

    this.on('close', () => {
      clearInterval(dailyInterval);
    });
  }
  RED.nodes.registerType('trashschedule', trashschedule);
};
