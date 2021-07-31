const { roles } = require('../../config.json');

module.exports = {
    name: 'regisztráció',
    description: 'Ezzel a paranccsal igazolhatod, hogy nem vagy bot.',
    category: 'Fő',
    execute(bot, msg) {
        msg.member.roles.remove(roles.igazolatlan);
        msg.delete();
    }
};