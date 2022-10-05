import { mongoose } from "@typegoose/typegoose";

export async function connectDB() {

    const db = await mongoose.connect('mongodb+srv://mongo:123...%40bcD.@cluster0.nsrarlo.mongodb.net/test');
    console.log("database is connected", db.connection.db.databaseName)

}   
