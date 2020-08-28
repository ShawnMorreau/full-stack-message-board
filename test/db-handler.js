const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');

const mongod = new MongoMemoryServer;

module.exports.connect = async () => {
    try {
        const url = await mongod.getConnectionString();
        console.log(url);
        const mongooseOpts = {
            autoReconnect: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            reconnectInterval: 1000,
            reconnectTries: 100,
        };
        await mongoose.connect(url, mongooseOpts);
    } catch (error) {
        console.log(error);
    }
}
module.exports.closeDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase;
        await mongoose.connection.close();
        await mongod.stop();
    } catch (err) {
        console.log(err);
    }
}
module.exports.clearDatabase = async () => {
    try {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany;
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = exports;