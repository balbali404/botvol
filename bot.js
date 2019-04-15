const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "€"
const developers = ["353573128665956363","id"]



       const Discord = require('discord.js'); // npm install discord.js --save

const Util = require('discord.js'); 

const getYoutubeID = require('get-youtube-id'); // npm i get-youtube-id

const fetchVideoInfo = require('youtube-info'); // npm i youtube-info

const YouTube = require('simple-youtube-api'); // npm i dsimple-youtube-api

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core'); // npm i ytdl-core

const fs = require('fs'); // npm i fs

const gif = require("gif-search"); // npm i gif-search

const client = new Discord.Client({disableEveryone: true});

const prefix = "€";
/////////////////////////
////////////////////////

client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `ping`) {
    let embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Pong!!")
    .setDescription(`${client.ping} ms,`)
    .setFooter(`Requested by | ${msg.author.tag}`);
    msg.delete().catch(O_o=>{})
    msg.channel.send(embed);
    }
});
/////////////////////////
////////////////////////
//////////////////////
client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `avatar`){
	if(msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")
        let mentions = msg.mentions.members.first()
        if(!mentions) {
          let sicon = msg.author.avatarURL
          let embed = new Discord.RichEmbed()
          .setImage(msg.author.avatarURL)
          .setColor("#5074b3")
          msg.channel.send({embed})
        } else {
          let sicon = mentions.user.avatarURL
          let embed = new Discord.RichEmbed()
          .setColor("#5074b3")
          .setImage(sicon)
          msg.channel.send({embed})
        }
    };
});
/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////

/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
    
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        
        if (!voiceChannel) return msg.channel.send("Ø§Ù†Øª Ù„Ù… ØªØ¯Ø®Ù„ Ø±ÙˆÙ… ØµÙˆØªÙŠ");
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("Ù„ÙŠØ³Øª Ù„Ø¯ÙŠ ØµÙ„Ø§Ø­ÙŠØ§Øª Ù„Ù„Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù‰ Ø§Ù„Ø±ÙˆÙ…");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("Ø§Ù†Ø§ Ù„Ø§ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø§Ù„ØªÙƒÙ„Ù… ÙÙŠ Ù‡Ø§Ø°Ù‡ Ø§Ù„Ø±ÙˆÙ…");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("Ø§Ù†Ø§ Ù„Ø§ Ø§Ù…Ù„Ùƒ ØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ø±Ø³Ø§Ù„ Ø±ÙˆØ§Ø¨Ø·")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            

			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor("#f7abab")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
					
