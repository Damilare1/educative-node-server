import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_CLIENT: process.env.DB_CLIENT
}

export const serverPort = process.env.HOST_SERVER_PORT;
export const db = dbConfig;
export const jwt_secret = process.env.JWT_SECRET;
export const session_secret = process.env.SESSION_SECRET;