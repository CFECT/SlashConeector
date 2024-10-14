import type { Client, Interaction } from "discord.js";
import CommandRegistry from "../registry/CommandRegistry";
import ButtonRegistry from "../registry/ButtonRegistry";
import StringSelectMenuRegistry from "../registry/StringSelectMenuRegistry";
import ModalRegistry from "../registry/ModalRegistry";

export function run(_: Client, interaction: Interaction) {
    if (interaction.isChatInputCommand()) runCommand(_, interaction);
    else if (interaction.isButton()) runButton(_, interaction);
    else if (interaction.isStringSelectMenu()) runStringSelectMenu(_, interaction);
    else if (interaction.isModalSubmit()) runModalSubmit(_, interaction);
}

function runCommand(_: Client, interaction: Interaction) {
    // If the interaction is not a command, return
    if (!interaction.isChatInputCommand()) return;

    // Get the command from the collection
    const command = CommandRegistry.getCommand(interaction.commandName);

    // If the command does not exist, return
    if (!command) {
        interaction.reply({ content: "Command not found.", ephemeral: true });
        return;
    }

    // Try to run the command
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
}

function runButton(_: Client, interaction: Interaction) {
    // If the interaction is not a button, return
    if (!interaction.isButton()) return;

    // Get the button from the collection
    const button = ButtonRegistry.getButton(interaction.customId);

    // If the button does not exist, return
    if (!button) {
        interaction.reply({ content: "Button not found.", ephemeral: true });
        return;
    }

    // Try to run the button
    try {
        button.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this button!", ephemeral: true });
    }
}

function runStringSelectMenu(_: Client, interaction: Interaction) {
    // If the interaction is not a string select menu, return
    if (!interaction.isStringSelectMenu()) return;

    // Get the string select menu from the collection
    const stringSelectMenu = StringSelectMenuRegistry.getStringSelectMenu(interaction.customId);

    // If the string select menu does not exist, return
    if (!stringSelectMenu) {
        interaction.reply({ content: "String select menu not found.", ephemeral: true });
        return;
    }

    // Try to run the string select menu
    try {
        stringSelectMenu.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this string select menu!", ephemeral: true });
    }
}

function runModalSubmit(_: Client, interaction: Interaction) {
    // If the interaction is not a modal submit, return
    if (!interaction.isModalSubmit()) return;

    // Get the modal from the collection
    const modal = ModalRegistry.getModal(interaction.customId);

    // If the modal does not exist, return
    if (!modal) {
        interaction.reply({ content: "Modal not found.", ephemeral: true });
        return;
    }

    // Try to run the modal
    try {
        modal.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this modal!", ephemeral: true });
    }
}
