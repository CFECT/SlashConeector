import { ColorResolvable } from "discord.js"
import dotenv from 'dotenv';

dotenv.config();

type EmbedColorsType = {
    ACCEPTED: ColorResolvable,
    DENIED: ColorResolvable
}

class Constants {
    static EMBED_COLORS: EmbedColorsType = {
        ACCEPTED: "#00FF00",
        DENIED: "#FF0000",
    }

    static GUILD_ID = process.env.GUILD_ID as string;

    static ROLES = {
        CT: process.env.CT_ROLE_ID as string,
        ANO: [
            process.env.ANO1_ROLE_ID as string,
            process.env.ANO2_ROLE_ID as string,
            process.env.ANO3_ROLE_ID as string,
            process.env.ANO4_ROLE_ID as string,
            process.env.ANO5_ROLE_ID as string,
        ]
    }
}

export default Constants;
