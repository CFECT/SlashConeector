import { Routes, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { REST } from "@discordjs/rest"
require("dotenv").config();

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
    console.error("Missing environment variables. Please check your .env file.");
    process.exit(1);
}

const global_commands = [
    new SlashCommandBuilder().setName('eval').setDescription('Evaluates javascript code')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    new SlashCommandBuilder().setName('send-year-selector').setDescription('Sends a year selector message')
        .addChannelOption(option => option.setName('channel').setDescription('Channel to send the message to').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token!);

rest.put(Routes.applicationCommands(clientId!), { body: global_commands })
    .then((data: any) => console.log(`Successfully registered ${data.length} global application commands.`))
    .catch(console.error);

