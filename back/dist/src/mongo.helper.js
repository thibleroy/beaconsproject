"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
class MongoHelper {
    constructor() {
    }
    static connect(url) {
        return new Promise((resolve, reject) => {
            mongodb_1.default.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }
    disconnect() {
        MongoHelper.client.close();
    }
}
exports.MongoHelper = MongoHelper;
