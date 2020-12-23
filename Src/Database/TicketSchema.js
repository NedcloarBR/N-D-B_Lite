const { Schema, model } = require('mongoose');

const TicketConfig = new Schema({
    GuildName: String,
    GuildId: String,
    UserId: String,
    ChannelId: String,
    MessageId: String
});

module.exports = model('TicketConfig', TicketConfig);