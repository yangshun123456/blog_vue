import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysUser/findAll',
    method: 'get',
    params: query
  })
}

export function status(query){
  return request({
    url: '/sysUser/status',
    method: 'get',
    params: query
  })
}

export function save(params){
  return request({
    url: '/sysUser/save',
    method: 'post',
    data: params
  })
}

export function detail(query){
  return request({
    url: '/sysUser/detail',
    method: 'get',
    params: query
  })
}

export function deleteUser(query){
  return request({
    url: '/sysUser/delete',
    method: 'get',
    params: query
  })
}

export function logout(query){
  return request({
    url: '/user/logout',
    method: 'get',
    params: query
  })
}

