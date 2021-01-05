import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysRole/findAll',
    method: 'get',
    params: query
  })
}