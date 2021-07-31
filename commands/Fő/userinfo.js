const { MessageEmbed } = require('discord.js');
const { findmember, getDate } = require('../../functions');

module.exports = {
    name: 'userinfo',
    description: 'Információt nyújt egy adott felhasználóról.',
    category: 'Fő',
    usage: '[felhasználó]',
    aliases: ['uinfo', 'whois'],
    execute(bot, msg, args) {
        args = args.join(' ');
        let member = msg.member;
        if (args[0]) member = findmember(args[0], msg);
        if (!member) return msg.channel.send(':negative_squared_cross_mark: Nem találtam meg a megadott felhasználót!');
        const users = msg.guild.members.cache.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).map(user => user.id);
        let position;
        for (let i = 0; i < users.length; i++) if (users[i] == member.user.id) position = i + 1;
        const userRoles = [];
        member.roles.cache.sort((r, r2) => r2.position - r.position).forEach(role => {
            if (role.name !== '@everyone') userRoles.push(role);
        });
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(member)
            .setColor(member.displayHexColor)
            .addField('Csatlakozási hely', position, true)
            .addField('Csatlakozás ideje', getDate(new Date(member.joinedTimestamp)), true)
            .addField('Regisztrálás ideje', getDate(new Date(member.user.createdTimestamp)), true)
            .addField(`Rangok [${userRoles.length}]`, userRoles.join(' '), true)
            .setTimestamp()
            .setFooter(`ID: ${member.user.id}`);
        msg.channel.send(embed);
    }
};