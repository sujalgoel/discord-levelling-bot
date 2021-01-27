module.exports = {
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	clean: function(text) {
		if (typeof text === 'string') {
			return text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		} else {
			return text;
		}
	},
};