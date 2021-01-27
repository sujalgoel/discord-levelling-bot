const Discord = require('discord.js');
const { wrongemoji } = require('../../botsettings.json');

module.exports.run = async (bot, message, args) => {
	const snipes = bot.snipes.get(message.channel.id) || [];
	const msg = snipes[args[0] - 1 || 0];
	if (!msg) {
		const embed2 = new Discord.MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${wrongemoji} **| No one has deleted any message!**`);
		return message.channel.send(embed2);
	}
	const Embed = new Discord.MessageEmbed()
		.setAuthor(
			msg.author.tag,
			msg.author.displayAvatarURL({
				dynamic: true,
				size: 256,
			}),
		)
		.setColor('BLURPLE')
		.setDescription(msg.content)
		.setFooter(`Time : ${msg.date} (IST)`);
	if (msg.image) Embed.setImage(msg.image);
	message.channel.send(Embed);

};

module.exports.config = {
	name: 'snipe',
	category: 'general',
	description: 'Snipes a deleted message in a channel',
	aliases: [],
	usage: 'snipe \nsnipe <1 - 10>',
};