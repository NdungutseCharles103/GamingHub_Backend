import { ConnectOptions, Mongoose } from 'mongoose';

const mongoose = new Mongoose();

export default async function dbConnect(db:string) {
    console.log(`Connecting to ${db}`);
    
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions ).then(() => {
        console.log('Connected to MongoDB');
        return true;
    }
    ).catch(err => {
        console.log(err);
        return false;
    }
    );
}