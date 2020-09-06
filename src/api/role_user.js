import request from '@/utils/request';

export function list(data) {
  return request({
    url: 'api/role_user/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/role_user/save',
    method: 'post',
    data
  })
}