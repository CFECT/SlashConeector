import { GuildMember, StringSelectMenuInteraction } from "discord.js";
import { StringSelectMenu } from "../registry/StringSelectMenu";
import Constants from "../../Constants";

export default class YearSelectMenu extends StringSelectMenu {
    constructor() {
        super("yearSelectMenu", true);
    }

    public async execute(interaction: StringSelectMenuInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.guild || interaction.guild.id !== Constants.GUILD_ID) {
            await interaction.editReply("Este menu só pode ser utilizado no servidor do NEECT.");
            return;
        }
        if (!interaction.values || interaction.values.length === 0) {
            await interaction.editReply("Por favor seleciona um ano.");
            return;
        }

        const year = interaction.values[0];

        const user = interaction.member as GuildMember;
        if (!user) {
            await interaction.editReply("Algo correu mal. Por favor tenta novamente.");
            return;
        }

        user.fetch();
        const currentRole = user.roles.cache.find(role => Constants.ROLES.ANO.includes(role.id));
        if (currentRole) {
            await user.roles.remove(currentRole);
        }
        await user.roles.add(Constants.ROLES.ANO[parseInt(year) - 1]);

        await interaction.editReply(`Foi-te atribuída a role de ${year}º ano.`);
    }
}
