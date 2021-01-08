import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysRole/findAll',
    method: 'get',
    params: query
  })
}

export function deleteRole(query){
  return request({
    url: '/sysRole/delete',
    method: 'get',
    params: query
  })
}

export function findAllMenu(query){
  return request({
    url: '/sysRole/findAllMenu',
    method: 'get',
    params: query
  })
}


export function detail(query){
  return request({
    url: '/sysRole/detail',
    method: 'get',
    params: query
  })
}

export function save(data){
  return request({
    url: '/sysRole/save',
    method: 'post',
    data: data
  })
}

export function getUsers(query){
  return request({
    url: '/sysRole/getUsers',
    method: 'get',
    params: query
  })
}

export function setUsers(data){
  return request({
    url: '/sysRole/setUsers',
    method: 'post',
    data: data
  })
}
