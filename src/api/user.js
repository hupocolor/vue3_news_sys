import request from '../utils/request.js'

//登录
export function userLogin(uname,upwd){
    return request({
        url: 'api/user/login',
        method: 'post',
        data: {uname:uname,upwd:upwd},
        headers: {isToken:true}
    })
}

//注册
export function userRegister(uname,upwd){
    return request({
        url: 'api/user/register',
        method: 'post',
        data: {uname:uname,upwd:upwd},
        headers: {isToken:false}
    })
}

//更新
export function update(data){
    return request({
        url: 'api/user/update',
        method: 'post',
        data: data,
        headers: {isToken:true}
    })
}

//退出登录
export function logout(){
    return request({
        url: 'api/user/logout',
        method: 'post',
        headers: {isToken:true}
    })
}

//获取用户列表
export function getList(query){
    return request({
        url: 'api/user/list',
        method: 'get',
        params: query,
        headers: {isToken:true}
    })
}


//删除用户
export function delUser(id){
    return request({
        url: 'api/user/'+id,
        method: 'delete',
        headers: {isToken:true}
    })
}

//获取用户详情
export function getUserById(id){
    return request({
        url: 'api/user/'+id,
        method: 'get',
        headers: {isToken:true}
    })
}