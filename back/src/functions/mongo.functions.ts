import {MongoHelper} from "../mongo.helper";

export const getCollection = (name: string) => {
    return MongoHelper.client.db('activiot').collection(name);
};
