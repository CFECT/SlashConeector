import { readdirSync } from "fs";
import { Client, IntentsBitField, Partials } from 'discord.js';
import CommandRegistry from "./registry/CommandRegistry";
import ButtonRegistry from "./registry/ButtonRegistry";
import StringSelectMenuRegistry from "./registry/StringSelectMenuRegistry";
import ModalRegistry from "./registry/ModalRegistry";

class DiscordBot {
    private client: Client;

    constructor() {
        const flags = IntentsBitField.Flags
        this.client = new Client({
            intents: [
                flags.Guilds,
                flags.GuildMembers,
                flags.MessageContent,
                flags.GuildMessages,
                flags.DirectMessages
            ],
            partials: [
                Partials.Channel,
                Partials.Message
            ]
        });
    }

    public async start(token: string): Promise<void> {
        this.registerEvents();
        CommandRegistry.registerCommands();
        ButtonRegistry.registerButtons();
        StringSelectMenuRegistry.registerStringSelectMenus();
        ModalRegistry.registerModals();
        await this.client.login(token);
    }

    private registerEvents() {
        readdirSync(__dirname + "/events").forEach((file) => {
            const event = require(__dirname + `/events/${file}`);
            this.client.on(file.split(".")[0]!, (...args) => event.run(this.client, ...args));
        });
    }
}

export default DiscordBot;
