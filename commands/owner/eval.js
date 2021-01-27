const { MessageEmbed } = require('discord.js');
const { clean } = require('../../functions');
const { dev1, wrongemoji } = require('../../botsettings.json');

module.exports.run = async (bot, message, args) => {
	const owner = [dev1];
	if (!owner.includes(message.author.id)) {
		return;
	}
	try {
		const code = args.join(' ');
		if (!code) {
			const embed = new MessageEmbed()
				.setDescription(`${wrongemoji} **| Provide a valid code to evaluate!**`)
				.setColor('#f04947');
			return message.channel.send(embed);
		}
		let evaled = eval(code);
		if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
		const embed = new MessageEmbed()
			.setAuthor('Results', bot.user.displayAvatarURL())
			.setDescription('```js' + '\n' + clean(evaled) + '\n' + '```')
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
				dynamic: true,
			}))
			.setTimestamp()
			.setColor('#43b481');
		message.channel.send(embed);
	} catch (err) {
		console.log(err);
		const embed = new MessageEmbed()
			.setAuthor('Results', bot.user.displayAvatarURL())
			.setDescription('```js' + '\n' + clean(err) + '\n' + '```')
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
				dynamic: true,
			}))
			.setTimestamp()
			.setColor('#f04947');
		message.channel.send(embed);
	}
};

module.exports.config = {
	name: 'eval',
	category: 'Owner',
	description: 'Evaluates a given code',
	aliases: [],
	usage: 'eval <text>',
};