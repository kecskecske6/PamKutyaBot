const { commands } = require('../../functions');
const { prefix, colour } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'parancsok',
    description: 'Kilistázza a parancsokat, vagy további információt ad egy adott parancsról',
    category: 'Fő',
    usage: '[parancs]',
    aliases: ['p', 'help', 'segítség'],
    execute(bot, msg, args) {
        if (!args.length) return msg.channel.send(commands());
        const name = args[0].toLowerCase();
        const command = bot.commands.get(name) || bot.commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) return msg.channel.send(commands());
        let usage = `${prefix}${command.name}`;
        if (command.usage) usage += ` ${command.usage}`;
        const embed = new MessageEmbed()
            .setColor(colour)
            .setTimestamp()
            .setTitle(`${prefix}${command.name}`)
            .addField('Használat', `\`${usage}\``)
            .addField('Leírás', `${command.description}`);
        if (command.aliases) embed.addField('Aliasok', `\`${command.aliases.join(', ')}\``);
        msg.channel.send(embed);
    }
};