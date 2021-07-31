const { prefix, devprefix, botid, devid } = require('../config.json');
const { getDate } = require('../functions');

module.exports = (bot) => {
    console.log(`[${getDate()}] PamKutyaBot online!`);
    switch (bot.user.id) {
        case botid:
            bot.user.setActivity(`${prefix}parancsok`)
            break;
        case devid:
            bot.user.setActivity(`${devprefix}parancsok`);
            break;
    }
};