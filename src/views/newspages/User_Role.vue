<template>
    <HeaderBox></HeaderBox>
    <div id="main">
        <Left></Left>
        <div id="opt_area">
            <ul class="classlist">
                <!-- 分页显示用户区域 -->
                <el-row v-for="user in users" :key="user.uid" style="margin-top: 10px ;">
                    <el-input v-model="user.uname" size="small" clearable @change=""></el-input>
                    <el-select v-model="user.roleid" class="m-2" placeholder="Select">
                        <el-option v-for="role in roles" :key="role.rid" :label="role.roleName" :value="role.rid" />
                    </el-select>
                    <span style="margin-top: 10px;">
                        <el-button type="warning" size="small" @click="eidtUserBtn(user)">修改</el-button>
                        <el-button type="danger" size="small" @click="delUserBtn(user.uid)">删除</el-button>
                    </span>
                </el-row>
            </ul>
            <p align="center">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
                    :page-size="query.size" />
            </p>
        </div>
    </div>
    <Bottom></Bottom>
</template>

<script setup>
import Bottom from '../console_element/Bottom.vue';
import HeaderBox from '../../components/HeaderBox.vue';
import Left from '../console_element/Left.vue';
import { onBeforeMount, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getList, delUser, update } from '../../api/user';
import { getRoleList } from '../../api/role';
const users = ref([])
const roles = ref([])
const query = reactive({
    current: 1,
    size: 5
})
const total = ref(0)

const delUserBtn = (id) => {
    delUser(id).then(res => {
        ElMessage({
            message: res.data,
            type: 'success'
        })
        getList(query).then(res => {
            users.value = res.data.records
            total.value = res.data.total
        })
    })
}
const eidtUserBtn = (user) => {
    update(user).then(res => {
        ElMessage({
            message: res.data,
            type: 'success'
        })
    })
}
const handleCurrentChange = (val) => {
    query.current = val
    getList(query).then(res => {
        users.value = res.data.records
        total.value = res.data.total
    })
}
onBeforeMount(() => {
    getList(query).then(res=>{
        users.value = res.data.records
        total.value = res.data.total
    })
    getRoleList().then(res => {
        roles.value = res.data
    })
})
</script>
