const { MessageEmbed } = require('discord.js');
const { dev1, wrongemoji, checkemoji } = require('../../botsettings.json');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
	const owner = [dev1];
	if (!owner.includes(message.author.id)) {
		return;
	}
	const guild = args[0];
	if (!guild) {
		const embed = new MessageEmbed()
			.setDescription(`${wrongemoji} **Provide a guild id to blacklist!**`)
			.setColor('#f04947');
		return message.channel.send(embed);
	}
	if(!bot.guilds.cache.get(guild)) {
		const embed = new MessageEmbed()
			.setDescription(`${wrongemoji} **Please provide a valid guild id to blacklist!**`)
			.setColor('#f04947');
		return message.channel.send(embed);
	}
	db.set(`blacklist_${guild}`, 'true');
	const embed = new MessageEmbed()
		.setDescription(`${checkemoji} **Successfully blacklisted and left ${bot.guilds.cache.get(guild).name}**`)
		.setColor('#43b481');
	bot.guilds.cache.get(guild).leave();
	return message.channel.send(embed);
};

module.exports.config = {
	name: 'blacklist',
	category: 'Owner',
	description: 'Blacklist a guild from using the bot',
	aliases: [],
	usage: 'blacklist <text>',
};