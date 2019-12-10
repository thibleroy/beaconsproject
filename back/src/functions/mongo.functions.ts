import {MongoHelper} from "../helpers/mongo.helper";

export const getCollection = (name: string) => {
    return MongoHelper.client.db('activiot').collection(name);
};
