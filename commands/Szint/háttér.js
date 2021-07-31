const Canvas = require('canvas');
const file = require('fs');
const { MessageAttachment } = require('discord.js');
const users = require('../../assets/users.json');

module.exports = {
    name: 'háttér',
    description: 'Megváltoztatja a profilod háttérképét.',
    category: 'Szint',
    usage: '[kép]',
    aliases: ['background', 'bg'],
    async execute(bot, msg, args) {
        let toCheck = msg.attachments.first();
        if (toCheck) toCheck = toCheck.attachment;
        if (!toCheck && args.length > 0) toCheck = args[0];
        if (!toCheck) return msg.channel.send('Nem adtál meg képet!');
        if (!toCheck.startsWith('http') || toCheck.match(/.(jpeg|jpg|gif|png)$/) == null) return msg.channel.send('Nem képet adtál meg!');
        const canvas = Canvas.createCanvas(880, 155);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(toCheck);
        const widthMulti = background.width / canvas.width;
        const heightMulti = background.height / canvas.height;
        if (widthMulti > heightMulti) ctx.drawImage(background, (background.width - canvas.width * heightMulti) / 2, 0, canvas.width * heightMulti, background.height, 0, 0, canvas.width, canvas.height);
        else if (heightMulti > widthMulti) ctx.drawImage(background, 0, (background.height - canvas.height * widthMulti) / 2, background.width, canvas.height * widthMulti, 0, 0, canvas.width, canvas.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'background.png');
        msg.channel.send('Profilháttered sikeresen megváltoztatva, itt az előnézete:', attachment)
            .then(message => {
                users[msg.member.id].bg = message.attachments.first().attachment;
                file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
            });
    }
};