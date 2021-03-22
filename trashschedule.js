/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    // let context = this.context();
    const node = this;

    const csvString = node.csvString;

    this.on('input', (msg) => {
      const payload = msg.payload;
      switch (payload) {
        case '123':
          node.send({ payload: csvString });
          break;
        default:
          break;
      }
    });

    this.on('close', () => {
      /* if (interval) {
        clearInterval(dailyInterval);
      } */
    });
  }
  RED.nodes.registerType('trashschedule', trashschedule);
};
