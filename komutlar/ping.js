const Discord = require('discord.js');

exports.run = async (client, message, args,) => {
  const useruser = "Komut "  + message.author.username + " tarafından çalıştırıldı";
  const userurl = message.author.avatarURL();
  const bayrak = ":flag_tr:";
  const ping = `${Math.round(client.ws.ping)}ms`;

let embed = new Discord.MessageEmbed()
.setTitle(':shield: Anlık Gecikme Süresi :shield:')
.setThumbnail(client.user.avatarURL())
.setColor("#00FF00")
.addField("📍Ping:", `▫️ Genel Ping: **${ping}**`, true)
.addField("🗃Komutlar", `▫️ Genel Komut: **${client.commands.size}**`, true)
.setFooter(useruser, userurl)
.setTimestamp();
  return message.channel.send(embed)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Gecikme süresini gösterir.',
  usage: 'ping'
};