import dotenv from 'dotenv'
import {Environnement} from "@entities/interfaces";
dotenv.config({path: '@src/.env'});
export const ENV: Environnement = {
    name: String(process.env.NAME),
    version: String(process.env.VERSION),
    git: String(process.env.GIT),
    db_port: Number(process.env.DB_PORT),
    db_url: String(process.env.DB_URL),
    api_port: Number(process.env.API_PORT),
    db_name: String(process.env.DB_NAME)
};
