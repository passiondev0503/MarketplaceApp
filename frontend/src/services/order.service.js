// import { storageService } from './async-storage.service'
// import { storage } from './storage.service'
import { utilService } from './util.service'
const axios = require('axios')
import { httpService } from './http.service'


// const ORDER_KEY = 'orderDB';
// const CURR_ORDER ='currOrder'
// const ORDER_URL = 'http://localhost:3000/api/order/'

export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder

}



async function query(filterBy = {}) {
    // return storageService.query(ORDER_KEY)
    if (filterBy.userId) {
        return httpService.get(`order/${filterBy.userId}`)
    } else {
        return httpService.get(`order/`)

    }

}

async function getById(id) {
    // return storageService.get(ORDER_KEY, id)

    const order = httpService.get(`order/${id}`)
    return order


}

async function remove(id) {
    // return storageService.remove(ORDER_KEY, id)

    return httpService.delete(`order/${id}`)
}

async function save(order) {
    // const savedOrder = (order._id) ? storageService.put(ORDER_KEY, order) : storageService.post(ORDER_KEY, order)
    // return savedOrder;


    if (order._id) {
        const savedOrder = await httpService.put(`order/${order._id}`, order)
        return savedOrder

    } else {
        const savedOrder = await httpService.post(`order`, order)
        return savedOrder
    }


}
// async function saveCurrOrder(order){
//     const saveOrder =  await storageService.postOrder(CURR_ORDER, order)
//     return saveOrder


// }

function getEmptyOrder() {
    return {
        hostId: '',
        createdAt: '',
        buyer: {
            _id: '',
            fullname: ''
        },
        cleaning: utilService.getRandomInt(15, 50),
        service: utilService.getRandomInt(15, 50),
        totalPrice: 0,
        Dates: '',
        totalDays: 0,
        guests: 0,
        adults: 0,
        kids: 0,
        stay: {
            _id: '',
            name: '',
            price: 0
        },
        status: 'pending'
    }


}