import {Schema, model} from 'mongoose';

const BeaconSchema: Schema = new Schema({
    id_beacon: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    minor: {
        type: Number,
        required: true
    },
    major: {
        type: Number,
        required: true
    },
    id_client: {
        type: String
    },
    id_content: {
        type: String
    }
});

export const BeaconModel = model('beacon', BeaconSchema);
