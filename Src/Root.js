require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./Utils/Registry');
const client = new Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.snipe = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, '../Commands');
  await registerEvents(client, '../Events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

