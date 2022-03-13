const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
    let user = message.mentions.users.first() || message.author
    
    const avatar = new Discord.MessageEmbed()
        .setColor("B71C1C")
        .setAuthor(user.tag, user.avatarURL())
        .setDescription(`[Avatar URL Link](${user.avatarURL()})`)
        .setImage(user.avatarURL())
    message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp"],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir.',
  usage: 'avatar veya avatar <@kullanıcı>',

};