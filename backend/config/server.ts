import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 8081;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

export const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}
