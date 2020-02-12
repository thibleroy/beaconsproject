export interface Environnement {
    name: string;
    version: string;
    git: string;
    db_url: string;
    db_port: number;
    api_port: number,
    db_name: string,
    kafka_url: string,
    kafka_port: number,
    kafka_topic_auth: string,
    kafka_topic_beacon: string,
    kafka_topic_client: string,
    kafka_topic_content:string,
    kafka_topic_documentation: string,
    kafka_topic_logger: string,
    kafka_request: string,
    kafka_response: string,
    kafka_action_list: string,
    kafka_action_read: string,
    kafka_action_update: string,
    kafka_action_delete: string,
    kafka_action_create: string,
    jwt_key:string
}

export interface IBeacon {
    id_beacon: string;
    uuid: string;
    minor: number;
    major: number;
    name: string;
    id_client: string;
    id_content?: string;
}

export interface IClient {
    id_client: string;
    name: string;
    url:string;
    img:string;
    lat:number;
    lng:number;
    address:string;
}

export interface IUser {
    id_user: string;
    email: string;
    password: string;
    name: string;
    id_client?: string;
}

export interface IContent {
    id_content: string;
    content: string;
    id_beacon: string;
    timestamp: number;
}

export const ENV: Environnement = {
    name: 'Beacons manager',
    version: '1.0',
    git: 'https://gitlab.istic.univ-rennes1.fr/activiot/beaconsproject',
    db_port: 27017,
    db_url: 'mongodb://ec2-3-91-15-133.compute-1.amazonaws.com',
    api_port: 3000,
    db_name: 'activiot',
    kafka_url: 'ec2-3-91-15-133.compute-1.amazonaws.com',
    kafka_port: 32770,
    kafka_topic_auth: 'auth',
    kafka_topic_beacon: 'beacon',
    kafka_topic_client: 'client',
    kafka_topic_content: 'content',
    kafka_topic_documentation: 'doc',
    kafka_topic_logger: 'logger',
    kafka_request: 'req',
    kafka_response: 'res',
    kafka_action_list: 'list',
    kafka_action_read: 'read',
    kafka_action_update: 'update',
    kafka_action_delete: 'delete',
    kafka_action_create: 'create',
    jwt_key:'activkey'
};
