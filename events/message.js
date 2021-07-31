const config = require('../config.json');
const { commands, addXP, getDate } = require('../functions');

module.exports = (bot, msg) => {
    if (msg.channel.id === config.channels.registration && !msg.content.startsWith(config.prefix)) msg.delete();
    if (msg.mentions.has(bot.user) && (msg.channel.id === config.channels.bot.normal || msg.channel.id === config.channels.bot.test)) msg.channel.send(commands());
    if (msg.author.bot) return;
    if (bot.user.id === config.botid && !msg.content.startsWith(config.prefix)) return addXP(msg);
    if (bot.user.id === config.devid && !msg.content.startsWith(config.devprefix)) return;
    if (msg.channel.id !== config.channels.bot.normal && msg.channel.id !== config.channels.bot.test && msg.channel.id !== config.channels.registration) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const cmdname = args.shift().toLowerCase();
    const command = bot.commands.get(cmdname) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdname));
    if (!command) return;
    try {
        command.execute(bot, msg, args);
        console.log(`[${getDate()}] ${command.name} parancs futtatva.`);
    } catch (error) {
        console.error(error);
    }
};