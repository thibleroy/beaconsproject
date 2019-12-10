"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_functions_1 = require("../functions/mongo.functions");
const r = express_1.default.Router();
r.get('/beacons', (req, res) => {
    const collection = mongo_functions_1.getCollection('beacons');
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
r.get('/beacon/:id', (req, res) => {
    const collection = mongo_functions_1.getCollection('beacons');
    console.log(req.baseUrl);
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
r.post('/beacons', (req, res) => {
    // const b: Beacon = req.body;
    res.json({ beacon_id: 'test' });
});
r.delete('/beacon:id', (req, res) => {
});
exports.router = r;
