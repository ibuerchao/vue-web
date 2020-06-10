import request from '@/utils/request';

//用户登录
export function signIn(data) {
  return request({
    url: 'api/help/sign_in',
    method: 'post',
    data
  })
}

//用户登出
export function signOut(data) {
  return request({
    url: 'api/sys/sign_out',
    method: 'post',
    data
  })
}

//获取邮箱验证码
export function getCode(params) {
  return request({
    url: 'api/help/code',
    method: 'get',
    params
  })
}

//重置密码
export function resetPassword(data) {
  return request({
    url: 'api/help/reset/password',
    method: 'post',
    data
  })
}