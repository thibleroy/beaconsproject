import {ENV, IBeacon} from 'lib';
import {InitiateMongoServer} from 'msconnector/mongo.helper';
import {IBeaconDocument} from './document';
import {Schema, model} from 'mongoose';


InitiateMongoServer(ENV.db_url+':'+ENV.db_port)

const BeaconSchema: Schema = new Schema({
    name: {
        type: String,
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

BeaconSchema.methods.convert = function() : IBeacon {
    return {
        id_beacon: this._id,
        uuid: this.uuid,
        minor: this.minor,
        major: this.major,
        name: this.name,
        id_client: this.id_client,
        id_content: this.id_content
      }
}

export const BeaconModel = model<IBeaconDocument>('beacon', BeaconSchema);
