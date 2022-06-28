const Discord = require("discord.js")
const Event = require('../../Structures/Event');
module.exports = class extends Event {

  async run(message) {
      const client = this.client
      if (message.author.bot) return;
      if (!message.guild) return


message.send = ((text)=>{

    let embed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setDescription(text)
    return message.channel.send({embeds:[embed]})



})

      

     let prefix = client.config.prefix;
    



      if (message.channel.type === 'GUILD_TEXT') {
        if (!message.guild.members.cache.get(this.client.user.id)) await message.guild.members.fetch(this.client.user.id);
        if (!message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) return;
        if (!message.channel.permissionsFor(message.guild.me).missing('EMBED_LINKS')) return;

        if (!message.guild.me.permissions.has('EMBED_LINKS')) return;

      }



  
      const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
      const paras = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

      if (message.author.bot) return;
      if (!message.guild) return;

      if (!message.content.startsWith(paras)) return;

     






      // If message.member is uncached, cache it.
      if (!message.member)
        message.member = await message.guild.fetchMember(message);

      const args = message.content
        .slice(paras.length)
        .trim()
        .split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;

      // Get the command
      let command = client.commands.get(cmd);
      // If none is found, try to find it by alias
      if (!command) command = client.commands.get(client.aliases.get(cmd));

      // If a command is finally found, run the command
      //if (command) command.run(client, message, args);

      if (!command) return;



    
      if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

      if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;

      if (command) command.run(client, message, args);





  }
};