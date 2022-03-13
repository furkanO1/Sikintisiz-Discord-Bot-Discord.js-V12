const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyAy-dfs0hknzICReeaSFCxNHoQrGuyIg50');

exports.run = async (client, message, args) => {
    const queue = client.queue;
  
    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    var voiceChannel = message.member.voice.channel;
        
      const asd1 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voice.channel) return message.channel.send(asd1);
    const asd2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);

    if (!args[0]) return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
    serverQueue.volume = args[0]/20;
    if (args[1] > 100) return message.channel.send(`Ses seviyesi en fazla \`100\` olarak ayarlanabilir.`)
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0]/100);
    const volumeLevelEdit = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Ayarlanan Ses Seviyesi: **${args[0]}**`)
    return message.channel.send(volumeLevelEdit);

};

exports.conf = {
    enabled: true,
    aliases: ['volume'],
    permLevel: 0
};

exports.help = {
    name: 'ses',
    description: 'Muziğin sesini ayarlar.',
    usage: 'ses sayı'
};