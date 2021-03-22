module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    let context = this.context();
    let node = this;

    this.on('input', function (msg) {
      let payload = msg.payload;
      switch (payload) {
        case "all":
          sendAll(); // outputs all holidays
          break;
        case "isTodayHoliday":
          isTodayHoliday(); // outputs boolean wether today is holiday
          break;
        case "nextHoliday":
          sendNextHoliday(); // outputs next holiday
          break;
        case "nextThreeHolidays":
          sendNextThreeHolidays(); // outputs next 3 holidays
          break;
        case "isChristmasTime":
          isChristmasTime(); // outputs wether today is Christmas time
          break;
        case "daysUntilNextHoliday": // outputs days until next holiday
          daysUntilNextHoliday();
          break;
        case "123":
          node.send({ payload: ownHolidays });
          break;
      }
    });

    this.on('close', function () {
      if (interval) {
        clearInterval(dailyInterval);
      }
    });
  }
  RED.nodes.registerType("trashschedule", trashschedule);
};