const { roles } = require('../../config.json');

module.exports = {
    name: 'hírlevél',
    description: 'Fel/leiratkozhatsz vele a hírlevélre.',
    category: 'Fő',
    aliases: ['hl'],
    execute(bot, msg) {
        if (msg.member.roles.cache.find(r => r.id === roles.hírlevél)) {
            msg.member.roles.remove(roles.hírlevél);
            msg.channel.send('Sikeresen leiratkoztál a Hírlevélről!');
        }
        else {
            msg.member.roles.add(roles.hírlevél);
            msg.channel.send('Sikeresen feliratkoztál a Hírlevélre!');
        }
    }
};