import {Schema, model, Document} from 'mongoose';
import {IUser} from '@entities/interfaces';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const UserModel = model('user', UserSchema);
