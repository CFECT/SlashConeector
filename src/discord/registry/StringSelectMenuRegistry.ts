import { readdirSync } from "fs";
import { resolve } from "path";
import { Collection } from "discord.js";
import { StringSelectMenu } from "./StringSelectMenu";
import Logger from "../../Logger";

class StringSelectMenuRegistry {
    private stringSelectMenus: Collection<string, StringSelectMenu> = new Collection();

    private get stringSelectMenusDir(): string {
        return resolve(__dirname, "..", "stringSelectMenus");
    }

    private getStringSelectMenuFile(name: string): string {
        return resolve(this.stringSelectMenusDir, name);
    }

    public registerStringSelectMenus() {
        // Read all files in the stringSelectMenus folder
        // Each file has a run function that takes in the interaction
        const registeredStringSelectMenus: string[] = [];
        readdirSync(this.stringSelectMenusDir).forEach((file) => {
            const stringSelectMenuFile = require(this.getStringSelectMenuFile(file));
            if (!stringSelectMenuFile.default) return;
            const stringSelectMenu = new stringSelectMenuFile.default();
            if (stringSelectMenu instanceof StringSelectMenu) {
                const stringSelectMenuName = stringSelectMenu.customId;
                if (registeredStringSelectMenus.includes(stringSelectMenuName)) throw new Error(`Duplicate stringSelectMenu name: ${stringSelectMenuName}`);
                registeredStringSelectMenus.push(stringSelectMenuName);
                this.setStringSelectMenu(stringSelectMenuName, stringSelectMenu);
            }
        });
        Logger.info(`Registered ${registeredStringSelectMenus.length} stringSelectMenus: ${registeredStringSelectMenus.join(", ")}`);
    }

    private setStringSelectMenu(stringSelectMenuCustomId: string, stringSelectMenu: StringSelectMenu): void {
        this.stringSelectMenus.set(stringSelectMenuCustomId, stringSelectMenu);
    }

    public getStringSelectMenu(customId: string): StringSelectMenu | undefined {
        const stringSelectMenu = this.stringSelectMenus.find((stringSelectMenu) => (stringSelectMenu.customId === customId) || (stringSelectMenu.startsWith && customId.startsWith(stringSelectMenu.customId)));
        return stringSelectMenu;
    }

    public getStringSelectMenus(): Collection<string, StringSelectMenu> {
        return this.stringSelectMenus;
    }
}

export default new StringSelectMenuRegistry();
