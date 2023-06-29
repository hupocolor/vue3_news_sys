import request from '../utils/request'

//更新
export function updateNews(data){
    return request({
        url: 'api/news/updateNews',
        method: 'post',
        data: data,
        headers: {isToken:true}
    })
}

//增
export function addNews(data){
    return request({
        url: 'api/news/addNews',
        method: 'post',
        data: data,
        headers: {isToken:true}
    })
}

//查
export function getNewsById(id){
    return request({
        url: 'api/news/'+id,
        method: 'get'
    })
}

//删
export function delNewsById(id){
    return request({
        url: 'api/news/'+id,
        method: 'delete',
        headers: {isToken:true}
    })
}

//分页
export function getNewsPage(query){
    return request({
        url: 'api/news/getNewsPage',
        method: 'get',
        params: query
    })
}

//热点
export function getHotNews(topicId){
    return request({
        url: 'api/news/getHotNews/'+topicId,
        method: 'get'
    })
}

//主题新闻
export function getByTopic(query){
    return request({
        url: 'api/news/getByTopic',
        method: 'get',
        params: query
    })
}

//关键词查询
export function getByKeyword(keyword){
    return request({
        url: 'api/news/getByKey',
        method: 'get',
        data: keyword
    })
}

//上传图片

export function uploadPic(pic){
    return request({
        url: 'api/upload',
        method: 'post',
        data: pic
    })
}