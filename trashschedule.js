/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
module.exports = function (RED) {
  function trashschedule(config) {
    RED.nodes.createNode(this, config);
    // const context = this.context();
    const node = this;

    const csvString = config.csvString;
    // eslint-disable-next-line no-unused-vars
    const trashschedule = config.trashschedule;

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
