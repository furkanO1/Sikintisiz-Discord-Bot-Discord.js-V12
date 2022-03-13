const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
	let user = message.mentions.members.first() || message.member;
	let user2 = message.mentions.users.first() || message.author;
  //if (!user) return message.reply("Bir kullanıcıyı etiketleyiniz!")
	
  const db = require('quick.db'); 
  var c = "Çevrimiçi"
  var cd = "Çevrimdışı"
  var b = "Boşta"//hirsiz
  var r = "Rahatsız Etmeyin"
  var y = "Evet"
  var n = "Hayır"
  var m = "Herhangi bir mesaj göndermemiş"
  var x = "Bu kullanıcı bir bottur bu yüzden son attığı mesaj gösterilemiyor"
  var oynuyor = "Oynuyor"
  var izliyor = "İzliyor"
  var dinliyor = "Dinliyor"
  var yayında = "YAYINDA"
  
  const Durum = user.presence.status;
			const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
			const durm = (Durum == "online" ? ('<a:cevrimici:613740570443120655>' + c) : (Durum == "offline" ? ('<a:cevrimdisi:613740612369252364>' + cd) : (Durum == "idle" ? ('<a:bosta:613740464666968064>' + b) : (Durum == "dnd" ? ('<a:rahatsizetmeyin:613740506001965069>' + r) : ('Bulunamadı')))))
      
    const aylar = {
    "01": "Ocak",
		"02": "Şubat",
		"03": "Mart",
		"04": "Nisan",
		"05": "Mayıs",
		"06": "Haziran",
		"07": "Temmuz",
		"08": "Ağustos",
		"09": "Eylül",
		"10": "Ekim",
		"11": "Kasım",
		"12": "Aralık"
  }
    
    const member = message.guild.member(user);
    const embed = new Discord.MessageEmbed()
		.setColor(Durm)
		.setThumbnail(user2.avatarURL() || user2.defaultAvatarURL())
    .setAuthor(`👱-👩🏼 ${user2.username} - Kullanıcı Bilgisi`)
		.addField('Tag', `${user2.tag}`, true)
		.addField('ID', `${user2.id}`, true)
    .addField('Discord Kayıt Tarihi', `${moment(user2.createdAt).format('DD')} ${aylar[moment(user2.createdAt).format('MM')]} ${moment(user2.createdAt).format('YYYY HH:mm:ss')}`, true)
		.addField('Sunucuya Katıldığı Tarih', `${moment(user.joinedAt).format('DD')} ${aylar[moment(user.joinedAt).format('MM')]} ${moment(user.joinedAt).format('YYYY HH:mm:ss')}`, true)
		.addField('Durumu', `${durm || "Bilinmiyor"}`, true)
		//.addField("Durum Mesajı", oynuyor ? oynuyor : "Durum mesajı boş")//`${user.presence.game ? user.presence.game.name : 'Durum mesajı boş'}`)
    
    try {
    if (user.presence.game.type === 0) {
    embed.addField('Durum Mesajı', `${user.presence.game.name} ${oynuyor}` || 'Durum Mesajı Boş', true)
    }
    if (user.presence.game.type === 3) {
    embed.addField('Durum Mesajı', `${user.presence.game.name} ${izliyor}` || 'Durum Mesajı Boş', true)
    }
    if (user.presence.game.type === 2) {
    embed.addField('Durum Mesajı', `${user.presence.game.name} ${dinliyor}` || 'Durum Mesajı Boş', true)
    }
    if (user.presence.game.type === 1) { 
    embed.addField('Durum Mesajı', `[${user.presence.game.name} ${yayında}](${user.presence.game.url})` || 'Durum Mesajı Boş', true)
    }
    } catch(e) {
      embed.addField('Durum Mesajı', 'Durum Mesajı Boş', true)
    }
    embed.addField('Bot Mu?', `${user2.bot ? y : n}`, true)
		.addField('Rolleri', `${user.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') ? user.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') : 'Bulunmuyor / Bulunamadı'}`, true)
  
   var son = "evet"
   try {
     
   if (user.lastMessage) { 
      var son = user.lastMessage
    }
    
    if (message.guild.members.cache.get(user.id).lastMessage.embeds.length > 0) { 
      var son = `**${message.guild.members.cache.get(user.id).lastMessage.embeds[0].title}** başlıklı bir embed yollamış.`
   }
  
   } catch(e) {
     var son = "Herhangi bir mesaj göndermemiş";
   }
                                                                
    embed.addField('Son Attığı Mesaj', son ? son : m, true)
    message.channel.send({embed});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'İstediğiniz kullanıcı veya komutu kullanan kullanıcı hakkında bilgi verir.',
  usage: 'kullanıcı-bilgi <@kullanıcı>',
};