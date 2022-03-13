const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../settings.json');
const prefix = ayarlar.prefix;


var mutelirolu = "Muteli" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermissions('KICK_MEMBERS')) return message.channel.send("Bu komutu kullanmak için **Üyeleri At** yetkisine sahip olman gerekli.")
  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    const embedbir = new Discord.MessageEmbed()
    .setTitle(`Komut: **Mute**`)
.setDescription(`**Açıklama:** Bir kişiyi süreli mutelersin.\n**Kullanım:** ${prefix}mute [Kullanıcı] [1sn/1dk/1sa/1g]\n**Örnek:** ${prefix}mute @Kareblok#7054 1g`);
  if(!mutekisi) return message.channel.send(embedbir);
  if(mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(`Yetkili bir kişiyi muteleyemem.`)
  let muterol = message.guild.roles.cache.find(role => role.name === mutelirolu);
  if(!muterol){
    try{
      muterol = await message.guild.roles.create({
	  data: {
		name: mutelirolu,
		color: 'YELLOW',
	  },
	  reason: 'Mute rolu!',
	})
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.createOverwrite(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

  if(!mutezaman) return message.channel.send(embedbir)

  await(mutekisi.roles.add(muterol.id));
  message.reply(`<@${mutekisi.id}> **${args[1]}** boyunca mutelendi.`);

  setTimeout(function(){
    mutekisi.roles.remove(muterol.id);
    message.channel.send(`<@${mutekisi.id}> adlı kullanıcının mutesi açıldı.`);
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "mute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };
