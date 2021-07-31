module.exports = {
    name: 'ping',
    description: 'Megpingeli a botot.',
    category: 'Fő',
    execute(bot, msg) {
        msg.channel.send(`Pong! \`${bot.ws.ping}ms\``);
    }
};