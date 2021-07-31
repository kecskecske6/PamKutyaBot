const { MessageEmbed } = require('discord.js');
const { findmember } = require('../../functions');

module.exports = {
    name: 'avatar',
    description: 'Megmutatja egy felhasználó avatarját.',
    category: 'Fő',
    usage: '[felhasználó]',
    execute(bot, msg, args) {
        let member = msg.member;
        if (args[0]) member = findmember(args[0], msg);
        if (!member) return msg.channel.send(':negative_squared_cross_mark: Nem találtam meg a megadott felhasználót!');
        const embed = new MessageEmbed()
            .setTitle(`${member.displayName} avatarja`)
            .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: 'true', size: 1024 }));
        msg.channel.send(embed);
    }
};