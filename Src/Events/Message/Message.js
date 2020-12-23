const BaseEvent = require('../../Utils/Structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }

    // if(message.id === "791118086853754940") {
    //   const ThreeDSEmoji = "<:Nintendo3DS:791055796280098817>";
    //   const SwitchEmoji = "<:Switch:791318848267223041>";
    //   const PSPEmoji = "<:PSP:791053360941105167>";
    //   const PSVITAEmoji = "<:PSVITA:791046581037432862>";

    //   const embed = new Discord.MessageEmbed()
    //     .setAuthor(client.user.tag, client.user.displayAvatarURL())
    //     .setTitle("Sistema de Suporte via Ticket")
    //     .setColor("#00c26f")
    //     .setDescription([
    //         `Reaja com ${ThreeDSEmoji} para obter suporte com o console 3DS`,
    //         `Reaja com ${SwitchEmoji} para obter suporte com o console Switch`,
    //         `Reaja com ${PSPEmoji} para obter suporte com o console PSP`,
    //         `Reaja com ${PSVITAEmoji} para obter suporte com o console PSVITA`
    //     ])
    //     .setFooter(message.guild.name, message.guild.iconURL())
    //     .setTimestamp()
    //   const msgEdit = await message.edit(embed);

    //   msgEdit.react(`${ThreeDSEmoji}`);
    //   msgEdit.react(`${SwitchEmoji}`);
    //   msgEdit.react(`${PSPEmoji}`);
    //   msgEdit.react(`${PSVITAEmoji}`);
    // }
  }
}