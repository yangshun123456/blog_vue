import request from '@/request'

export function findAll(query){
  return request({
    url: '/sysUser/findAll',
    method: 'get',
    query: query
  })
}