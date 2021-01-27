const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../botsettings.json');
const {	capitalizeFirstLetter } = require('../../functions');
const { dev1 } = require('../../botsettings.json');

module.exports.run = async (bot, message, args) => {
	const margs = args.join(' ');
	const owner = [dev1];
	const cmd = bot.commands.get(margs.toLowerCase()) || bot.commands.get(bot.aliases.get(margs.toLowerCase()));
	if (margs) {
		if (!cmd) {
			const embed = new MessageEmbed()
				.setColor('#f04947')
				.setDescription(`**<a:Wrongg:780521744481779755> | \`${margs}\` is not a valid command!**`);
			return message.channel.send(embed);
		}
		const embed = new MessageEmbed()
			.setAuthor(`Information for ${cmd.config.name.toString().toLowerCase()} command`, bot.user.displayAvatarURL())
			.setColor('BLURPLE')
			.setTimestamp()
			.setFooter('Syntax: <> = required, [] = optional', `${bot.user.avatarURL()}`)
			.setDescription([
				`**❯ Name:** ${cmd.config.name}`,
				`**❯ Category:** ${capitalizeFirstLetter(cmd.config.category.toString().toLowerCase())}`,
				`**❯ Description:** ${cmd.config.description ? cmd.config.description : 'None'}`,
				`**❯ Usage:** ${prefix}${cmd.config.usage}`,
				`**❯ Aliases:** ${cmd.config.aliases.length ? cmd.config.aliases.map((a) => `\`${a}\``).join(', ') : '`None`'}`,
			]);
		return message.channel.send(embed);
	}
	let categories;
	if (!owner.includes(message.author.id)) {
		categories = [...new Set(bot.commands.filter(command => command.config.category !== 'Owner').map(command => command.config.category))];
	} else {
		categories = [...new Set(bot.commands.map(command => command.config.category))];
	}
	const embed = new MessageEmbed()
		.setAuthor(`${bot.user.username}'s Commands`, bot.user.displayAvatarURL())
		.setThumbnail(bot.user.displayAvatarURL({
			dynamic: true,
		}))
		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
			dynamic: true,
		}))
		.setTimestamp()
		.setColor('BLURPLE')
		.setDescription([`
		My common prefix is \`${prefix}\`
		For more info on a specific command, type \`${prefix}help <command>\``]);
	for (const id of categories) {
		const category = bot.commands.filter(command => command.config.category === id);
		embed.addField(`${capitalizeFirstLetter(id)} (${category.size})`, category.map(command => `\`${command.config.name}\``).join(' '));
	}
	return message.channel.send(embed);
};

module.exports.config = {
	name: 'help',
	category: 'general',
	description: 'Shows the bot help menu',
	aliases: ['commands'],
	usage: 'help',
};