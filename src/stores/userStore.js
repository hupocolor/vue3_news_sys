import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state: ()=>{
        return{
            uid: '',
            uname: '',
            roleid: '',
            isLogin: false,
            token: ''
        }
    },
    actions:{
        setIsLogin(isLogin){
            this.isLogin = isLogin;
        },
        setUserInfo(userInfo){
            this.uid = userInfo.uid
            this.uname = userInfo.uname
            this.roleid = userInfo.roleid
        },
        logout(){
            this.isLogin = false
            this.uid = ''
            this.uname = ''
            this.roleid = ''
            this.token = ''
        },
        setToken(token){
            this.token = token
        }
    },
    persist:{
        storage: window.localStorage,
        enabled: true,
        starategies: [{
            key: 'market_user',
            store: localStorage
        }]
    }
})