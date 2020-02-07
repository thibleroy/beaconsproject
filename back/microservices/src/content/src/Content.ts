import {IContentDocument} from './document'
import {ENV, IContent} from 'lib';
import {InitiateMongoServer} from 'msconnector/mongo.helper';
import {Schema, model} from 'mongoose';

InitiateMongoServer(ENV.db_url+':'+ENV.db_port)

const ContentSchema: Schema = new Schema({
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

ContentSchema.methods.convert = function() : IContent {
    return {
        id_content : this._id,
        content : this.content,
        id_beacon : this.id_beacon,
        timestamp : this.timestamp
      }
}

export const ContentModel = model<IContentDocument>('content', ContentSchema);
