import {reqAddOrUpdateShopCart,reqShopCartList,reqUpdateCartIsCheck,reqDeleteCart} from '@/api'
const state = {
    shopCartList:[]
}
const mutations = {
    RECEIVESHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}
const actions ={
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code ===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getShopCartList({commit}){
        const result =await reqShopCartList()
        if(result.code === 200){
            commit('RECEIVESHOPCARTLIST',result.data)
        }
    },

    async updateCart({commit},{skuId,isChecked}){
        const result = await reqUpdateCartIsCheck(skuId,isChecked)
        if(result.code ===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    // Promise.all是一个方法
    // 一次性批量处理多个promise
    // 参数：promise对象的数组
    // 返回值：也是promise
    // 如果数组当中所有的promise都是成功的，那么返回的这个promise就是成功的，成功的结果是所有的promise的成功结果组成的数组
    // 如果数组当中promise有一个失败，那么最后返回的这个promise就是失败的
    async updateCartAll({commit,dispatch,state},isChecked){
        let promises = []
        state.shopCartList.forEach(item=>{
            if(item.isChecked === isChecked)return
            const promise = dispatch('updateCart',{skuId:item.skuId,isChecked})
            promises.push(promise)
        })
        return Promise.all(promises)
    },

    // 删除单个
    async deleteCart({commit},skuId){
        const result = await reqDeleteCart(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    // 删除多个
    async deleteCartAll({commit,dispatch,state}){
        let promises = []
        state.shopCartList.forEach(item=>{
            if(!item.isChecked) return
            const promise = dispatch('deleteCart',item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}