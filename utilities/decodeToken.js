import jwt from "jsonwebtoken";

const decodeToken = (token, token_secret) => {
    try {
        const id = jwt.verify(token, token_secret);
        return id;
    } catch (error) {
        console.error("Error while decoding token.")
    }
}

export default decodeToken;