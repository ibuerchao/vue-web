import request from '@/utils/request';

export function list(data) {
  return request({
    url: 'api/role/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `api/role/detail/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `api/role/delete/${id}`,
    method: 'delete',
  })
}


export function add(data) {
  return request({
    url: `api/role/add`,
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: `api/role/edit`,
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `api/role/update/status`,
    method: 'post',
    data
  })
}