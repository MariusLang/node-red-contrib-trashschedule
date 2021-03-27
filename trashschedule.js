/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line func-names
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

    // validate trashschedule array wether selected dates are outdated
    function validateTrashschedule() {
      sortTrashschedule();
      let result;
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleElement = trashschedule[index];
        const trashscheduleYear = trashscheduleElement.year;
        const trashscheduleMonth = trashscheduleElement.month - 1;
        const trashscheduleDay = trashscheduleElement.day;
        // trashscheduleElement >= 0 --> event valid
        // trashscheduleElement < 0 --> event not valid
        if (new Date(
          trashscheduleYear,
          trashscheduleMonth,
          trashscheduleDay,
        ).valueOf() - new Date(
          currentYear,
          currentMonth,
          currentDay,
        ).valueOf() >= 0) {
          result = true;
          break;
        } else {
          result = false;
        }
      }
      return result;
    }

    // send next three trashschedule events related to current date
    function sendNextThreeTrashEvents() {
      // check wether trashschedule events are valid
      const validation = validateTrashschedule();
      if (!validation) {
        node.send({ payload: 'trashschedule events are outdated' });
        return;
      }

      // outputArr bundles the 3 events
      const outputArr = [];
      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleElement = trashschedule[index];
        const trashscheduleYear = trashscheduleElement.year;
        const trashscheduleMonth = trashscheduleElement.month - 1;
        const trashscheduleDay = trashscheduleElement.day;
        // detect first event
        // check wether event is today
        if (trashscheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          // check wether skipHour is already over
          if (currentHour < skipHour) {
            // first event
            // set daysLeft
            trashscheduleElement.daysleft = 0;
            // add event to outputArr
            outputArr[0] = trashscheduleElement;

            // second event
            // calculate daysLeft
            trashschedule[index - 1].daysLeft = Math.round((new Date(
              trashschedule[index - 1].year,
              trashschedule[index - 1].month - 1,
              trashschedule[index - 1].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            // add event to outputArr
            outputArr[1] = trashschedule[index - 1];

            // third event
            // calculate daysLeft
            trashschedule[index - 2].daysLeft = Math.round((new Date(
              trashschedule[index - 2].year,
              trashschedule[index - 2].month - 1,
              trashschedule[index - 2].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            // add event to outputArr
            outputArr[2] = trashschedule[index - 2];

            break;
          } else {
            // first event
            // calculate daysLeft
            trashschedule[index - 1].daysleft = Math.round((new Date(
              trashschedule[index - 1].year,
              trashschedule[index - 1].month - 1,
              trashschedule[index - 1].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            // add event to outputArr
            outputArr[0] = trashschedule[index - 1];

            // second event
            // calculate daysLeft
            trashschedule[index - 2].daysleft = Math.round((new Date(
              trashschedule[index - 2].year,
              trashschedule[index - 2].month - 1,
              trashschedule[index - 2].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            // add event to outputArr
            outputArr[1] = trashschedule[index - 2];

            // third event
            // calculate daysLeft
            trashschedule[index - 3].daysleft = Math.round((new Date(
              trashschedule[index - 3].year,
              trashschedule[index - 3].month - 1,
              trashschedule[index - 3].day,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);
            // add event to outputArr
            outputArr[2] = trashschedule[index - 3];

            break;
          }
        }
      }
      node.send({ payload: outputArr });
    }

    // check wether today is trashschedule event
    function checkTrashschedule() {
      // check wether trashschedule events are valid
      const validation = validateTrashschedule();
      if (!validation) {
        node.send({ payload: 'trashschedule events are outdated' });
        return;
      }

      for (let index = 0; index < trashschedule.length; index += 1) {
        const trashscheduleElement = trashschedule[index];
        const trashscheduleYear = trashscheduleElement.year;
        const trashscheduleMonth = trashscheduleElement.month - 1;
        const trashscheduleDay = trashscheduleElement.day;
        // detect event
        // check wether event is today
        if (trashscheduleYear === currentYear
          && trashscheduleMonth === currentMonth
          && trashscheduleDay === currentDay) {
          // check wether skipHour is already over
          if (currentHour < skipHour) {
            // set daysLeft
            trashscheduleElement.daysleft = 0;

            node.send({ payload: trashscheduleElement });
            break;
          } else {
            // calculate daysLeft
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
        case '123':
          validateTrashschedule();
          break;
        default:
          checkTrashschedule();
          break;
      }
    });

    const dailyInterval = setInterval(() => {
      setCurrentDate();
      if (currentHour === 0 && currentMinute === 1) {
        checkTrashschedule();
      }
    }, 60000);

    const setTimeInterval = setInterval(() => {
      setCurrentDate();
    });

    // listen wether node has been closed
    this.on('close', () => {
      clearInterval(dailyInterval);
      clearInterval(setTimeInterval);
    });
  }
  RED.nodes.registerType('trashschedule', trashschedule);
};
