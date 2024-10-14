import { type Client, type GuildMember } from "discord.js";
import Logger from "../../Logger";
import Constants from "../../Constants";

export function run(client: Client, member: GuildMember) {
    if (member.user.bot) return;
    if (member.guild.id !== Constants.GUILD_ID) return;
    member.roles.add(Constants.ROLES.CT).catch((error) => {
        Logger.error(`Error while adding role to member ${member.id}: ${error}`);
    });
}
