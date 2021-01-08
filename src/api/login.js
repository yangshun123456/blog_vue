import request from '@/request'

export function login(data){
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function captcha(param){
  return request({
    url: '/user/captcha',
    method: 'get',
    params: param
  })
}


export function getUserInfo(param){
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: param
  })
}

export function systemInfo(param){
  return request({
    url: '/system/detail',
    method: 'get',
    params: param
  })
}

export function getUserDetail(param){
  return request({
    url: '/user/getUserDetail',
    method: 'get',
    params: param
  })
}
