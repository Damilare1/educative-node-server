import dotenv from 'dotenv'
dotenv.config()

export const serverPort = process.env.HOST_SERVER_PORT;
export const jwt_secret = process.env.JWT_SECRET;
export const session_secret = process.env.SESSION_SECRET;
export const apiUrl = process.env.API_URL;
export const env = process.env.NODE_ENV ?? "development"
