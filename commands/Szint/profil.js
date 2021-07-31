const users = require('../../assets/users.json');
const file = require('fs');

module.exports = {
    name: 'profil',
    description: 'Megváltoztatja a profilod színét.',
    category: 'Szint',
    usage: '[hexadecimális szín]',
    aliases: ['profile', 'colour'],
    execute(bot, msg, args) {
        if (!args.length) return msg.channel.send('Nem adtál meg színt!');
        let colour = args[0].toLowerCase();
        if (colour.length == 3) colour = `${colour[0]}${colour[0]}${colour[1]}${colour[1]}${colour[2]}${colour[2]}`;
        else if (colour.length != 6) colour.padStart(6, '0');
        for (let i = 0; i < colour.length; i++) if (!'0123456789abcdef'.includes(colour.charAt(i))) return msg.channel.send('Nem megfelelő formátumú színt adtál meg!');
        users[msg.member.id].colour = colour;
        msg.channel.send('Sikeresen megváltoztattad a profilod színét!');
        file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
    }
};