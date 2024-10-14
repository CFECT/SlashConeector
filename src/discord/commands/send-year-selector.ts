import { CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, Team, ChatInputCommandInteraction, codeBlock, GuildChannel, CategoryChannel, TextChannel, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../registry/Command";

export default class SendYearSelectorCommand extends Command {
    constructor() {
        super("send-year-selector", "Sends a year selector message");
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });

        const channel = interaction.options.getChannel("channel") as TextChannel;
        if (!channel) {
            await interaction.editReply("Invalid channel.");
            return;
        }

        const text = "Escolhe a tua role de ano aqui"
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("yearSelectMenu")
            .setPlaceholder("Escolhe o teu ano")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                { label: "1º Ano", value: "1" },
                { label: "2º Ano", value: "2" },
                { label: "3º Ano", value: "3" },
                { label: "4º Ano", value: "4" },
                { label: "5º Ano", value: "5" },
            ]);
        const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

        await channel.send({ content: text, components: [actionRow] });
        await interaction.editReply("Message sent.");
    }
}
