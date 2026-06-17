const { MongoClient } = require("mongodb")

let db;

const connectDB = async () => {
    const client = new MongoClient(process.env.Mongo_URL)
    await client.connect();
    db = client.db(process.env.DB_NAME)
    console.log("DB connected")
};


const getDB = () => db;

module.exports = {
    connectDB,
    getDB,
}
