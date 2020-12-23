const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const TicketSchema = require('../../Database/TicketSchema');
const GuildSchema = require('../../Database/GuildSchema');

const CreateTicket = require('../../Tickets/CreateGeneralTicket');

module.exports = class CloseTicketCommand extends BaseCommand {
  constructor() {
    super('closeticket', 'Tickets', ['fecharticket']);
  }

  async run(client, message, args) {
    const TicketDoc = await TicketSchema.findOne({ ChannelId: message.channel.id });

    if(!TicketDoc) {
        message.reply('Você só pode usar esse comando no seu chat de ticket ou você mão possui um Ticket aberto');
    } else {
        message.channel.delete();

        await TicketDoc.deleteOne();
    }
    
  }
}
