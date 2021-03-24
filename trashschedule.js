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

    function checkTrashschedule() {
      let result;
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleObject = trashschedule[index];
        const trashscheduleName = trashscheduleObject.name;
        const trashscheduleDay = trashscheduleObject.day;
        const trashscheduleMonth = trashscheduleObject.month;
        const trashScheduleYear = trashscheduleObject.year;

        if (trashScheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          result = trashscheduleName;
          break;
        } else {
          result = false;
        }
      }
      node.send({ payload: result });
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
