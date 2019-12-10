"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("../mongo.helper");
exports.getCollection = (name) => {
    return mongo_helper_1.MongoHelper.client.db('activiot').collection(name);
};
