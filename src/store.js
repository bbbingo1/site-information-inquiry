import Vue from 'vue'
import Vuex from 'vuex'
import {logout, getInfo} from "./api/user";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sid: '',
        loggedIn: false,
        userInfo: {
            username: '',
            userImage: '',
        },
        isCollapse: false,
        levelList: [{
            title: '首页',
            name: "index"
        }]
    },
    mutations: {
        setSid(state, sid) {
            state.sid = sid
        },
        setLoggedIn(state, status) {
            state.loggedIn = status
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        toggleSidear(state) {
            state.isCollapse = !state.isCollapse
        },
        setLevelList(state, levelList) {
            state.levelList = levelList
        }
    },
    getters: {
        sid: state => {
            return state.sid
        },
        loggedIn: status => {
            return status.loggedIn
        },
        isCollapse: state => {
            return state.isCollapse
        },
        userInfo: state => {
            return state.userInfo
        },
        levelList : state => {
            return state.levelList
        }

    },
    actions: {
        setSid({commit}, sid) {
            commit('setSid', sid)
        },
        login({commit}) {
            commit('setLoggedIn', true)
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('setSid', '')
                    commit('setLoggedIn', false)
                    commit('setUserInfo', {
                        username: '',
                        userImage: '',
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    commit('setUserInfo', response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        toggleSidear({commit}) {
            commit('toggleSidear')
        },
        setLevelInfo({commit}, leveInfo) {
            commit("setLevelList", leveInfo)
        },
    }
})
