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
}
exports.Beacon = Beacon;
