module.exports = {
    name: 'reload',
    description: 'Újratölt egy parancsot.',
    category: 'Dev',
    usage: '<parancs>',
    execute(bot, msg, args) {
        if (!args.length) return;
        const commandName = args[0].toLowerCase();
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];
        try {
            const newCommand = require(`../${command.category}/${command.name}.js`);
            bot.commands.set(newCommand.name, newCommand);
            msg.channel.send(`A következő parancs sikeresen újratöltve: \`${newCommand.name}\``);
        } catch (error) {
            console.log(error);
            msg.channel.send(`Hiba történt a parancs újratöltése közben:\`\`\`js${error.message}\`\`\``);
        }
    }
};