import * as DotEnv from 'dotenv';
import {Environnement} from '@entities/interfaces';
DotEnv.config({path: '@src/.env'});
export const ENV: Environnement = {
    name: String(process.env.NAME),
    version: String(process.env.VERSION),
    git: String(process.env.GIT),
    db_port: Number(process.env.DB_PORT),
    db_url: String(process.env.DB_URL),
    api_port: Number(process.env.API_PORT),
    db_name: String(process.env.DB_NAME),
    kafka_url: String(process.env.KAFKA_URL),
    kafka_port: String(process.env.KAFKA_PORT),
    kafka_topic_auth: String(process.env.KAFKA_TOPIC_AUTH),
    kafka_topic_beacon: String(process.env.KAFKA_TOPIC_BEACON),
    kafka_topic_client: String(process.env.KAFKA_TOPIC_CLIENT),
    kafka_topic_documentation: String(process.env.KAFKA_TOPIC_DOCUMENTATION),
    kafka_topic_logger: String(process.env.KAFKA_TOPIC_LOGGER)
};
