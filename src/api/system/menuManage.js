import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysMenu/findAll',
    method: 'get',
    params: query
  })
}

export function getPermission(query){
  return request({
    url: '/sysMenu/getPermission',
    method: 'get',
    params: query
  })
}

export function save(data){
  return request({
    url: '/sysMenu/save',
    method: 'post',
    data: data
  })
}
