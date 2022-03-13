const Discord = require('discord.js');
const ayarlar = require("../settings.json")

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
//Bot linkleri

const davet = "https://forum.beldenetwork.com"
const desteksw = "https://discord.gg/8qQpwv2"

//≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡



exports.run = async (bot, message, client) => { 

  let e = new Discord.MessageEmbed()
  
  .setDescription(`
🏵 ≡ **${bot.user.username} Bot Yardım Menüsü** ≡ 🏵

🔖 **Bağlantılar;**
▫️ **[Botu davet et!](${davet})** ¤ **[Destek Sunucusu](${desteksw})**

📝 **Bilgi**
▫️ Hey merhaba yardım menüsünden 
▫️ gerekli bilgiyi alamadığında
▫️ yetkilileri etiketle!

👱🏻 **Kullanıcı Komutları**
▫️ ${ayarlar.prefix}**avatar:** Avatarınızı veya etiketlediğiniz kişinin avatarını gösterir.
▫️ ${ayarlar.prefix}**sunucu-bilgi:** Bulunduğunuz sunucu hakkında bilgi verir.
▫️ ${ayarlar.prefix}**kullanıcı-bilgi:** Kullanıcı bilgilerinizi gösterir.
▫️ ${ayarlar.prefix}**izinlerim:** Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.
▫️ ${ayarlar.prefix}**ping:** Botun pingini gösterir.

🔒 **Yetkili Komutları**
▫️ ${ayarlar.prefix}**ban <@üye> [Sebep]:** Bir kullanıcı veya üye'yi sunucudan banlarsınız.
▫️ ${ayarlar.prefix}**kick <@üye>:** Bir kullanıcı veya üye'yi sunucudan atarsınız.
▫️ ${ayarlar.prefix}**sil <miktar>:** Belirttiğiniz miktarda mesaj siler.
▫️ ${ayarlar.prefix}**destek <#kanal/sıfırla>:** Gelişmiş destek kanalını ayarlar veya sıfırlar.
▫️ ${ayarlar.prefix}**oto-rol <@rol/sıfırla>:** Sunucuya birisi katıldıgında verilecek rolü ayarlar veya sıfırlar.
▫️ ${ayarlar.prefix}**giriş-çıkış <#kanal/sıfırla>:** Giriş çıkış kanalını ayarlar veya sıfırlar.

🎵 **Müzik Komutları**
▫️ ${ayarlar.prefix}**çal:** Belirttiğiniz şarkıyı oynatır. 
▫️ ${ayarlar.prefix}**duraklat:** Çalan şarkıyı duraklatır. 
▫️ ${ayarlar.prefix}**devamet:** Duraklatılan şarkıyı devam ettirir. 
▫️ ${ayarlar.prefix}**geç:** Sıradaki şarkıya geçer. Sırada şarkı yoksa şarkıyı kapatır. 
▫️ ${ayarlar.prefix}**tekrar:** Çalan şarkı bitince aynı şarkıyı tekrar oynatır. 
▫️ ${ayarlar.prefix}**durdur:** Çalan/oynatılan şarkıyı kapatır.
`)
  .setFooter(`Sorgulayan: ${message.author.tag}`)
  .setTimestamp()
  message.channel.send(e)           
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'yardım komutu',
  usage: 'yardım'
};