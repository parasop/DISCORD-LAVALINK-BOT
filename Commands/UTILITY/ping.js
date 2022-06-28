const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      name:"ping",
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: 'Utilities'
		});
	}

	async run(client,message) {

   await  message.channel.send({content:`_ _`}).then(m => {

      let ping = m.createdTimestamp - message.createdTimestamp;

      let embed = new discord.MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`pong`, message.author.displayAvatarURL())

        .setDescription(`
 \`\`\`Gateway ping : ${client.ws.ping}ms
Rest ping    : ${ping}ms\`\`\`
    `)
      m.edit({embeds: [embed]});
    })
  }
}