const Discord = require('discord.js');
const ayarlar = require('../settings.json')

exports.run = (client, message, args) => {

	if (!message.guild) {
		const ozelmesajuyari = new Discord.MessageEmbed()
		.setColor('B71C1C')
		.setTimestamp()
		.setAuthor(message.author.username, message.author.avatarURL())
		.addField('Bu komutu sadece sunucularda kullanabilirsin.')
		return message.author.send(ozelmesajuyari); 
	}
	
	let guild = message.guild
	let reason = args.slice(1).join(' ');
	let user = message.mentions.users.first();
	if (message.mentions.users.size < 1) return message.reply(`doğru kullanım:** ${ayarlar.prefix}kick [Kullanıcı]**`).catch(console.error);
	
	const embed = new Discord.MessageEmbed()
	.setDescription('Bu kişiyi sunucudan atmak için yeterli yetkim yok.')
	.setColor('B71C1C')
	if (!message.guild.member(user).kickable) return message.channel.send(embed);
	message.guild.member(user).kick();
	
	const embed2 = new Discord.MessageEmbed()
	.setTimestamp()
	.setAuthor(`Kullanıcı Sunucudan Atıldı`, client.user.avatarURL())
	.setThumbnail(user.avatarURL())
	.addField(`Atan yetkili:`, `<@${message.author.id}>`)
	.addField(`Atılan kullanıcı:`, `${user}`)
	.setFooter(`Tarih`)
	.setImage('https://media.tenor.com/images/27f16871c55a3376fa4bfdd76ac2ab5c/tenor.gif')
	.setColor('B71C1C')
	message.channel.send(embed2);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi atarsın.',
  usage: 'kick [Kullanıcı]'
};