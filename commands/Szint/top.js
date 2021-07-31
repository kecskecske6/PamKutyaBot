const users = require('../../assets/users.json');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = {
    name: 'top',
    description: 'Megmutatja a TP-ranglistát.',
    category: 'Szint',
    aliases: ['toplista', 'leaderboard', 'lb'],
    execute(bot, msg) {
        const embed = new MessageEmbed()
            .setTitle(`${msg.guild.name} ranglistája`)
            .setThumbnail(msg.guild.iconURL({ format: 'png', dynamic: true }))
            .setColor(colour)
            .setTimestamp();
        const sortedUsers = [];
        Object.keys(users).forEach(key => {
            if (users[key].xp > 0) sortedUsers.push({ key: key, value: users[key] });
        });
        sortedUsers.sort((first, second) => (second.value.xp - first.value.xp));
        const fieldHolder = [];
        for (let i = 0; i < sortedUsers.length; i++) {
            let final = 0;
            for (let j = 0; j <= sortedUsers[i].value.level; j++) final += Math.round(50 * Math.pow(1.1, i));
            fieldHolder.push({
                name: `${i + 1}. **${msg.guild.members.cache.find(x => x.id === sortedUsers[i].key).user.tag}**`,
                value: `Szint: \`${sortedUsers[i].value.level}\`\nXP: \`${sortedUsers[i].value.xp}/${final}\``
            });
        }
        msg.channel.send(embed)
            .then(message => {
                message.react('⬅️');
                message.react('➡️');
                sortFields(0, embed, sortedUsers, msg, message, 10);
            });
    }
};