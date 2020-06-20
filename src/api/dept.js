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