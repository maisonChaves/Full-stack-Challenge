const ObjectId = require('mongodb').ObjectID;

class Model {
    constructor(db, collectionName) {
        this.name = collectionName;
        this.db = db;
    }

    async insertOne(data) {
        const operation = await this.db.collection(this.name).insertOne(data);
        if (operation.result.ok !== 1 || operation.ops.length !== 1) {
            throw new Error('Db insertOne error');
        }
        return operation.ops[0];
    }

    async find(query) {
        const result = await this.db.collection(this.name).find(query);
        if (!result) {
            throw new Error('Db find error');
        }

        return result.toArray();
    }

    async findOneById(id) {
        let query = {
            "id": id
        }
        const result = await this.db.collection(this.name).findOne(query);
        if (!result) {
            throw new Error('Db findOneById error');
        }
        return result;
    }

    async save(data) {
        const operation = await this.db.collection(this.name).save(data);
        if (operation.result.ok !== 1) {
            throw new Error('Db save error');
        }
    }
}

module.exports = Model;