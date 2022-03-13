const Discord = require('discord.js')
var ayarlar = require('../settings.json');

exports.run = async (client, message, args) => {
  
	const db = require('quick.db');
	if(args[0] == "sıfırla") {
		if(db.has(`destekK_${message.guild.id}`)) {
			var s = db.delete(`destekK_${message.guild.id}`);
			const embed = new Discord.MessageEmbed()
			.setDescription("Başarılı bir şekilde destek kanalı deaktif edildi!")
			.setColor("GREEN")
			message.channel.send(embed)
			return;
		} else {
			 const embed = new Discord.MessageEmbed()
            .setDescription("Destek sistemi ayarlanmadığı için sıfırlanamaz!")
            .setColor("RED")
            message.channel.send(embed)
			return;
		}
	}
	
	let kanal = message.mentions.channels.first();
  
    if (!kanal) {
      let e = new Discord.MessageEmbed()
      .setDescription(`Yanlış kullanım doğru kullanım: ${ayarlar.prefix}destek <#kanal/sıfırla>`)
      .setColor("RED")
      message.channel.send(e)
      return;
    }
	  
    var s = db.set(`destekK_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.MessageEmbed()
    .setDescription("Başarılı bir şekilde destek kanalı <#"+s+"> olarak ayarlandı!")
    .setColor("GREEN")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };

  exports.help = {
    name: 'destek',
    description: 'Gelişmiş destek kanalını ayarlamanızı/değiştirmenizi sağlar.',
    usage: 'destek <#kanal/sıfırla>',
  };