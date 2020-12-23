const BaseCommand = require('../../Utils/Structures/BaseCommand');
const Discord = require('discord.js');
const TicketSchema = require('../../Database/TicketSchema');
const GuildSchema = require('../../Database/GuildSchema');

const CreateGeneralTicket = require('../../Tickets/CreateGeneralTicket');

module.exports = class CreateTicketCommand extends BaseCommand {
  constructor() {
    super('createticket', 'Tickets', []);
  }

  async run(client, message, args) {
    const TicketDoc = await TicketSchema.findOne({ GuildId: message.guild.id, UserId: message.author.id});

    const GuildDoc = await GuildSchema.findOne({ GuildId: message.guild.id, UserId: message.author.id});

    if(TicketDoc) {
        const Channel = message.guild.channels.cache.get(TicketDoc.ChannelId)

        if(Channel) {
            message.reply('Você já possui um Ticket Aberto!')
        } else {
            CreateGeneralTicket(message.guild, message.author, GuildDoc, TicketSchema)
        }
    } else {
        CreateGeneralTicket(message.guild, message.author, GuildDoc, TicketSchema)
    }
  }
}
