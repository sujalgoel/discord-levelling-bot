const botsettings = require('../../botsettings.json');
const Discord = require('discord.js');

module.exports = async (bot) => {
	const embed = new Discord.MessageEmbed()
		.setDescription(`I am online on **${bot.guilds.cache.size} servers** at the moment!`)
		.setColor('BLURPLE');
	bot.channels.cache.get(botsettings.logs).send(embed);
	console.log('Prefix:', botsettings.prefix);
	console.log(`Logged in as ${bot.user.tag}`);
};