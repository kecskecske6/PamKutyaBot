const { roles } = require('../../config.json');

module.exports = {
    name: 'youtube',
    description: 'Fel/leiratkozhatsz vele a YouTube értesítésre.',
    category: 'Fő',
    aliases: ['yt'],
    execute(bot, msg) {
        if (msg.member.roles.cache.find(r => r.id === roles.youtube)) {
            msg.member.roles.remove(roles.youtube);
            msg.channel.send('Sikeresen leiratkoztál a YouTube értesítésről!');
        }
        else {
            msg.member.roles.add(roles.youtube);
            msg.channel.send('Sikeresen feliratkoztál a YouTube értesítésre!');
        }
    }
};