import request from '../utils/request'

export function getRoleList(){
    return request({
        url: 'api/role/list',
        method: 'get'
    })
}

export function getRoleNow(){
    return request({
        url: 'api/role/now',
        method: 'get',
        headers: {isToken:true}
    })
}