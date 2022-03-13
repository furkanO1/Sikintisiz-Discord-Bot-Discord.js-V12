const Discord = require('discord.js');
const ayarlar = require('../settings.json');
const moment = require('moment');
require('moment-duration-format');
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

exports.run = (client, message, params) => {
      const sunucubilgi = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setThumbnail('http://www.gifgratis.net/gifs_animes/oeufs/23.gif')
    .setTitle(`Sunucu Bilgi`)
    .addField('Ad:', message.guild.name, true)
    .addField('ID', message.guild.id, true)
    .addField('Üye sayısı:', message.guild.memberCount, true)
    .addField('Sahibi:', message.guild.owner, true)
    .addField('Kanal sayısı:', message.guild.channels.cache.size, true)
    .addField('Oluşturulma tarihi:', `${moment(message.guild.createdAt).format('DD')} ${aylar[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')}`, true)
    .setFooter(`${message.author.username} `, message.author.avatarURL())
      message.channel.send(sunucubilgi);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucu-bilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};
