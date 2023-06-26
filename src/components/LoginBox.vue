<template>
    <el-row :gutter="20">
        <div class="loginBox"><el-col :span="12" :offset="0"><el-input placeholder="用户名" v-model="uname"></el-input></el-col>
            <el-col :span="12" :offset="0"><el-input placeholder="密码" v-model="upwd"></el-input></el-col>
            <el-col :span="12" :offset="0">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="primary" @click="register">注册</el-button>
            </el-col>
        </div>
    </el-row>
</template>

<script setup>
import { ref } from 'vue';
import { userLogin,userRegister } from '../api/user'
import { useUserStore } from '../stores/userStore'
import { ElMessage } from 'element-plus';

const uname = ref('')
const upwd = ref('')
const store = useUserStore();

const login = () => {
    userLogin(uname.value, upwd.value).then(res => {
        ElMessage({
            message: '登录成功',
            type: 'success'
        })
        store.setUserInfo(res.data.user)
        store.setIsLogin(true)
        store.setToken(res.data.token)
    }
    )
}

const register = ()=>{
    userRegister(uname.value,upwd.value).then(res=>{
        ElMessage({
            message: res.data,
            type: 'success'
        })
    }
    )
}

</script>

<style scoped>
.loginBox{
    display: inline-flex;
}
</style>