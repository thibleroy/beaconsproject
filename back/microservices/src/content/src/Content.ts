import {Schema, model} from 'mongoose';
import {IContent} from 'lib';

const ContentSchema: Schema = new Schema({
    id_content: {
        type: String,
        default: ''
    },
    content: {
        type: String,
    },
    id_beacon: {
        type: String,
    },
    timestamp: {
        type: Number,
    },
});

ContentSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};


export const ContentModel = model('content', ContentSchema);
