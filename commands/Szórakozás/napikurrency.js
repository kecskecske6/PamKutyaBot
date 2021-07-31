const users = require('../../assets/users.json');
const file = require('fs');

module.exports = {
    name: 'napikurrency',
    description: 'Ezzel gyűjtöd be a napi PamKurrency-d.',
    category: 'Szórakozás',
    execute(bot, msg) {
        if (users[msg.author.id].collected) msg.channel.send(`${msg.member.displayName}, ma már begyűjtötted a PamKurrency-d!`);
        else {
            let streak = '';
            let i = 0;
            for (i = 0; i < users[msg.author.id].streak; i++) streak += '|:white_check_mark:';
            for (let j = i; j < 5; j++) streak += '|:negative_squared_cross_mark:';
            streak += '|';
            users[msg.author.id].collected = true;
            file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
            users[msg.author.id].pamkurrency += users[msg.author.id].streak * 50;
            file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
            msg.channel.send(`>>> __**${msg.member.displayName}**__**, megkaptad a napi PamKurrency-d!** \`+${users[msg.author.id].streak * 50}\`\n${streak}`);
            if (users[msg.author.id].streak < 5) {
                ++users[msg.author.id].streak;
                file.writeFileSync('./assets/users.json', JSON.stringify(users, null, 2));
            }
        }
    }
};