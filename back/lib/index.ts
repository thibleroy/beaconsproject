import * as DotEnv from 'dotenv';
DotEnv.config({path: './../.env'});
export interface Environnement {
    name?: string;
    version?: string;
    git?: string;
    db_url?: string;
    db_port?: number;
    api_port?: number,
    db_name?: string,
    kafka_url?: string,
    kafka_port?: string,
    kafka_topic_auth?: string,
    kafka_topic_beacon?: string,
    kafka_topic_client?: string,
    kafka_topic_documentation?: string,
    kafka_topic_logger?: string
}

export interface IBeacon {
    id_beacon?: string;
    uuid?: string;
    minor?: number;
    major?: number;
    name?: string;
    id_client?: string;
    id_content?: string;
}
export interface IClient {
    id_client?: string;
    name?: string;
}

export interface IUser {
    email?: string;
    username?: string
    password?: string;
    createdAt?: Date;
}

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
