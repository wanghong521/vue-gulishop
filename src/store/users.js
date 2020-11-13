import { getUserTempId } from "@/utils/userAbout"
import {reqUserLogin, reqUserRegister,reqUserLogout,reqTokenGetUserInfo} from "@/api" 
const state = {
    userTempId:getUserTempId(),//临时标识
    // 第一版本  不但包含了token还包含了用户的其他信息
    // userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}

    // 第二版本
    // token用来保存登录后返回的token，一定要存储localStorage当中
    token:localStorage.getItem('TOKEN_KEY') || '',
    userInfo:{} //不存localStorage
}
const mutations = {
    // 登录  1 2 版本都用
    RECEIVEUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 删除数据
    REMOVEUSERINFO(state){
        state.userInfo = {}
        state.token = ''
    },
    REVEIVETOKEN(state,token){
        state.token = token
    }
}
const actions ={
    // 注册
    async userRegister({commit},userInfo){
        const result = await reqUserRegister(userInfo)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    // 登录
    async userLogin({commit},userInfo){
        const result = await reqUserLogin(userInfo)
        if(result.code === 200){
            // commit('RECEIVEUSERINFO',result.data)
            // 自动登录
            // localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
           
           commit('REVEIVETOKEN',result.data.token) //提交修改的值存储vuex
           localStorage.setItem('TOKEN_KEY',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    // token登录
    async tokenGetUserInfo({commit}){
        const result = await reqTokenGetUserInfo()
        if(result.code === 200){
            commit('RECEIVEUSERINFO',result.data)
            return 'ok'
        }else{
            // 校验失败了，代表token失效了
            commit('REMOVEUSERINFO')
            localStorage.removeItem('TOKEN_KEY')
            return Promise.reject(new Error('fail'))
        }
    },

    // 退出登录
    async userLogout({commit}){
        const result = await reqUserLogout()
        if(result.code === 200){
            // 一旦请求退出登录成功，需要删除state当中userInfo当中的数据 并且还要删除localStorage当中的用户信息
            commit('REMOVEUSERINFO')
            localStorage.removeItem('TOKEN_KEY')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}