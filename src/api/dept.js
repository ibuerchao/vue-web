import request from '@/utils/request';

//部门列表
export function list(data) {
  return request({
    url: 'api/dept/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `api/dept/detail/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `api/dept/delete/${id}`,
    method: 'delete',
  })
}

export function superior(params) {
  return request({
    url: `api/dept/superior`,
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: `api/dept/edit`,
    method: 'post',
    data
  })
}


export function updateStatus(data) {
  return request({
    url: `api/dept/update/status`,
    method: 'post',
    data
  })
}