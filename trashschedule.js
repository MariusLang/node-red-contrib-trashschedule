/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line func-names

const validateEvent = require('./src/validateEvent');
const sortTrashschedule = require('./src/sortTrashschedule');

// eslint-disable-next-line func-names
module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    let trashschedule = config.trashschedule;
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

    // calculate daysLeft
    function calcDaysLeft(trashscheduleElement) {
      const daysLeft = Math.round((new Date(
        trashscheduleElement.year,
        trashscheduleElement.month - 1,
        trashscheduleElement.day,
      ).valueOf() - new Date(
        currentYear,
        currentMonth,
        currentDay,
      ).valueOf()) / 86400000);
      return daysLeft;
    }

    // send all trashschedule events related to current date
    function sendAllEvents() {
      // sort trashschedule array by yyyy, mm, dd
      trashschedule = sortTrashschedule(trashschedule);

      node.send([null, null, { payload: trashschedule }]);
    }

    // send next three trashschedule events related to current date
    function sendNextThreeTrashEvents() {
      // sort trashschedule array by yyyy, mm, dd
      trashschedule = sortTrashschedule(trashschedule);

      // outputArr bundles the 3 events
      const outputArr = [];

      // check wether trashschedule array contains trashschedule events
      if (trashschedule.length > 0) {
        for (let index = 0; index < trashschedule.length; index += 1) {
          const trashscheduleElement = trashschedule[index];
          const trashscheduleYear = trashscheduleElement.year;
          const trashscheduleMonth = trashscheduleElement.month - 1;
          const trashscheduleDay = trashscheduleElement.day;
          if (new Date(
            trashscheduleYear,
            trashscheduleMonth,
            trashscheduleDay,
          ).valueOf() - new Date(
            currentYear,
            currentMonth,
            currentDay,
          ).valueOf() >= 0) {
            if (trashscheduleYear === currentYear
              && trashscheduleMonth === currentMonth
              && trashscheduleDay === currentDay) {
              if (currentHour < skipHour) {
                // first event
                if (validateEvent(trashscheduleElement)) {
                  // set days left
                  trashscheduleElement.daysLeft = 0;

                  outputArr[0] = trashscheduleElement;
                } else {
                  outputArr[0] = 'Trashschedule events outdated';
                }

                // second event
                if (validateEvent(trashschedule[index + 1])) {
                  // calculate days left
                  trashschedule[index + 1].daysLeft = calcDaysLeft(trashschedule[index + 1]);

                  outputArr[1] = trashschedule[index + 1];
                } else {
                  outputArr[1] = 'Trashschedule events outdated';
                }

                // third event
                if (validateEvent(trashschedule[index + 2])) {
                  // calculate days left
                  trashschedule[index + 2].daysLeft = calcDaysLeft(trashschedule[index + 2]);

                  outputArr[2] = trashschedule[index + 2];
                } else {
                  outputArr[2] = 'Trashschedule events outdated';
                }

                break;
              } else {
                // first event
                if (validateEvent(trashschedule[index + 1])) {
                  // calculate days left
                  trashschedule[index + 1].daysLeft = calcDaysLeft(trashschedule[index + 1]);

                  outputArr[0] = trashschedule[index + 1];
                } else {
                  outputArr[0] = 'Trashschedule events outdated';
                }

                // second event
                if (validateEvent(trashschedule[index + 2])) {
                  // calculate days left
                  trashschedule[index + 2].daysLeft = calcDaysLeft(trashschedule[index + 2]);

                  outputArr[1] = trashschedule[index + 2];
                } else {
                  outputArr[1] = 'Trashschedule events outdated';
                }

                // third event
                if (validateEvent(trashschedule[index + 3])) {
                  // calculate days left
                  trashschedule[index + 3].daysLeft = calcDaysLeft(trashschedule[index + 3]);

                  outputArr[2] = trashschedule[index + 3];
                } else {
                  outputArr[2] = 'Trashschedule events outdated';
                }

                break;
              }
            } else {
              // first event
              if (validateEvent(trashscheduleElement)) {
                // calculate days left
                trashscheduleElement.daysLeft = calcDaysLeft(trashscheduleElement);

                outputArr[0] = trashscheduleElement;
              } else {
                outputArr[0] = 'Trashschedule events outdated';
              }

              // second event
              if (validateEvent(trashschedule[index + 1])) {
                // calculate days left
                trashschedule[index + 1].daysLeft = calcDaysLeft(trashschedule[index + 1]);

                outputArr[1] = trashschedule[index + 1];
              } else {
                outputArr[1] = 'Trashschedule events outdated';
              }

              // third event
              if (validateEvent(trashschedule[index + 2])) {
                // calculate days left
                trashschedule[index + 2].daysLeft = calcDaysLeft(trashschedule[index + 2]);

                outputArr[2] = trashschedule[index + 2];
              } else {
                outputArr[2] = 'Trashschedule events outdated';
              }

              break;
            }
          }
        }
      } else {
        // trashschedule array is empty
        outputArr[0] = 'Trashschedule events outdated';
        outputArr[1] = 'Trashschedule events outdated';
        outputArr[2] = 'Trashschedule events outdated';
      }
      node.send([null, { payload: outputArr }, null]);
    }

    // check wether today is trashschedule event
    function checkTrashschedule() {
      // sort trashschedule array by yyyy, mm, dd
      trashschedule = sortTrashschedule(trashschedule);

      // check wether trashschedule array contains trashschedule events
      if (trashschedule.length > 0) {
        for (let index = 0; index < trashschedule.length; index += 1) {
          const trashscheduleElement = trashschedule[index];
          const trashscheduleYear = trashscheduleElement.year;
          const trashscheduleMonth = trashscheduleElement.month - 1;
          const trashscheduleDay = trashscheduleElement.day;
          // search for latest trashschedule event in trashschedule array
          if (new Date(
            trashscheduleYear,
            trashscheduleMonth,
            trashscheduleDay,
          ).valueOf() - new Date(
            currentYear,
            currentMonth,
            currentDay,
          ).valueOf() >= 0) {
            // check wether trashschedule event is today
            if (trashscheduleYear === currentYear
              && trashscheduleMonth === currentMonth
              && trashscheduleDay === currentDay) {
              // check wether skiphour is already over
              if (currentHour < skipHour) {
                // validate trashschedule event
                if (validateEvent(trashscheduleElement)) {
                  // set days left
                  trashscheduleElement.daysLeft = 0;

                  node.send([{ payload: trashscheduleElement }, null, null]);
                } else {
                  node.send([{ payload: 'Trashschedule events outdated' }, null, null]);
                }

                break;
              } else {
                if (validateEvent(trashschedule[index + 1])) {
                  // calculate days left
                  trashschedule[index + 1].daysLeft = calcDaysLeft(trashschedule[index + 1]);

                  node.send([{ payload: trashschedule[index + 1] }, null, null]);
                } else {
                  node.send([{ payload: 'Trashschedule events outdated' }, null, null]);
                }

                break;
              }
            } else {
              if (validateEvent(trashscheduleElement)) {
                // calculate days left
                trashscheduleElement.daysLeft = calcDaysLeft(trashscheduleElement);

                node.send([{ payload: trashscheduleElement }, null, null]);
              } else {
                node.send([{ payload: 'Trashschedule events outdated' }, null, null]);
              }

              break;
            }
          }
        }
      } else {
        // trashschedule array is empty
        node.send([{ payload: 'Trashschedule events outdated' }, null, null]);
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
        case 'all':
          sendAllEvents();
          break;
        default:
          checkTrashschedule();
          sendNextThreeTrashEvents();
          sendAllEvents();
          break;
      }
    });

    const dailyInterval = setInterval(() => {
      setCurrentDate();
      if (currentMinute === 0) {
        checkTrashschedule();
        sendNextThreeTrashEvents();
        sendAllEvents();
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
