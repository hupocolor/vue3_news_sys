import axios from 'axios'
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/userStore'

const sevice = axios.create();

//请求拦截器
sevice.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    if (!isToken) {
        config.headers['token'] = useUserStore().token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
}, error => {
    Promise.reject(error);
});
//响应拦截器
sevice.interceptors.response.use(response => {
    //直接在拦截器进行消息处理
    
    return response;
}, error => {
    //异常处理 
    ElMessage.error(error.response.data)
    console.log(error)
    return Promise.reject(error);
});

export default sevice;