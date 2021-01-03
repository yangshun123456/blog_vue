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

export function deleteMenu(query){
  return request({
    url: '/sysMenu/delete',
    method: 'get',
    params: query
  })
}

export function detail(query){
  return request({
    url: '/sysMenu/detail',
    method: 'get',
    params: query
  })
}

export function status(query){
  return request({
    url: '/sysMenu/status',
    method: 'get',
    params: query
  })
}
