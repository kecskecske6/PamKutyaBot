const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const users = require('../assets/users.json');
const file = require('fs');

module.exports = (bot, member) => {
    member.roles.add(config.roles.igazolatlan);
    const embed = new MessageEmbed()
        .setTitle('Új tag')
        .setDescription(`<@${member.id}>`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }));
    users[member.id] = {
        xp: 0,
        level: 0,
        collected: false,
        pamkurrency: 0,
        streak: 1
    };
    member.guild.channels.cache.find(c => c.id === config.channels.log.normal).send(embed);
    file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
};