import request from '../utils/request'

export function addComment(comment){
    return request({
        url: 'api/comment/addComment',
        method: 'post',
        data: comment
    })
}

export function getComments(query){
    return request({
        url: 'api/comment/list',
        method: 'get',
        params: query,
        headers: {isToken:true}
    })
}
