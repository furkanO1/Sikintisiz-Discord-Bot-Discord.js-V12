const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const express = require('express');
require('./util/eventLoader.js')(client);
client.queue = new Map()
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(80);

var prefix = settings.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === settings.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(settings.token);





//Argümentler


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//                                 Canlı Destek
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//Kodlar;
const db = require('quick.db');

client.on('message', async msg => {
  
  if (!msg.guild) return;
  
  let prefix = settings.prefix
  
  var s = 'tr'
  var k = 'destek-kanalı'
  var ssaa = '**<@{kisi}>** bu sunucuda zaten açık bir Destek Talebin bulunuyor bulunan talebin kapanmadan yeni açamazsın!'
  const dil = s
  
  let rol;
  let kanal = '';
  
  if (db.has(`destekK_${msg.guild.id}`) === true) {
 kanal = msg.guild.channels.cache.get(db.fetch(`destekK_${msg.guild.id}`)).name
  }
  
  if (db.has(`destekK_${msg.guild.id}`) === false) {
  kanal = k
  }
  
  if (db.has(`destekR_${msg.guild.id}`) === true) {
  rol = msg.guild.roles.cache.get(db.fetch(`destekR_${msg.guild.id}`))
  }
  
  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.name== kanal) {
     if (msg.author.bot) return;

    if (msg.guild.channels.cache.find(c => c.name === `destek-${msg.author.discriminator}`)) {
      
      msg.author.send(ssaa.replace("{kisi}", msg.author.tag).replace("{kanal}", `${msg.guild.channels.cache.get(msg.guild.channels.cache.find(c => c.name === `destek-${msg.author.discriminator}`).id)}`))
      msg.guild.channels.cache.find(c => c.name === `destek-${msg.author.discriminator}`).send(ssaa.replace("{kisi}", msg.author.id).replace("{sebep}", msg.content))
      
      msg.delete()
      return
    }
    if(msg.guild.channels.cache.find(c => c.name === "Destek Talepleri")) {
      msg.guild.channels.create(`destek-${msg.author.discriminator}`, { type: 'text', reason: 'New channel added for fun!' }).then(c => {
      const category = msg.guild.channels.cache.find(c => c.name === "Destek Talepleri")
      c.setParent(category.id)
	  if(rol) {
		let role = msg.guild.roles.cache.find(r => r.name === rol.name);	
		c.createOverwrite(role, {
			SEND_MESSAGES: true,
			VIEW_CHANNEL: true
		});		
	  }
      let role2 = msg.guild.roles.cache.find(r => r.name === "@everyone");
      c.createOverwrite(role2, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false
      });
      c.createOverwrite(msg.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
      });
	var str = '';
	msg.guild.members.cache.forEach((m) => {
		if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "dnd" && !m.user.bot) {
		  foo(`${client.emojis.cache.get('613740506001965069')} ${m.user.tag}\n`);
		}else if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "online" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740570443120655')} ${m.user.tag}\n`);
		}
		else if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "idle" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740464666968064')} ${m.user.tag}\n`);
		}else if (m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "offline" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740612369252364')} ${m.user.tag}\n`);
		}
	})

	function foo(value) {
		str += value;
	}
		
        
      const embed = new Discord.MessageEmbed()
      .setColor("B71C1C")
      .setThumbnail('https://techcrunch.com/wp-content/uploads/2015/05/fb-animal-gif.gif')
      .setAuthor(`Yeni bir destek talebi!`, client.user.avatarURL())
      .setTitle(`Merhaba ${msg.author.username}`)
     .addField(`📋**Bilgilendirme**`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`📌**Sebep** `, "```"+ `${msg.content}`+"```", true)
      .setFooter(`${msg.author.tag}`, msg.author.avatarURL())
       .setTimestamp()
      c.send(embed);
        var embeds = new Discord.MessageEmbed()
  .setColor("B71C1C")
  .setAuthor(`${msg.guild.name} - Sunucu Yetkilileri`)
  .setDescription(str.replace(msg.guild.owner.user.tag, `👑 **${msg.guild.owner.user.tag}**`))
  .setThumbnail(msg.guild.iconURL())
  .setFooter("NOT: Yetkililer online değilse en kısa sürede size geri döneceklerdir!")
        c.send(embeds)
        msg.delete()
}).catch(console.error);
    }
  }

  if (msg.channel.name== kanal) {
    if(!msg.guild.channels.cache.find(c => c.name === "Destek Talepleri")) {
      msg.guild.channels.create("Destek Talepleri", { type: 'category', reason: 'New channel added for fun!' }).then(category => {
      category.setPosition(1)
      let every = msg.guild.roles.cache.find(c => c.name === "@everyone");
      category.createOverwrite(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.channels.create(`destek-${msg.author.discriminator}`, { type: 'text', reason: 'New channel added for fun!' }).then(c => {
      c.setParent(category.id)
	  if(rol) {
		let role = msg.guild.roles.cache.find(c => c.name === rol.name);
		c.createOverwrite(role, {
			SEND_MESSAGES: true,
			VIEW_CHANNEL: true
		});		
	  }
      let role2 = msg.guild.roles.cache.find(c => c.name === "@everyone");
      c.createOverwrite(role2, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false
      });
      c.createOverwrite(msg.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
      });
      var str = '';

	msg.guild.members.cache.forEach((m) => {
		if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "dnd" && !m.user.bot) {
		  foo(`${client.emojis.cache.get('613740506001965069')} ${m.user.tag}\n`);
		}else if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "online" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740570443120655')} ${m.user.tag}\n`);
		}
		else if(m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "idle" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740464666968064')} ${m.user.tag}\n`);
		}else if (m.hasPermission("MANAGE_CHANNELS") && m.presence.status === "offline" && !m.user.bot){
		  foo(`${client.emojis.cache.get('613740612369252364')} ${m.user.tag}\n`);
		}
	})

	function foo(value) {
		str += value;
	}

        
      const embed = new Discord.MessageEmbed()
      .setColor("B71C1C")
      .setThumbnail('https://techcrunch.com/wp-content/uploads/2015/05/fb-animal-gif.gif')
      .setTitle(`Merhaba ${msg.author.username}`)
     .addField(`📋**Bilgilendirme**`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`📌**Sebep** `, "```"+ `${msg.content}`+"```", true)
      .setFooter(`${msg.author.tag}`, msg.author.avatarURL())
       .setTimestamp()
      c.send(embed);
        var embeds = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${msg.guild.name} - Sunucu Yetkilileri`)
  .setDescription(str.replace(msg.guild.owner.user.tag, `👑 **${msg.guild.owner.user.tag}**`))
  .setThumbnail(msg.guild.iconURL())
  .setFooter("NOT: Yetkililer online değilse en kısa sürede size geri döneceklerdir!")
        c.send(embeds)
        msg.delete()
}).catch(console.error);
    })
  }
}
})

client.on('message', async message => {
  
  if (!message.guild) return;
  
  let prefix = settings.prefix
  
  var s = 'tr'
  var r = 'Destek Ekibi'
  const dil = s
  
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
  if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);

  const embed = new Discord.MessageEmbed()
  .setColor("B71C1C")
  .setAuthor(`Destek talebi kapatılsınmı?`)
  .setDescription(`Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`Yeni bir destek talebi!`, client.user.avatarURL())
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
        message.channel.delete();
      })
      .catch(() => {
        m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});

