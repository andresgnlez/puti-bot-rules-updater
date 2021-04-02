const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

const RULES = require('./rules');

const embedMessage = new Discord.MessageEmbed({
  "title": "Puti rules",
  "description": RULES.join('\n'),
  "color": 15844367,
  "timestamp": new Date(),
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/102848784530173952/23359c089d28a7f0371b499e79276d75.png?size=32"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/icons/102854864022831104/3cf1daac63431a34cd5a998b26d94465.png?size=128"
  },
  "image": {
    "url": "https://i.pinimg.com/originals/e8/90/be/e890bec9935409a1bceedc5ab6f68e88.gif"
  },
  "author": {
    "name": "Kyrie#5770",
    "icon_url": "https://cdn.discordapp.com/avatars/102848784530173952/23359c089d28a7f0371b499e79276d75.png?size=64"
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const putiServer = client.guilds.cache.get(process.env.PUTI_SERVER_ID);
  const putiBotChannel = putiServer.channels.cache.get(process.env.PUTI_BOT_CHANNEL_ID);
  const rulesChannel = putiServer.channels.cache.get(process.env.RULES_CHANNEL_ID);

  const channelToSend = process.env.NODE_ENV === 'test' ?
    putiBotChannel : rulesChannel;

  channelToSend.send(embedMessage)
    .then(() => {
      console.log('message sent');
    })
    .catch((e) => console.error(`Something went wrong updating the rules: ${e.message}`))
});

client.login(process.env.CLIENT_ID);
