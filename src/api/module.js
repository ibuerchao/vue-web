import request from '@/utils/request';
import {removePropertyOfNull} from '@/utils/common'

export function list(data) {
  return request({
    url: 'api/res/module/list',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: `api/res/module/detail/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `api/res/module/delete/${id}`,
    method: 'delete',
  })
}

export function superior(params) {
  return request({
    url: `api/res/module/superior`,
    method: 'get',
    params
  })
}

export function add(data) {
  if (!data.parentId){
    data.parentId = 'root';
  }
  return request({
    url: `api/res/module/add`,
    method: 'post',
    data
  })
}

export function edit(data) {
  let temp = removePropertyOfNull(data);
  return request({
    url: `api/res/module/edit`,
    method: 'post',
    data:temp
  })
}

export function updateStatus(data) {
  return request({
    url: `api/res/module/update/status`,
    method: 'post',
    data
  })
}

export function up(id) {
  return request({
    url: `api/res/module/up/${id}`,
    method: 'get',
  })
}

export function down(id) {
  return request({
    url: `api/res/module/down/${id}`,
    method: 'get',
  })
}