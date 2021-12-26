// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
    // var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update
}

// Debug technique
// window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
        // gWatchedUser = user;
    return user;
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
        // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(username, password) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userName && user.password ===password)
    // if(!user) return false
    //  _saveLocalUser(user)
    //  return user
    const usercred = { username, password }
    const user = await httpService.post('auth/login', usercred)
        // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    // userCred.imgUrl ="https://source.unsplash.com/random/100x100/?face"
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
        // socketService.emit('set-user-socket', user._id);
    _saveLocalUser(user)
    return user
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}