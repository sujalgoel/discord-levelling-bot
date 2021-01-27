const discord = require('discord.js');
const { dev1, wrongemoji, checkemoji } = require('../../botsettings.json');

module.exports.run = async (_bot, message) => {
	const owner = [dev1];
	if (!owner.includes(message.author.id)) {
		return;
	}
	try {
		const embed = new discord.MessageEmbed()
			.setDescription(`${checkemoji} **| Restarting...**`)
			.setColor('#43b481');
		message.channel.send(embed).then(() => process.exit(1));
	} catch (e) {
		const embed = new discord.MessageEmbed()
			.setDescription(`${wrongemoji} **| An Error Occured**`)
			.setColor('#f04947');
		return message.channel.send(embed);
	}
};

module.exports.config = {
	name: 'restart',
	category: 'Owner',
	description: 'Restarts the bot <only works with pm2>',
	aliases: ['die', 'reboot'],
	usage: 'restart',
};