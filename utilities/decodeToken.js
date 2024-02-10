import jwt from "jsonwebtoken";
import getConfig from "next/config";
const decodeToken = (token) => {
    const { publicRuntimeConfig } = getConfig();
    const token_secret = publicRuntimeConfig.TOKEN_SECRET;
    try {
        const id = jwt.verify(token, token_secret);
        return id;
    } catch (error) {
        console.error("Error while decoding token.")
    }
}

export default decodeToken;