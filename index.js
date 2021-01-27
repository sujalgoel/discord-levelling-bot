const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({
	disableMentions: 'everyone',
	ws: {
		intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'],
	},
	fetchAllMembers: true,
});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Map();
bot.esnipes = new Map();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

bot.on('messageDelete', function(message) {
	if (message.author.bot) return;
	const snipes = message.client.snipes.get(message.channel.id) || [];
	snipes.unshift({
		content: message.content,
		author: message.author,
		image: message.attachments.first() ?
			message.attachments.first().proxyURL : null,
		date: new Date().toLocaleString('en-IN', {
			timeZone: 'Asia/Kolkata',
			format: 'lll',
		}),
	});
	snipes.splice(10);
	message.client.snipes.set(message.channel.id, snipes);
});

bot.on('messageUpdate', function(message) {
	if (message.author.bot) return;
	const esnipes = message.client.esnipes.get(message.channel.id) || [];
	esnipes.unshift({
		content: message.content,
		author: message.author,
		url: message.url,
		image: message.attachments.first() ?
			message.attachments.first().proxyURL : null,
		date: new Date().toLocaleString('en-IN', {
			timeZone: 'Asia/Kolkata',
			format: 'lll',
		}),
	});
	esnipes.splice(10);
	message.client.esnipes.set(message.channel.id, esnipes);
});

bot.login(botsettings.token);