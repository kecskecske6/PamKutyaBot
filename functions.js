const users = require('./assets/users.json');
const file = require('fs');
const { MessageEmbed } = require('discord.js');
const config = require('./config.json');

module.exports = {
    addXP: addXP,
    commands: commands,
    findmember: findmember,
    getDate: getDate
}

function addXP(msg) {
    ++users[msg.author.id].xp;
    file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
    if (users[msg.author.id].xp === Math.round(50 * Math.pow(1.1, users[msg.author.id].level))) {
        ++users[msg.author.id].level;
        file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
        if (users[msg.author.id].level <= 89) {
            if (users[msg.author.id].level > 1) msg.member.roles.remove(msg.guild.roles.cache.find(r => r.name.includes('szint')));
            msg.member.roles.add(msg.guild.roles.cache.find(r => r.name.includes('szint') && r.name.includes('-') && parseInt(r.name.split('-')[0]) >= users[msg.author.id].level && parseInt(r.name.split('-')[1].split('.')[0]) <= users[msg.author.id].level));
        }
        else {
            msg.member.roles.remove(msg.guild.roles.cache.find(r => r.name.includes('szint')));
            msg.member.roles.add(msg.guild.roles.cache.find(r => r.name === '89.+ szint'));
        }
        const embed = new MessageEmbed()
            .setTitle('Szintlépés')
            .setDescription(`Gratulálok, ${msg.member}, szintet léptél. Szinted: ${users[msg.author.id].level}`)
            .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
            .setColor(config.colour);
        msg.guild.channels.cache.find(x => x.id === config.channels.levelup).send(msg.member, embed);
        users[msg.author.id].xp = 0;
        file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
    }
}

function commands() {
    const commandfolders = file.readdirSync('./commands');
    const embed = new MessageEmbed()
        .setColor(config.colour)
        .setTimestamp()
        .setTitle('Parancsok listája')
        .setDescription('További információ egy parancsról: `-parancsok [parancs]`')
        .addField('A szerveren ezeket a jelöléseket használjuk:', '`<argumentum>`: kötelező argumentum\n`[argumentum]`: opcionális argumentum');
    for (const folder of commandfolders) {
        const files = file.readdirSync(`./commands/${folder}`);
        const commands = [];
        for (const file of files) {
            commands.push(file.substring(0, file.indexOf('.js')));
        }
        embed.addField(`**${folder}**`, `\`${commands.sort().join('\`, \`')}\``);
    }
    return embed;
}

function findmember(arg, message) {
    let member;
    if (message.mentions.members.size > 0) member = message.mentions.members.first();
    else if (message.guild.members.cache.find(x => x.user.id == arg)) member = message.guild.members.cache.find(x => x.user.id == arg);
    else if (message.guild.members.cache.find(x => x.user.username.toLowerCase().includes(arg.toLowerCase()))) member = message.guild.members.cache.find(x => x.user.username.toLowerCase().includes(arg.toLowerCase()));
    return member;
}

function getDate(date) {
    if(!date) return new Date().toISOString().slice(0, 10).replace(/-/gi, '.') + ' ' + new Date().toTimeString().slice(0, 8);
    else return date.toISOString().slice(0, 10).replace(/-/gi, '.') + ' ' + date.toISOString().slice(11, 19);
}

function sortFields(startIndex, embed, fieldHolder, msg, message, pageSize) {
    embed.spliceFields(0, pageSize);
    let j = startIndex;
    
}