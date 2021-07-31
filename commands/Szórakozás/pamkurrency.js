const users = require('../../assets/users.json');

module.exports = {
    name: 'pamkurrency',
    description: 'Megmutatja, mennyi PamKurrency-d van.',
    category: 'Szórakozás',
    execute(bot, msg) {
        msg.channel.send(`> __${msg.member.displayName}__: ${users[msg.author.id].pamkurrency} PamKurrency`);
    }
}