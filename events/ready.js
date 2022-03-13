const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../settings.json');

var prefix = settings.prefix;


module.exports = client => {
  console.log(`${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("dnd");
  //idle = boşta
  //dnd = rahatsız etmeyin
  //online = çevrimiçi
  console.log(`                                                                                               Bot Başarılı bir şekilde açıldı!                                     `)
  client.user.setActivity(`${prefix}yardım | ${client.guilds.cache.size} sunucu | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcıyı`, { type: "LISTENING"});
  //LISTENING = DİNLİYOR
  //WATCHING = İZLİYOR
  //PLAYING = OYNUYOR 
  console.log(`${client.user.username}: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
};

