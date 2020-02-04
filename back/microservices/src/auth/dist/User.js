"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'blabla';
const UserSchema = new mongoose_1.Schema({
    id_user: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
exports.UserModel = mongoose_1.model('user', UserSchema);
