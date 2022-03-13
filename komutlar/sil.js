const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) {
  
// if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  var x = args.slice(0).join(' ')
  
  if (!x) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (isNaN(x)) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (x < 1) return message.reply("**1** adetten az mesaj silemem!")
  if (x > 100) return message.reply("**100** adetten fazla mesaj silemem!")
  
  let fetched = await message.channel.messages.fetch({limit: args[0]})
  
  message.channel.bulkDelete(fetched)
  .catch(error => message.channel.send("`Hata:` Eski mesajları silmeme **DiscordAPI** izin vermiyor.."))
    let giveEmbed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`
**${args[0]}** Adet mesaj başarıyla uzaya fırlatıldı!`)
	message.channel.send(giveEmbed);
	message.delete();
    
};


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'sil',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: 'sil <miktar>'
};