const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const rawdata = fs.readFileSync('config/config.json');
const config = JSON.parse(rawdata);

const embeddata = fs.readFileSync('config/embed_ui.json');
const botdata = fs.readFileSync('config/bot_ui.json');
const embedui = JSON.parse(embeddata);
const botui = JSON.parse(botdata);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription("Get our network's pages"),
    run: async (client, interaction) => {
        
		const loginHandler = "http://163.5.159.110:8888/login"

		const loginEmbed = new EmbedBuilder()
			.setColor("#00FF00")
			.setTitle("Spotify Login")
			.setDescription("You must click on the button below the embed to login");

        const loginButton = new ButtonBuilder()
            .setLabel('Login')
            .setURL(loginHandler)
            .setStyle(ButtonStyle.Link);


        const row = new ActionRowBuilder().addComponents(loginButton);

		try {
			await interaction.reply({ embeds: [loginEmbed], components: [row] });
		} catch (error) {
			console.error('Error replying to interaction:', error);
		}
    },
};
