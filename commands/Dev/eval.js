const { inspect } = require('util');
const config = require('../../config.json');
const users = require('../../assets/users.json');
const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    description: 'Lefuttat JavaScript kódot',
    category: 'Dev',
    usage: '<kód>',
    async execute(bot, msg) {
        if (!msg.member.roles.cache.get(config.roles.botmester)) return msg.channel.send('Nincs jogosultságod ezt a parancsot használni!');
        try {
            let output = eval(msg.content.substring(5));
            if (typeof output !== 'string') output = inspect(output, { depth: 0 });
            if (output.length > 1987) output = `${output.substr(0, 1987)}...`;
            msg.channel.send(`\`\`\`js\n${output}\n\`\`\``);
        } catch (err) {
            msg.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        }
    }
};