import request from '../utils/request'

//更新分类
export function updateTopic(data){
    return request({
        url: 'api/topic/update',
        method: 'post',
        data: data,
        headers: {isToken:true}
    })
}

//添加分类
export function addTopic(data){
    return request({
        url: 'api/topic/addTopic',
        method: 'post',
        data: data,
        headers: {isToken:true}
    })
}

//获取分类详情
export function getTopic(id){
    return request({
        url: 'api/topic/'+id,
        method: 'get'
    })
}
//删除
export function delTopic(id){
    return request({
        url: 'api/topic/'+id,
        method: 'delete',
        headers: {isToken:true}
    })
}

//获取分类列表篇
export function getTopicList(){
    return request({
        url: 'api/topic/list',
        method: 'get'
    })
}

//分页分类
export function getTopicPage(query){
    return request({
        url: 'api/topic/page',
        method: 'get',
        params: query
    })
}