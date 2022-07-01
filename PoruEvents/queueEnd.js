const Event = require('../Structures/PoruEvent');
const disocrd = require("discord.js")
module.exports = class extends Event {
async run(player,track,data) {

    let embed = new disocrd.MessageEmbed()
    .setTitle(`Queue has enbed! `)
    .setColor("WHITE")
    

    return player.textChannel.send({embeds:[embed]})
  }}