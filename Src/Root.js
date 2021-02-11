require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./Utils/RegistryEvents');
const Registry = require("./Utils/RegistryCommands");
const client = new Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });

(async () => {

  // client.commands = new Map();
  // client.events = new Map();

  client.commands = new Collection();
  client.events = new Collection();
  client.aliases = new Collection();

  client.snipe = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  // await registerCommands(client, '../Commands');
  await registerEvents(client, '../Events');
  client.Registry = new Registry(client)
  await client.Registry.loadCommands();

  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

