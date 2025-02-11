const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const rawdata = fs.readFileSync('config/config.json');
const config = JSON.parse(rawdata);
const botdata = fs.readFileSync('config/bot_ui.json');
const embeddata = fs.readFileSync('config/embed_ui.json');
const channeldata = fs.readFileSync('config/channels.json');
const channelid = JSON.parse(channeldata);
const embedui = JSON.parse(embeddata);
const botui = JSON.parse(botdata);
module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(message) {
        function SendEmbed() {
            const log = message.guild.channels.cache.get(channelid.log);
            const author = message.author;
            const content = message.content;
            const msgChan = message.channel.name;
            const embed = new EmbedBuilder()
                .setColor(embedui.deleted.color)
                .setTitle(embedui.deleted.title)
                .addFields(
                    { name: `${embedui.deleted.author}`, value: `${author}`, inline: true },
                    { name: `${embedui.deleted.channel}`, value: `#${msgChan}`, inline: true },
                    { name: " ", value: " " },
                    { name: `${embedui.created.content}`, value: `${content}` },
                )
                .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
                .setTimestamp()
                .setFooter({ text: `${botui.name}`, iconURL: `${botui.icon}` });
            log.send({ embeds: [embed] });
        }
        SendEmbed();
    }
};