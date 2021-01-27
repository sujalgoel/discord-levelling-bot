const { MessageEmbed } = require('discord.js');
const { wrongemoji } = require('../../botsettings.json');
const db = require('quick.db');
const fetch = require('node-fetch');
const colorthief = require('colorthief');

module.exports.run = async (bot, message, args) => {
	const user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
	if (user.bot) {
		const embed2 = new MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${wrongemoji} **| Sorry but we don't have levelling system for bots!**`);
		return message.channel.send(embed2);
	}
	const GuildXP = db.get(`messages_${message.guild.id}_${user.id}`);
	const ChannelXP = db.get(`cmessages_${message.channel.id}_${user.id}`);
	const UserXP = db.get(`gmessages_${user.id}`);
	const UserLvl = db.get(`level_${message.guild.id}_${user.id}`);
	if (!UserLvl) {
		const embed2 = new MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${wrongemoji} **| That user has not levelled up yet!**`);
		return message.channel.send(embed2);
	}
	colorthief.getColor(user.displayAvatarURL({ format: 'png' })).then(async function(result) {
		const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
			const hex = x.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		}).join('');
		const color = rgbToHex(result[0], result[1], result[2]);
		const every = db.all().filter(i => i.ID.startsWith('messages_')).sort((a, b) => b.data - a.data);
		const rank = every.map(x => x.ID).indexOf(`messages_${message.guild.id}_${user.id}`) + 1;
		const neededxp = UserLvl * UserLvl * 100;
		const url = `https://rank-card.sujalgoel.repl.co/?rank=${encodeURIComponent(rank)}&level=${encodeURIComponent(UserLvl)}&username=${encodeURIComponent(user.username)}&avatar=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&tag=${encodeURIComponent(user.tag)}&status=${encodeURIComponent(user.presence.status)}&color=${encodeURIComponent(color)}&currentxp=${encodeURIComponent(GuildXP)}&neededxp=${encodeURIComponent(neededxp)}`;
		fetch(url)
			.then(res => res.json())
			.then((res) => {
				const embed = new MessageEmbed()
					.setColor('BLURPLE')
					.setDescription([
						`**❯ Level :** ${UserLvl}`,
						`**❯ Guild Experience :** ${GuildXP}`,
						`**❯ Global Experience :** ${UserXP}`,
						`**❯ Channel Experience :** ${ChannelXP}`,
					])
					.setThumbnail(user.displayAvatarURL({ dynamic: true }))
					.setImage(res.data.image)
					.setAuthor(`${user.tag} Statistics`, user.displayAvatarURL({ dynamic: true }))
					.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp();
				message.channel.send(embed);
			});
	});
};

module.exports.config = {
	name: 'level',
	category: 'general',
	description: 'Shows the user level',
	aliases: ['lvl'],
	usage: 'level [@user]',
};