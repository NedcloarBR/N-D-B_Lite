// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../../Utils/Structures/BaseEvent');
const Discord = require('discord.js');
const GuildSchema = require('../../Database/GuildSchema');
const TicketSchema = require("../../Database/TicketSchema");
const fetchAll = require('discord-fetch-all');
const fs = require('fs');

module.exports = class TicketMessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    if(reaction.message.partial) await reaction.message.fetch()
    if(reaction.partial) await reaction.message.fetch()
    if(user.bot) return

    const guild = reaction.message.guild

    const Create3DSTicket = require("../../Tickets/Create3DSTicket");
    const CreatePSPTicket = require("../../Tickets/CreatePSPTicket");
    const CreatePSVITATicket = require("../../Tickets/CreatePSVITATicket");
    
    var GuildDoc = await GuildSchema.findOne({ GuildId: guild.id })

    if(!GuildDoc) {
      GuildDoc = new GuildSchema({
        GuildName: guild.name,
        GuildId: guild.id,
        TicketCount: 0
      });

      await GuildDoc.save()
    } 

    if(reaction.message.channel.id === '791044707782098953') {
      if(reaction.emoji.id === '791055796280098817') { //! 3DS
        const TicketDoc = await TicketSchema.findOne({ GuildId: guild.id, UserId: user.id})

        if(TicketDoc) {
          const Channel = guild.channels.cache.get(TicketDoc.ChannelId)

          if(Channel) {
            user.send("Você já possui um Ticket Aberto!");
          } else {
            await TicketDoc.deleteOne()

            Create3DSTicket(guild, user, GuildDoc, TicketSchema)
          }
        } else {
          Create3DSTicket(guild, user, GuildDoc, TicketSchema)
        }
        // Create3DSTicket(guild, user, GuildDoc)
      }
      if(reaction.emoji.id === '791053360941105167') { //! PSP
        const TicketDoc = await TicketSchema.findOne({ GuildId: guild.id, UserId: user.id})

        if(TicketDoc) {
          const Channel = guild.channels.cache.get(TicketDoc.ChannelId)

          if(Channel) {
            user.send("Você já possui um Ticket Aberto!");
          } else {
            await TicketDoc.deleteOne()

            CreatePSPTicket(guild, user, GuildDoc, TicketSchema)
          }
        } else {
          CreatePSPTicket(guild, user, GuildDoc, TicketSchema)
        }
        // CreatePSPTicket(guild, user, GuildDoc)
      }
      if(reaction.emoji.id === '791046581037432862') { //! PSVITA
        const TicketDoc = await TicketSchema.findOne({ GuildId: guild.id, UserId: user.id})

        if(TicketDoc) {
          const Channel = guild.channels.cache.get(TicketDoc.ChannelId)

          if(Channel) {
            user.send("Você já possui um Ticket Aberto!");
          } else {
            await TicketDoc.deleteOne()

            CreatePSVITATicket(guild, user, GuildDoc, TicketSchema)
          }
        } else {
          CreatePSVITATicket(guild, user, GuildDoc, TicketSchema)
        }
        // CreatePSVITATicket(guild, user, GuildDoc)
      } 
    } else { //! Fechar Ticket
      const TicketDoc = await TicketSchema.findOne({ GuildId: guild.id, UserId: user.id})

      if(TicketDoc.MessageId === reaction.message.id) {
        if(reaction.emoji.id === '791087630863302696') {
          reaction.message.channel.delete()

          await TicketDoc.deleteOne()
          user.send(`Ticket Fechado!`).catch(err => console.log("Ticket Error: " + err))
        } else if(reaction.emoji.name === '📰') {
          const msgs = await fetchAll.messages(reaction.message.channel, {
            reverseArray: true
          });

          const content = msgs.map(m => `${m.author.tag} - ${m.content}`);

          fs.writeFileSync('transcript.txt', content.join('\n'), error => {
            if(error) throw error
          });
          reaction.message.channel.send(new Discord.MessageAttachment('transcript.txt', 'transcript.txt'))
        }
      }
    }
  }
}