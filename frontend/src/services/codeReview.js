// FRONTEND // 

// details- page

async function check() {
    const order = await this.$store.dispatch({
        type: "addOrder",
        order: JSON.parse(JSON.stringify(this.order)),
    });
    socketService.emit('addOrder', order)

}

// BACKEND //

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('newOrder', topic => {
            console.log('topic', topic);
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic

        })
        socket.on('addOrder', order => {
            console.log('sending new order to the host', order);
            gIo.emit('hostOrders', order)

        })


    })
}


// FRONTEND //

// app-haeder

const created = () => {
    if (this.user) this.createOrderSocket()
}


function createOrderSocket() {
    socketService.on('hostOrders', this.orderNotification)
}

function orderNotification(order) {
    if (order.hostId === this.user._id) {
        this.newNotification = order
    }
}