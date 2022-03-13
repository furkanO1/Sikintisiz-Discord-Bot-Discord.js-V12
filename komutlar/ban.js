const Discord = require('discord.js');
const ayarlar = require('../settings.json')

exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor('B71C1C')
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL())
  .addField('Bu komutu sadece sunucularda kullanabilirsin.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
    if (reason.length < 1) return message.reply(`doğru kullanım: **${ayarlar.prefix}ban [Kullanıcı] [Sebep]**`);
  if (message.mentions.users.size < 1) return message.reply('doğru kullanım: **'+ `${ayarlar.prefix}ban [Kullanıcı] [Sebep]**`).catch(console.error);
            const embed1 = new Discord.MessageEmbed()
  .setDescription('Bu kişiyi sunucudan yasaklamak için yeterli yetkim yok.')
  .setColor('B71C1C')

  if (!message.guild.member(user).bannable) return message.channel.send(embed1);
  message.guild.member(user).ban();
  const embed = new Discord.MessageEmbed()
    .setThumbnail('https://media1.tenor.com/images/4732faf454006e370fa9ec6e53dbf040/tenor.gif?itemid=14678194')
			.setAuthor(`Bir Üye Yasaklandı`, user.avatarURL())
			.setColor('B71C1C')
  .addField(`Yasaklayan yetkili:`, `<@${message.author.id}>`)
   .addField(`Yasaklanan üye:`, `<@!${user.id}>`)
  .addField(`Sebep:`, `${reason}`)
			.setThumbnail(user.avatarURL())
			.setFooter(`Üye ID: ${user.id}`)
			.setTimestamp();
			message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 3
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi banlarsın.',
  usage: 'ban [Kullanıcı]'
};