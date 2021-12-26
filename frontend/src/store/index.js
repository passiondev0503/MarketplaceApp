import Vue from 'vue'
import Vuex from 'vuex'

import { stayStore } from './stay.store'
import { userStore } from './user.store'
import { orderStore } from './order.store'


Vue.use(Vuex)

export const myStore = new Vuex.Store({
    strict: true,
    state: {



    },
    getters: {


    },
    mutations: {


    },
    modules: {
        stayStore,
        userStore,
        orderStore
    }
})