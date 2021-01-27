const { readdirSync } = require('fs');

module.exports = (bot) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		commands.forEach((file) => {
			const pull = require(`../commands/${dir}/${file}`);
			bot.commands.set(pull.config.name, pull);
			if (pull.config.aliases) {
				pull.config.aliases.forEach(alias => {
					bot.aliases.set(alias, pull.config.name);
				});
			}
		});
	});
	console.log(`Successfully loaded ${bot.commands.size} commands!`);
};