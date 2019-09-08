/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-09 03:19:55
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { logout, getInfo } from "./api/user";
import { getIndexSearchResults } from './api/config';
import eventBus from "@/utils/eventBus.js";

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
        }],
        indexSearchResults: null
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
        },
        setIndexSearchResults(state, messages) {
            state.indexSearchResults = messages
            eventBus.$emit("refreshData");
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
        levelList: state => {
            return state.levelList
        },
        indexSearchResults: state => {
            return state.indexSearchResults
        }

    },
    actions: {
        setSid({ commit }, sid) {
            commit('setSid', sid)
        },
        login({ commit }) {
            commit('setLoggedIn', true)
        },
        logout({ commit }) {
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
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    commit('setUserInfo', response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        toggleSidear({ commit }) {
            commit('toggleSidear')
        },
        setLevelInfo({ commit }, leveInfo) {
            commit("setLevelList", leveInfo)
        },
        setIndexSearchResults({ commit }, datas) {
            return new Promise((resolve, reject) => {
                getIndexSearchResults(datas).then(res => {
                    commit('setIndexSearchResults', res.messages)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
