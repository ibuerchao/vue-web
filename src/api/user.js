import request from '@/utils/request';

export function list(data) {
  return request({
    url: 'api/user/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `api/user/detail/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `api/user/delete/${id}`,
    method: 'delete',
  })
}


export function add(data) {
  return request({
    url: `api/user/add`,
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: `api/user/edit`,
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `api/user/update/status`,
    method: 'post',
    data
  })
}