client.on("message", async message => {
  
  if (!message.guild) return;
  
  let prefix = settings.prefix
  
  var s = 'tr'
  var r = 'Destek Ekibi'

  const dil = s
  
  if (message.content.toLowerCase().startsWith(`${prefix}talepleri-kapat`)) {
  
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`))) return;
  if (!message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))) return;
  
  if (db.has(`destekK_${message.guild.id}`) === true) {
  var kanal = message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)).name
  var rol = message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))
  }
  
  if (db.has(`destekK_${message.guild.id}`) === false) {
  var kanal = "destek-kanalı"
  var rol = "Destek Ekibi"
  }
    
  if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);
    
  if(message.member.roles.has(rol.toString().replace("<@&", "").toString().replace(">", "")) === false) return message.reply(`Bu komutu sadece ${rol} rolüne sahip kullanıcılar kullanabilir!`);

  const embed = new Discord.MessageEmbed()
  .setColor("B71C1C")
  .setAuthor(`Tüm Destek Talepleri Kapatma İşlemi!`)
  .setDescription(`Tüm Destek taleplerini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`Yeni bir destek talebi!`, client.user.avatarURL())
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
   try {
    message.guild.channels.filter(c => c.name.startsWith('destek-')).forEach(async (kanal, id) => {
     kanal.delete()
  });
  } catch(e){
      //console.log(e.stack);
  }
    })
      .catch(() => {
        m.edit('Tüm Destek taleblerini kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});






//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//                              OTO - ROL
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

client.on("guildMemberAdd", member => {
  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.cache.get(db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  member.roles.add(rol); 
})


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬





//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//                               GİRİŞ - ÇIKIŞ
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
client.on("guildMemberAdd", async member => {
  
  if (!member.guild) return;
  
  let prefix = settings.prefix
  
  if(db.has(`gc_${member.guild.id}`) === false) return;
  
  const hgK = member.guild.channels.cache.get(db.fetch(`gc_${member.guild.id}`).replace("<#", "").replace(">", ""));
  if (!hgK) return;
    
    hgK.send(`<@${member.user.id}> **Aramıza katıldı! Hoşgeldin Aramıza** :yum: :tada:`);
});

client.on("guildMemberRemove", async member => {
  
  if (!member.guild) return;
  
  let prefix = settings.prefix
  
  if(db.has(`gc_${member.guild.id}`) === false) return;
  
  const hgK = member.guild.channels.cache.get(db.fetch(`gc_${member.guild.id}`).replace("<#", "").replace(">", ""));
  if (!hgK) return;
    
  hgK.send(`**${member.user.username}** Aramızdan ayrıldı! :frowning:`);
});


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

