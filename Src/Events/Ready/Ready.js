const BaseEvent = require('../../Utils/Structures/BaseEvent');
const mongo = require("../../Utils/MongoDB");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    await mongo().then(async (mongoose) => {

    })
  }
}