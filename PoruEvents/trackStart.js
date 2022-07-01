const Event = require('../Structures/PoruEvent');
const disocrd = require("discord.js")
module.exports = class extends Event {
async run(player,track) {

    let embed = new disocrd.MessageEmbed()
    .setTitle(`Now playing `)
    .setColor("WHITE")
    .setDescription(`[${track.info.title}](${track.info.uri})`)
    

    return player.textChannel.send({embeds:[embed]})
  }}