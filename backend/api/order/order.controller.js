const { log } = require('../../middlewares/logger.middleware');
const logger = require('../../services/logger.service')
const orderService = require('./order.service')
    // const socketService = require('../../services/socket.service')


async function getOrders(req, res) {
    const { userId } = req.params;
    try {
        if (userId) {
            var orders = await orderService.query(userId)
        } else {
            var orders = await orderService.query()
        }
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}


async function addOrder(req, res) {
    try {
        var order = req.body
        order = await orderService.add(order)
        res.send(order)

    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

module.exports = {
    getOrders,
    deleteOrder,
    addOrder
}