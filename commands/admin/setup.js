const { MessageEmbed } = require('discord.js');
const { checkemoji, wrongemoji } = require('../../botsettings.json');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission('ADMINISTRATOR')) {
		const embed = new MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${wrongemoji} | You need \`ADMINISTRATOR\` permissions to use this command!`);
		return message.channel.send(embed);
	}
	const channel = message.mentions.channels.first() || bot.channels.cache.get(args[0]) || message.channel;
	if(!bot.channels.cache.get(channel.id)) {
		const embed = new MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${wrongemoji} | Please make sure I have access to that channel!`);
		return message.channel.send(embed);
	}
	db.set(`levelup_${message.guild.id}`, `${channel.id}`);
	const embed = new MessageEmbed()
		.setColor('#43b481')
		.setDescription(`${checkemoji} | Successfully setted levelup messages in <#${channel.id}>`);
	message.channel.send(embed);
};

module.exports.config = {
	name: 'setup',
	category: 'admin',
	description: 'Shows the user level',
	aliases: ['setting'],
	usage: 'setup',
};