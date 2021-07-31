const { roles, channels } = require('../../config.json');

module.exports = {
    name: 'regisztráció',
    description: 'Ezzel a paranccsal igazolhatod, hogy nem vagy bot.',
    category: 'Fő',
    execute(bot, msg) {
        if (msg.channel.id !== channels.registration) return;
        msg.member.roles.remove(roles.igazolatlan);
        msg.delete();
    }
};