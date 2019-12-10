"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Beacon {
    constructor(uuid, minor, major, id_client, name) {
        this.uuid = uuid;
        this.minor = minor;
        this.major = major;
        this.id_client = id_client;
        this.name = name;
    }
    toString() {
        return JSON.stringify({ uuid: this.uuid, minor: this.minor, major: this.major, name: this.name, id_client: this.id_client });
    }
}
exports.Beacon = Beacon;
