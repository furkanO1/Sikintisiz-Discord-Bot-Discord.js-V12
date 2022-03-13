const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../settings.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  	if(args[0] == "sıfırla") {
		if(db.has(`gc_${message.guild.id}`)) {
			var s = db.delete(`gc_${message.guild.id}`);
			const embed = new Discord.MessageEmbed()
			.setDescription("Başarılı bir şekilde giriş çıkış kanalı deaktif edildi!")
			.setColor("GREEN")
			message.channel.send(embed)
			return;
		} else {
			const embed = new Discord.MessageEmbed()
            .setDescription("Giriş çıkış sistemi ayarlanmadığı için sıfırlanamaz!")
            .setColor("RED")
            message.channel.send(embed)
			return;
		}
	}
  
	let channel = message.mentions.channels.first()
  
    if (!channel) {
		let e = new Discord.MessageEmbed()
		.setDescription(`Yanlış kullanım doğru kullanım: ${ayarlar.prefix}giriş-çıkış <#kanal/sıfırla>`)
		.setColor("RED")
		message.channel.send(e)
		return;
    }
  
    var s = db.set(`gc_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.MessageEmbed()
    .setDescription("Başarılı bir şekilde giriş çıkış kanalı "+s+" olarak ayarlandı!")
    .setColor("GREEN")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0

}

exports.help = {
    name: 'giriş-çıkış',
    description: 'Giriş çıkış kanalını ayarlar veya sıfırlar.',
    usage: 'giriş-çıkış <#kanal/sıfırla>'
}