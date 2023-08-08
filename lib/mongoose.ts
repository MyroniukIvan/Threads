import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        return console.log('not connected, mongodb url is not found')
    }
    if (isConnected) {
        return console.log('Connected to the DB')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
            isConnected = true;
            console.log('connected to the DB')
    } catch (e) {

    }
}
