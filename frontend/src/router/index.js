import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../pages/home-page.vue'
import explorePage from '../pages/explore-page.vue'
import stayEdit from '../pages/stay-edit.vue'
import stayDetails from '../pages/stay-details.vue'
import userLoggin from '../pages/user-loggin.vue'
import userProfilePage from '../pages/user-profile-page.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/login/:signup?',
        component: userLoggin
    },
    {
        path: '/profile/:userId?',
        component: userProfilePage
    },
    {
        path: '/stay',
        component: explorePage
    },
    {
        path: '/stay/edit/:stayId?',
        component: stayEdit
    },
    {
        path: '/stay/:stayId',
        component: stayDetails
    },
    // {
    //     path: '*',
    //     redirect: '/stay'
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router