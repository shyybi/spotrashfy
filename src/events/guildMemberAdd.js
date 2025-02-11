const { ActivityType, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

const botdata = fs.readFileSync('config/bot_ui.json');
const channeldata = fs.readFileSync('config/channels.json');
const embeddata = fs.readFileSync('config/embed_ui.json');

const botui = JSON.parse(botdata);
const channelid = JSON.parse(channeldata);
const embedui = JSON.parse(embeddata);

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member, client) {
        const channel = member.guild.channels.cache.get(channelid.welcome);
        if (!channel) {
            console.error("Le canal de bienvenue n'a pas été trouvé.");
            return;
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(embedui.welcome.button.rules.label)
                .setStyle(ButtonStyle.Link)
                .setURL(embedui.welcome.button.rules.url)
                .setEmoji('📖'),
            new ButtonBuilder()
                .setLabel(embedui.welcome.button.announcements.label)
                .setStyle(ButtonStyle.Link)
                .setURL(embedui.welcome.button.announcements.url)
                .setEmoji('📚'),
        );


        const welcome = new EmbedBuilder()
            .setColor(embedui.welcome.color)
            .setTitle(embedui.welcome.title)
            .setDescription(embedui.welcome.description + member.user.username + " !")
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${botui.name}`, iconURL: `${botui.icon}` })
            channel.send({ content:embedui.welcome.message + member.user.username,embeds: [welcome], components: [row] }).catch(console.error);
    },
};