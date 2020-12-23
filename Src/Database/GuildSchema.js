const { Schema, model } = require('mongoose');

const GuildConfig = new Schema({
    GuildName: String,
    GuildId: String,
    TicketCount: Number,
});

module.exports = model('GuildConfig', GuildConfig);