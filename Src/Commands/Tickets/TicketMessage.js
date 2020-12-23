const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class TicketMessageCommand extends BaseCommand {
  constructor() {
    super('ticketmessage', 'Tickets', ['ticketmsg', 'tickethere', 'ticketaqui']);
  }

  async run(client, message, args) {
    const ThreeDSEmoji = "<:Nintendo3DS:791055796280098817>";
    const PSPEmoji = "<:PSP:791053360941105167>";
    const PSVITAEmoji = "<:PSVITA:791046581037432862>";

    const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle("Sistem de Suporte via Ticket")
        .setColor("#00c26f")
        .setDescription([
            `Reaja com ${ThreeDSEmoji} para obter suporte com o console 3DS`,
            `Reaja com ${PSPEmoji} para obter suporte com o console PSP`,
            `Reaja com ${PSVITAEmoji} para obter suporte com o console PSVITA`
        ])
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
    const msg = await message.channel.send(embed)

    msg.react(`${ThreeDSEmoji}`);
    msg.react(`${PSPEmoji}`);
    msg.react(`${PSVITAEmoji}`);
  }
}