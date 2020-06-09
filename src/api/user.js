import request from '@/utils/request';

export function signIn(data) {
  return request({
    url: 'api/sys/sign_in',
    method: 'post',
    data
  })
}

export function signOut(data) {
  return request({
    url: 'api/sys/sign_out',
    method: 'post',
    data
  })
}

export function getCode(params) {
  return request({
    url: 'api/code',
    method: 'get',
    params
  })
}