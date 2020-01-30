import {Schema, model} from 'mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema: Schema = new Schema({
    id_beacon: {
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

export const UserModel = model('user', UserSchema);
