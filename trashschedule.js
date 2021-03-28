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
          return 1;
        }
        if (new Date(a.year, a.month, a.day) < new Date(b.year, b.month, b.day)) {
          return -1;
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

    // eslint-disable-next-line no-unused-vars
    function validateEvent(trashscheduleElement) {
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

    // send next three trashschedule events related to current date
    function sendNextThreeTrashEvents() {
      // check wether trashschedule events are valid
      const validation = validateTrashschedule();
      if (!validation) {
        node.send({ payload: 'Trashschedule events are outdated' });
        return;
      }

      // outputArr bundles the 3 events
      const outputArr = [];
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
              if (validateEvent(trashscheduleElement)) {
                trashscheduleElement.daysleft = 0;

                outputArr[0] = trashscheduleElement;
              } else {
                outputArr[0] = 'Trashschedule events outdated';
              }

              if (validateEvent(trashschedule[index + 1])) {
                trashschedule[index + 1].daysleft = Math.round((new Date(
                  trashschedule[index + 1].year,
                  trashschedule[index + 1].month,
                  trashschedule[index + 1].day,
                ).valueOf() - new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                ).valueOf()) / 86400000);

                outputArr[1] = trashschedule[index + 1];
              } else {
                outputArr[1] = 'Trashschedule events outdated';
              }

              if (validateEvent(trashschedule[index + 2])) {
                trashschedule[index + 2].daysleft = Math.round((new Date(
                  trashschedule[index + 2].year,
                  trashschedule[index + 2].month,
                  trashschedule[index + 2].day,
                ).valueOf() - new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                ).valueOf()) / 86400000);

                outputArr[2] = trashschedule[index + 2];
              } else {
                outputArr[2] = 'Trashschedule events outdated';
              }

              break;
            } else {
              if (validateEvent(trashschedule[index + 1])) {
                trashschedule[index + 1].daysleft = Math.round((new Date(
                  trashschedule[index + 1].year,
                  trashschedule[index + 1].month - 1,
                  trashschedule[index + 1].day,
                ).valueOf() - new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                ).valueOf()) / 86400000);

                outputArr[0] = trashschedule[index + 1];
              } else {
                outputArr[0] = 'Trashschedule events outdated';
              }

              if (validateEvent(trashschedule[index + 2])) {
                trashschedule[index + 2].daysleft = Math.round((new Date(
                  trashschedule[index + 2].year,
                  trashschedule[index + 2].month - 1,
                  trashschedule[index + 2].day,
                ).valueOf() - new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                ).valueOf()) / 86400000);

                outputArr[1] = trashschedule[index + 2];
              } else {
                outputArr[1] = 'Trashschedule events outdated';
              }

              if (validateEvent(trashschedule[index + 3])) {
                trashschedule[index + 3].daysleft = Math.round((new Date(
                  trashschedule[index + 3].year,
                  trashschedule[index + 3].month - 1,
                  trashschedule[index + 3].day,
                ).valueOf() - new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                ).valueOf()) / 86400000);

                outputArr[2] = trashschedule[index + 3];
              } else {
                outputArr[2] = 'Trashschedule events outdated';
              }

              break;
            }
          } else {
            if (validateEvent(trashscheduleElement)) {
              trashscheduleElement.daysleft = Math.round((new Date(
                trashscheduleYear,
                trashscheduleMonth,
                trashscheduleDay,
              ).valueOf() - new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).valueOf()) / 86400000);

              outputArr[0] = trashscheduleElement;
            } else {
              outputArr[0] = 'Trashschedule events outdated';
            }

            if (validateEvent(trashschedule[index + 1])) {
              trashschedule[index + 1].daysleft = Math.round((new Date(
                trashschedule[index + 1].year,
                trashschedule[index + 1].month,
                trashschedule[index + 1].day,
              ).valueOf() - new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).valueOf()) / 86400000);

              outputArr[1] = trashschedule[index + 1];
            } else {
              outputArr[1] = 'Trashschedule events outdated';
            }

            if (validateEvent(trashschedule[index + 2])) {
              trashschedule[index + 2].daysleft = Math.round((new Date(
                trashschedule[index + 2].year,
                trashschedule[index + 2].month,
                trashschedule[index + 2].day,
              ).valueOf() - new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).valueOf()) / 86400000);

              outputArr[2] = trashschedule[index + 2];
            } else {
              outputArr[2] = 'Trashschedule events outdated';
            }

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
        node.send({ payload: 'Trashschedule events are outdated' });
        return;
      }

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
              trashscheduleElement.daysLeft = 0;
              node.send({ payload: trashscheduleElement });
              break;
            } else if (validateEvent(trashschedule[index + 1])) {
              trashschedule[index + 1].daysleft = Math.round((new Date(
                trashschedule[index + 1].year,
                trashschedule[index + 1].month - 1,
                trashschedule[index + 1].day,
              ).valueOf() - new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).valueOf()) / 86400000);

              node.send({ payload: trashschedule[index + 1] });
              break;
            } else {
              node.send({ payload: 'Trashschedule events outdated' });
            }
          } else {
            trashscheduleElement.daysleft = Math.round((new Date(
              trashscheduleYear,
              trashscheduleMonth,
              trashscheduleDay,
            ).valueOf() - new Date(
              currentYear,
              currentMonth,
              currentDay,
            ).valueOf()) / 86400000);

            node.send({ payload: trashscheduleElement });
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
