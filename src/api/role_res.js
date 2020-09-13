import request from '@/utils/request';

export function list(data) {
  return request({
    url: 'api/role_res/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/role_res/save',
    method: 'post',
    data
  })
}