const Discord = require('discord.js');
const db = require('quick.db');
const { prefix, logs } = require('../../botsettings.json');

module.exports = async (bot, message) => {
	if (message.author.bot || !message.guild) return;
	if (message.content.match(`^<@!?${bot.user.id}>( |)$`)) {
		const prefixembed = new Discord.MessageEmbed()
			.setDescription(`**Hello <@${message.author.id}>, I am <@!${bot.user.id}> and My prefix is \`${prefix}\`, you can use \`${prefix}help\` command to get the list of available commands!**`)
			.setColor('BLURPLE');
		message.channel.send(prefixembed);
	}
	const userlvl = db.get(`level_${message.guild.id}_${message.author.id}`);
	if(!userlvl) {
		db.set(`level_${message.guild.id}_${message.author.id}`, 1);
	}
	let level = db.get(`level_${message.guild.id}_${message.author.id}`);
	const needed = level * level * 100;
	const RandomChannelXP = Math.floor(Math.random() * 4) + 3;
	const RandomGuildXP = Math.floor(Math.random() * 4) + 2;
	const RandomXP = Math.floor(Math.random() * 4) + 1;
	db.add(`messages_${message.guild.id}_${message.author.id}`, RandomGuildXP);
	db.add(`gmessages_${message.author.id}`, RandomXP);
	db.add(`cmessages_${message.channel.id}_${message.author.id}`, RandomChannelXP);

	let GuildXP = db.get(`messages_${message.guild.id}_${message.author.id}`);
	if (GuildXP >= needed) {
		++level;
		GuildXP -= needed;
		db.set(`messages_${message.guild.id}_${message.author.id}`, GuildXP);
		db.add(`level_${message.guild.id}_${message.author.id}`, 1);
		const channel = db.get(`levelup_${message.guild.id}`) || message.channel;
		const embed = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setDescription(`<@${message.author.id}>, You are now **level ${level}** with **base experience of ${GuildXP}**.`);
		bot.channels.cache.get(channel).send(embed);
	}

	if (!message.content.startsWith(prefix)) return;
	const blacklisted = db.get(`blacklist_${message.guild.id}`);

	if (blacklisted === 'true') {
		message.guild.leave();
	} else {
		if (!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice((typeof prefix === 'string' ? prefix.length : 0)).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if (command) {
			command.run(bot, message, args);
		} else {
			return;
		}
		const commandembed = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('A Command was used!')
			.addField('Command user :', `\`\`\`${message.author.tag}\`\`\``)
			.addField('Command user ID :', `\`\`\`${message.author.id}\`\`\``)
			.addField('Command ran :', `\`\`\`${cmd}\`\`\``)
			.addField('Guild name :', `\`\`\`${message.guild.name}\`\`\``)
			.addField('Guild ID :', `\`\`\`${message.guild.id}\`\`\``);
		bot.channels.cache.get(logs).send(commandembed);
	}
};