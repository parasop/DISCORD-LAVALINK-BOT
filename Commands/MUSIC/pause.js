const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "pause",
            aliases: ['pause'],
            description: 'Pause the player',
            category: 'Utilities'
        });
    }

    async run(client, message, args) {


        let { channelId } = message.member.voice;
        let player = client.poru.players.get(message.guild.id)

        if (!channelId) {
            return message.send(`Kindly join voice channel`);
        }

        if (!player) {
            return message.send(`No player found for this guiod`)
        }

        player.pause(true);


        return message.send(`Paued the player`)
 }
}