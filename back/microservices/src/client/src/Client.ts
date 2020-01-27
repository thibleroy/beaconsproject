import {Schema, model} from 'mongoose';
import {IClient} from 'lib';

const ClientSchema: Schema = new Schema({
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
ClientSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};


export const ClientModel = model('client', ClientSchema);
