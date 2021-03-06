const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const Model = require('./model');
let db;

class Db {
    async connect() {
        if (!db) {
            db = await MongoClient.connect(config.db.url);
            this.Chat = new Model(db, 'chat');
            this.Message = new Model(db, 'message');
        }
    }
};

module.exports = new Db();