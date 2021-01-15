import request from '@/request/index.js'

export function findAll(query){
  return request({
    url: '/dic/findAll',
    method: 'get',
    params: query
  })
}

export function detail(query){
  return request({
    url: '/dic/detail',
    method: 'get',
    params: query
  })
}

export function deleteType(query){
  return request({
    url: '/dic/delete',
    method: 'get',
    params: query
  })
}

export function save(query){
  return request({
    url: '/dic/save',
    method: 'post',
    data: query
  })
}

export function status(query){
  return request({
    url: '/dic/status',
    method: 'get',
    params: query
  })
}

export function listData(query){
  return request({
    url: '/dic/listData',
    method: 'get',
    params: query
  })
}

export function dataDetail(query){
  return request({
    url: '/dic/dataDetail',
    method: 'get',
    params: query
  })
}

export function dataDelete(query){
  return request({
    url: '/dic/dataDelete',
    method: 'get',
    params: query
  })
}

export function saveData(query){
  return request({
    url: '/dic/saveData',
    method: 'get',
    data: query
  })
}
