const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../settings.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
 
  	if(args[0] == "sıfırla") {
		if(db.has(`otoR_${message.guild.id}`)) {
			var s = db.delete(`otoR_${message.guild.id}`);
			const embed = new Discord.MessageEmbed()
			.setDescription("Başarılı bir şekilde oto rol deaktif edildi!")
			.setColor("B71C1C")
			message.channel.send(embed)
			return;
		} else {
			const embed = new Discord.MessageEmbed()
            .setDescription("Oto rol sistemi ayarlanmadığı için sıfırlanamaz!")
            .setColor("RED")
            message.channel.send(embed)
			return;
		}
	} 
 
	let role = message.mentions.roles.first() //|| message.guild.roles.find(r => r.name === args.slice(0).join(' '));
  
    if (!role) {
		let e = new Discord.MessageEmbed()
		.setDescription(`Yanlış kullanım doğru kullanım: ${ayarlar.prefix}oto-rol <@rol/sıfırla>`)
		.setColor("RED")
		message.channel.send(e)
		return;
    }
  
    var s = db.set(`otoR_${message.guild.id}`, role.id)
  
    const embed = new Discord.MessageEmbed()
    .setDescription("Başarılı bir şekilde oto rol <@&"+s+"> olarak ayarlandı!")
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'oto-rol',
    description: 'Sunucuya birisi katıldıgında verilecek rolü ayarlar veya sıfırlar.',
    usage: 'oto-rol <@rol/sıfırla>'
}