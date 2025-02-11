const { EmbedBuilder } = require('discord.js');
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
    name: 'messageCreate',
    once: false,
    async execute(message) {
        function SendEmbed() {
            const log = message.guild.channels.cache.get(channelid.log);
            const author = message.author;
            const content = message.content;
            const msgChan = message.channel.name;
            const embed = new EmbedBuilder()
                .setColor(embedui.created.color)
                .setTitle(embedui.created.title)
                .addFields(
                    { name: `${embedui.created.author}`, value: `${author}`, inline: true },
                    { name: `${embedui.created.channel}`, value: `#${msgChan}`, inline: true },
                    { name: " ", value: " " },
                    { name: `${embedui.created.content}`, value: `${content}` },
                )
                .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
                .setTimestamp()
                .setFooter({ text: `${botui.name}`, iconURL: `${botui.icon}` })
            
            if (message.author.id == "1315313738982625280") {
                return;
            } else {
                if (log) {
                    log.send({ embeds: [embed] });
                } else {
                    console.error("channelid.log is undefined or null");
                }
            }
        }
        SendEmbed();
    }
};
