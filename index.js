const token = process.env['token'];
const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const file = require('fs');
const { keepAlive } = require('./server');

const eventfolders = file.readdirSync('./events');
for (const event of eventfolders) bot.on(event.split('.')[0], require(`./events/${event}`).bind(null, bot));

bot.commands = new Discord.Collection();
const commandfolders = file.readdirSync('./commands');
for (const folder of commandfolders) {
    const commandfiles = file.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
    for (const file of commandfiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

keepAlive();

//bot.login(config.devtoken);
bot.login(token);