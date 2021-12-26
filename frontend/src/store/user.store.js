import { userService } from '../services/user.service.js'

export const userStore = {
    state: {
        user: userService.getLoggedinUser() || null,
        userCurrPage: 'home'
    },
    getters: {
        user(state) {
            return state.user
        },
        miniUser(state) {
            const _id = state.user._id
            const fullname = state.user.fullname
            const imgUrl = state.user.imgUrl
            return {
                _id,
                fullname,
                imgUrl
            }
        },
        userPage(state) {
            return state.userCurrPage
        }


    },
    mutations: {
        setUser(state, { loginUser }) {
            state.user = loginUser
        },
        setUserPage(state, { page }) {
            state.userCurrPage = page
        }
    },
    actions: {
        async getUserById({}, { userId }) {
            const user = await userService.getById(userId)
            return user
        },
        async setUser({ commit }, { user }) {
            const loginUser = await userService.login(user.username, user.password);
            if (loginUser) {
                commit({ type: "setUser", loginUser })
                return true
            } else {
                return false
            }

        },
        async signUser({ commit }, { user }) {
            var loginUser = await userService.signup(user)
            commit({ type: "setUser", loginUser })
        },
        async logoutUser({ commit }) {
            const deletedUser = await userService.logout()
            const loginUser = null
            commit({ type: 'setUser', loginUser })
        }
    }

}