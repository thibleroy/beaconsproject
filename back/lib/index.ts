export interface Environnement {
    name?: string;
    version?: string;
    git?: string;
    db_url?: string;
    db_port?: number;
    api_port?: number,
    db_name?: string,
    kafka_url?: string,
    kafka_port?: number,
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
    name: 'Beacons manager',
    version: '1.0',
    git: 'https://gitlab.istic.univ-rennes1.fr/activiot/beaconsproject',
    db_port: 27017,
    db_url: '52.91.214.113',
    api_port: 3000,
    db_name: 'activiot',
    kafka_url: '172.31.83.86',
    kafka_port: 32768,
    kafka_topic_auth: 'auth',
    kafka_topic_beacon: 'beacon',
    kafka_topic_client: 'client',
    kafka_topic_documentation: 'doc',
    kafka_topic_logger: 'logger'
};
