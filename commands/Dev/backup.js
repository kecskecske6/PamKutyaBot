const { MessageAttachment } = require('discord.js');
const { getDate } = require('../../functions');
const config = require('../../config.json');

module.exports = {
    name: 'backup',
    description: 'Backupot lehet vele csinálni az adatokról.',
    category: 'Dev',
    execute(bot, msg) {
        if (!msg.member.roles.cache.get(config.roles.botmester)) return msg.channel.send('Nincs jogosultságod ezt a parancsot használni!');
        msg.channel.send(new MessageAttachment('../../assets/users.json', `users-${getDate()}.json`));
    }
};