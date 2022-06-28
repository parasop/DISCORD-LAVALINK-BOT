const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      name:"play",
			aliases: ['p'],
			description: 'Play your fav songs',
			category: 'Utilities'
		});
	}

	async run(client,message,args) {

        if(!args[0]){
            return message.send(`Please provide search terms`);
        }

        if(!message.member.voice.channelId){
            return message.send("Please connect with voice channel")
        }

        let player = await client.poru.createConnection({
            guild :message.guild.id,
            voiceChannel:message.member.voice.channelId,
            textChannel:message.channel,
            selfDeaf:true
        })


        let resolve = await client.poru.resolve(args.join(" "));

        if(resolve.loadType ==="PLAYLIST_LOADED"){

            for(track of resolve.tracks){
                player.queue.add(track)
            }
            message.send(`LOADED ${tracks.length} songs`)
            if(!player.isPlaying) return player.play()
        }else if(resolve.loadType ==="SEARCH_RESULT" || resolve.loadType ==="TRACK_LOADED"){
            player.queue.add(resolve.tracks[0])
            message.send(`added to queue \n ${resolve.tracks[0].info.title}`)
            if(!player.isPlaying) return player.play()
        
        }else{
            message.send("No tracks found!")
        }





  }
}