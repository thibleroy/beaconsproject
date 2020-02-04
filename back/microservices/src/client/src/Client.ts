import {Schema, model} from 'mongoose';
import {IClient} from 'lib';

const ClientSchema: Schema = new Schema({
    id_client: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    url: {
        type: String,
    },
    img: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
});
ClientSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};


export const ClientModel = model('client', ClientSchema);
