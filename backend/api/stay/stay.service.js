const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function query(filterBy = {}) {
    // {$and:[{'price':{ $lte: 250 }},{'capacity':{$gte:5}}]}
    try {
        const criteria = _buildCriteria(filterBy);
        let collection = await dbService.getCollection("stay");
        const stays = await collection.find(criteria).toArray();
        return stays;
    } catch (err) {
        logger.error("cannot find stays", err);
        throw err;
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection("stay");
        const stay = collection.findOne({ _id: ObjectId(stayId) });
        return stay;
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err);
        throw err;
    }
}

async function getByUserId(userId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stays = collection.find({ 'host._id': userId }).toArray()
        return stays
    } catch (err) {
        logger.error(`while finding stay ${userId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection("stay");
        await collection.deleteOne({ _id: ObjectId(stayId) });
        return stayId;
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err);
        throw err;
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection("stay");
        const addedStay = await collection.insertOne(stay);
        const id = addedStay.insertedId.toString();
        stay._id = id;
        return stay;
    } catch (err) {
        logger.error("cannot insert stay", err);
        throw err;
    }
}
async function update(stay) {
    try {
        var id = ObjectId(stay._id);
        delete stay._id;
        const collection = await dbService.getCollection("stay");
        await collection.updateOne({ _id: id }, { $set: {...stay } });
        const updateStay = {...stay, _id: id };
        return updateStay;
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.fromPrice && filterBy.toPrice) {
        criteria.$and = [
            { price: { $gte: +filterBy.fromPrice } },
            { price: { $lte: +filterBy.toPrice } },
        ];
    }
    if (filterBy.country) {
        criteria["loc.country"] = { $regex: filterBy.country, $options: 'i' }
    }
    if (filterBy.guests) {
        criteria.capacity = { $gte: filterBy.guests };
    }
    if (filterBy.bathrooms) {
        criteria.bathrooms = { $gte: filterBy.bathrooms };
    }
    if (filterBy.bedrooms) {
        criteria.bedroom = { $gte: filterBy.bedrooms };
    }
    if (filterBy.beds) {
        criteria.beds = { $gte: filterBy.beds }
    }
    if (filterBy.type.length) {
        criteria.type = { $in: filterBy.type }
    }
    return criteria;
}



module.exports = {
    remove,
    query,
    getById,
    getByUserId,
    add,
    update,
}