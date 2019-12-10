"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_functions_1 = require("../functions/mongo.functions");
const r = express_1.default.Router();
r.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
r.get('/client/:id', (req, res) => {
    const collection = mongo_functions_1.getCollection('clients');
    collection.find({}).toArray((err, items) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        }
        else {
            items = items.map((item) => { return { id: item._id, description: item.description }; });
            res.json(items);
        }
    });
});
r.get('clients', (req, res) => {
    const collection = mongo_functions_1.getCollection('clients');
    collection.find({}).toArray((err, items) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        }
        else {
            items = items.map((item) => { return { id: item._id, description: item.description }; });
            res.json(items);
        }
    });
});
exports.clientRouter = r;