/////////////////					
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Ù„Ù… ÙŠØªÙ… Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø§ØºÙ†ÙŠØ©');
                    }
                    
					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					console.error(err);
					return msg.channel.send("I didn't find any results!");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("ÙŠØ¬Ø¨ Ø§Ù† ØªÙƒÙˆÙ† ÙÙŠ Ø±ÙˆÙ… ØµÙˆØªÙŠ");
        if (!serverQueue) return msg.channel.send("Ù„ÙŠØ³Øª Ù‡Ù†Ø§Ùƒ Ø§ØºØ§Ù†ÙŠ Ù„ÙŠØªÙ… Ø§Ù„ØªØ®Ø·ÙŠ");

		serverQueue.connection.dispatcher.end('ØªÙ… ØªØ®Ø·ÙŠ Ø§Ù„Ø§ØºÙ†ÙŠØ©');
        return undefined;
        
	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("ÙŠØ¬Ø¨ Ø§Ù† ØªÙƒÙˆÙ† ÙÙŠ Ø±ÙˆÙ… ØµÙˆØªÙŠ");
        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");
        
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('ØªÙ… Ø§ÙŠÙ‚Ø§Ù Ø§Ù„Ø§ØºÙ†ÙŠØ© Ù„Ù‚Ø¯ Ø®Ø±Ø¬Øª Ù…Ù† Ø§Ù„Ø±ÙˆÙ… Ø§Ù„ØµÙˆØªÙŠ');
        return undefined;
        
	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("ÙŠØ¬Ø¨ Ø§Ù† ØªÙƒÙˆÙ† ÙÙŠ Ø±ÙˆÙ… ØµÙˆØªÙŠ");
		if (!serverQueue) return msg.channel.send('ÙŠØ¹Ù…Ù„ Ø§Ù„Ø§Ù…Ø± ÙÙ‚Ø· Ø¹Ù†Ø¯ ØªØ´ØºÙŠÙ„ Ù…Ù‚Ø·Ø¹ ØµÙˆØªÙŠ');
        if (!args[1]) return msg.channel.send(`Ù„Ù‚Ø¯ ØªÙ… ØªØºÙŠØ± Ø¯Ø±Ø¬Ø© Ø§Ù„ØµÙˆØª Ø§Ù„Ù‰**${serverQueue.volume}**`);
        
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        
        return msg.channel.send(`Ø¯Ø±Ø¬Ø© Ø§Ù„ØµÙˆØª Ø§Ù„Ø§Ù†**${args[1]}**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('There is no Queue!');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send('There is no Queue!!');
		let index = 0;
//	//	//
		const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('ØªÙ… Ø§Ù„Ø§ÙŠÙ‚Ø§Ù');
		}
		return msg.channel.send('ÙÙŠ Ø§Ù†ØªØ¸Ø§Ø± ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…Ù‚Ø·Ø¹');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send('ØªÙ… Ø§Ù„ØªØ´ØºÙŠÙ„');
            
		}
		return msg.channel.send('Queue is empty!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Can't join this channel: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}**, ØªÙ…Øª Ø§Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù‚Ø·Ø¹ Ø§Ù„Ù‰ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± `);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**${song.title}**, is now playing!`);
}


client.on('message', message => {
    if (message.content === 'help') {
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('**Ø£ÙˆØ§Ù…Ø± Ø§Ù„Ù…ÙŠÙˆØ²Ùƒ...**')
        .setDescription('**Ø¨Ø±ÙÙƒØ³ Ø§Ù„Ø¨ÙˆØª (!)**')
        .addField('play', 'Ù„ØªØ´ØºÙŠÙ„ Ø§ØºÙ†ÙŠØ©')
        .addField('join', 'Ø¯Ø®ÙˆÙ„ Ø±ÙˆÙ…Ùƒ Ø§Ù„ØµÙˆØªÙŠ')
        .addField('disconnect', 'Ø§Ù„Ø®Ø±ÙˆØ¬ Ù…Ù† Ø±ÙˆÙ…Ùƒ Ø§Ù„ØµÙˆØªÙŠ')
        .addField('skip', 'ØªØ®Ø·ÙŠ Ø§Ù„Ø£ØºÙ†ÙŠØ©')
        .addField('pause', 'Ø§ÙŠÙ‚Ø§Ù Ø§Ù„Ø§ØºÙ†ÙŠØ© Ù…Ø¤Ù‚ØªØ§')
        .addField('resume', 'ØªÙƒÙ…Ù„Ø© Ø§Ù„Ø§ØºÙ†ÙŠØ©')
        .addField('queue', 'Ø§Ø¸Ù‡Ø§Ø± Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„')
        .addField('np', 'Ø§Ø¸Ù‡Ø§Ø± Ø§Ù„Ø§ØºÙ†ÙŠØ© Ø§Ù„Ù„ÙŠ Ø§Ù†Øª Ù…Ø´ØºÙ„Ù‡Ø§ Ø­Ø§Ù„ÙŠØ§')
        .setFooter('(general_commands) Ù„Ø§Ø¸Ù‡Ø§Ø± Ø§Ù„Ø§ÙˆØ§Ù…Ø± Ø§Ù„Ø¹Ø§Ù…Ø©')
      message.channel.send(helpEmbed);
    }
});

client.on('message', message => {
    if (message.content === 'general_commands') {
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('**Ø£ÙˆØ§Ù…Ø± Ø¹Ø§Ù…Ø©...**')
        .addField('avatar', "Ø§ÙØ§ØªØ§Ø± Ø§Ù„Ø´Ø®Øµ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨")
        .addField('gif', 'Ø§Ù„Ø¨Ø­Ø« Ø¹Ù† Ø¬ÙŠÙ Ø§Ù†Øª ØªØ·Ù„Ø¨Ù‡')
        .addField('ping', 'Ù…Ø¹Ø±ÙØ© ping Ø§Ù„Ø¨ÙˆØª')
        .setFooter('Ø§Ù„Ù…Ø²ÙŠØ¯ Ù‚Ø±ÙŠØ¨Ø§ Ø§Ù† Ø´Ø§Ø¡ Ø§Ù„Ù„Ù‡!')
      message.channel.send(helpEmbed);
    }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`Type ${prefix}play`,"http://twitch.tv/alpha")
});















client.login('NTY3MTkwNjc0Mzk1NDk2NDQ4.XLRx7A.HuXaroy1nth_B3NsINOzpzmKFXQ');
