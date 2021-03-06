import request from '@/utils/request';
import {removePropertyOfNull} from '@/utils/common'

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

export function add(data) {
  if (!data.parentId){
    data.parentId = 'root';
  }
  return request({
    url: `api/dept/add`,
    method: 'post',
    data
  })
}

export function edit(data) {
  let temp = removePropertyOfNull(data);
  return request({
    url: `api/dept/edit`,
    method: 'post',
    data: temp
  })
}

export function updateStatus(data) {
  return request({
    url: `api/dept/update/status`,
    method: 'post',
    data
  })
}

export function up(id) {
  return request({
    url: `api/dept/up/${id}`,
    method: 'get',
  })
}

export function down(id) {
  return request({
    url: `api/dept/down/${id}`,
    method: 'get',
  })
}