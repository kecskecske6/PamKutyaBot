const { MessageEmbed } = require('discord.js');
const { getDate } = require('../../functions');

module.exports = {
    name: 'roleinfo',
    description: 'Információt nyújt egy adott rangról.',
    category: 'Fő',
    usage: '<rang>',
    aliases: ['rinfo', 'ranginfo'],
    execute(bot, msg, args) {
        args = args.join(' ');
        if (!args) return;
        let roleCount = 0;
        msg.guild.roles.cache.forEach(r => {
            if (r.name !== '@everyone') ++roleCount;
        });
        let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.toLowerCase());
        if (!role) role = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.toLowerCase()) || r.id === args);
        if (role) {
            const embed = new MessageEmbed()
                .setTitle(role.name)
                .addField('ID', role.id, true)
                .addField('Szín', role.hexColor, true)
                .addField('Külön megjelenített?', role.hoist ? 'Igen' : 'Nem', true)
                .addField('Pozíció', roleCount - role.position, true)
                .addField('Megemlíthető?', role.mentionable ? 'Igen' : 'Nem', true)
                .setColor(role.hexColor)
                .setFooter(`Rang létrehozva: ${getDate(role.createdAt)}`);
            msg.channel.send(embed);
        }
        else msg.channel.send(':negative_squared_cross_mark: Nem találtam a megadott rangot!');
    }
};