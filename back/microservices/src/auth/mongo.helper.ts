import {connect, disconnect} from 'mongoose';

export const InitiateMongoServer = async (url: string) => {
    try {
        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !");
    } catch (e) {
        console.log(e);
        throw e;
    }
};
export const disconnectFromDB = async () => {
    try {
        await disconnect();
        console.log('Disconnected from DB !');
    } catch (e) {
        console.log(e);
        throw e;
    }
};
