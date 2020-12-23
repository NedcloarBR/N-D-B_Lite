const BaseEvent = require('../../Utils/Structures/BaseEvent');
const mongo = require("../../Utils/MongoDB");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    const Status = require("../../Tools/Status");
    function setStatus() {
      const AStatus = Status[Math.floor(Math.random() * Status.length)];
      client.user.setPresence({ activity: AStatus });
    }
    setStatus();
    setInterval(() => setStatus(), 5000);

    await mongo().then(async (mongoose) => {

    })
  }
}