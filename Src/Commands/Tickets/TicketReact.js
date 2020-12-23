const BaseCommand = require('../../Utils/Structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class TicketReactCommand extends BaseCommand {
  constructor() {
    super('ticketreact', 'Tickets', ['ticketreajir']);
  }

  async run(client, message, args) {
    const ThreeDSEmoji = "<:Nintendo3DS:791055796280098817>";
    const SwitchEmoji = "<:Switch:791318848267223041>";
    const PSPEmoji = "<:PSP:791053360941105167>";
    const PSVITAEmoji = "<:PSVITA:791046581037432862>";
    
    const msg = await message.channel.messages.fetch('791118086853754940');

    msg.react(`${ThreeDSEmoji}`);
    msg.react(`${SwitchEmoji}`);
    msg.react(`${PSPEmoji}`);
    msg.react(`${PSVITAEmoji}`);

    message.delete().catch((O_o) => {});
  }
}