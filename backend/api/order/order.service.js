const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const logger = require('../../services/logger.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        if (filterBy.length) {
            var orders = await collection.find(criteria).sort({ $natural: -1 }).toArray()
        } else {
            var orders = await collection.find().sort({ $natural: -1 }).toArray()
        }


        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }


}

async function remove(orderId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('order')
            // remove only if user is owner/admin
        const criteria = { _id: ObjectId(orderId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}


async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {

    return filterBy ? { 'buyer._id': filterBy } : {}
}

module.exports = {
    query,
    remove,
    add
}