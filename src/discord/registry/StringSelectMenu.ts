import type { StringSelectMenuInteraction } from "discord.js";

export abstract class StringSelectMenu {
    public readonly customId: string;
    public abstract execute(interaction: StringSelectMenuInteraction): Promise<void>;

    public readonly startsWith: boolean;

    constructor(customId: string, startsWith: boolean = false) {
        this.customId = customId;
        this.startsWith = startsWith;
    }
}
