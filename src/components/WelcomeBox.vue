<template>
    <div style="display: inline-flex;">
        <h2>欢迎{{ store.uname }}</h2>
        <h3>权限: {{ role }}</h3>
        <el-button type="info" size="small" @click="doLogout">注销</el-button>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { logout } from '../api/user';
import { useUserStore } from '../stores/userStore';
import { ref, watch } from 'vue';
import { getRoleNow } from '../api/role';
const store = useUserStore()
const role = ref('')
const doLogout = () => {
    logout().then(res => {
        ElMessage({
            message: res.data,
            type: 'success'
        })
    })
    store.logout()
}
//监听角色变化
watch(()=>store.roleid,()=>{
    getRoleNow(store.roleid).then(res=>{
        role.value = res.data.roleName
    })
},{immediate:true})
</script>