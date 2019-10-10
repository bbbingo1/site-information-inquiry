/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-09 15:04:42
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {logout, getInfo} from "./api/user"
import {dynamicSiteFields} from "@/api/config"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURL: '',
        isCollapse: false,
        levelList: [{
            title: '首页',
            name: "index"
        }],
        dynamicSiteFields: {},
        sid: '',
        loggedIn: false,
        userInfo: {
            username: '',
            userImage: '',
        },
    },
    mutations: {
        setBaseUrl(state, baseUrl) {
            state.baseURL = baseUrl
        },
        toggleSidear(state) {
            state.isCollapse = !state.isCollapse
        },
        setLevelList(state, levelList) {
            state.levelList = levelList
        },
        setDynamicSiteFields(state, dynamicSiteFields) {
            state.dynamicSiteFields = dynamicSiteFields
        },
        setSid(state, sid) {
            state.sid = sid
        },
        setLoggedIn(state, status) {
            state.loggedIn = status
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
    },
    getters: {
        baseUrl: state => {
            return state.baseURL
        },
        isCollapse: state => {
            return state.isCollapse
        },
        levelList: state => {
            return state.levelList
        },
        dynamicSiteFields: state => {
            return state.dynamicSiteFields
        },
        sid: state => {
            return state.sid
        },
        loggedIn: status => {
            return status.loggedIn
        },
        userInfo: state => {
            return state.userInfo
        },
    },
    actions: {
        setBaseUrl({commit}, baseUrl) {
            commit("setBaseUrl", baseUrl)
        },
        toggleSidear({commit}) {
            commit('toggleSidear')
        },
        setLevelInfo({commit}, leveInfo) {
            commit("setLevelList", leveInfo)
        },
        initDynamicSiteFields({commit}) {
            dynamicSiteFields()
                .then(response => {
                    commit("setDynamicSiteFields", response.data)
                })
                .catch(error => console.log(error));
        },
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
    }
})
