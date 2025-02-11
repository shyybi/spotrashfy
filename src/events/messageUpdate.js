const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const rawdata = fs.readFileSync('config/config.json');
const config = JSON.parse(rawdata);
const embeddata = fs.readFileSync('config/embed_ui.json');
const botdata = fs.readFileSync('config/bot_ui.json');
const channeldata = fs.readFileSync('config/channels.json');
const channelid = JSON.parse(channeldata);
const embedui = JSON.parse(embeddata);
const botui = JSON.parse(botdata);
module.exports = {
  name: "messageUpdate",
  once: false, 
  async execute(oldMessage, newMessage, message) {
    function SendEmbed() {
      const log = oldMessage.guild.channels.cache.get(channelid.log);
      const author = oldMessage.author;
      const content = oldMessage.content;
      const msgChan = oldMessage.channel.name;
      const newContent = newMessage.content;
      const embed = new EmbedBuilder()
        .setColor(embedui.updated.color)
        .setTitle(embedui.updated.title)
        .addFields(
          { name: `${embedui.updated.author}`, value: `${author}`, inline: true },
          { name: `${embedui.updated.channel}`, value: `#${msgChan}`, inline: true },
          { name: " ", value: " " },
          { name: `${embedui.updated.oldcontent}`, value: `${content}` },
          { name: `${embedui.updated.newcontent}`, value: `${newContent}` },
        )
        .setThumbnail("https://cdn.discordapp.com/avatars/"+ oldMessage.author.id+"/"+ oldMessage.author.avatar+".jpeg")
        .setTimestamp()
        .setFooter({ text: `${botui.name}`, iconURL: `${botui.icon}` });
      log.send({ embeds: [embed] });
    }
    SendEmbed();  
  },
};
