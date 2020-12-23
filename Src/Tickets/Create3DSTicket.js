const Discord = require("discord.js")

module.exports = async(guild, user, GuildDoc, TicketSchema) => {
  GuildDoc.TicketCount += 1

  await GuildDoc.save()

  const TrashEmoji = "<a:RainbowBlobTrash:791087630863302696>";

  const ajudantes = [
    "747996827051360327", // Ajudante
    "744761496080351262", // Helper
    "747996850279284736," // Sênior
  ];

  const TicketChannel3DS = await guild.channels.create(`Ticket-${GuildDoc.TicketCount}-${user.username}-3DS`, {
    type: 'text',
    permissionOverwrites: [
      {
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        id: user.id
      },
      { // Ajudante
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        id: '747996827051360327'
      },
      { // Helper
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        id: '744761496080351262'
      },
      {
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        id: '747996850279284736'
      },
      {
        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        id: guild.id
      }
    ]
  });

  const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("Sistem de Suporte via Ticket")
    .setColor("#00c26f")
    .setDescription([
        `Reaja com ${TrashEmoji} para fechar o Ticket!`,
        `Reaja com 📰 para fazer a Transcrição do Ticket!`
    ])
    .setFooter(guild.name, guild.iconURL())
    .setTimestamp();
  //const msg = await TicketChannel3DS.send(`Reaja com ${TrashEmoji} para fechar o Ticket!`);
  const msg = await TicketChannel3DS.send(embed);
  msg.react(`${TrashEmoji}`);
  await msg.react("📰");

  const TickDoc = new TicketSchema({
    GuildName: guild.name,
    GuildId: guild.id,
    UserId: user.id,
    ChannelId: TicketChannel3DS.id,
    MessageId: msg.id
  })

  await TickDoc.save()
}