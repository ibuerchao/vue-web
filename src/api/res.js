import request from '@/utils/request';

export function list(data) {
  return request({
    url: 'api/res/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `api/res/detail/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `api/res/delete/${id}`,
    method: 'delete',
  })
}


export function add(data) {
  return request({
    url: `api/res/add`,
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: `api/res/edit`,
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `api/res/update/status`,
    method: 'post',
    data
  })
}