import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysMenu/findAll',
    method: 'get',
    params: query
  })
}