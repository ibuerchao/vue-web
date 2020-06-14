import request from '@/utils/request';

//部门列表
export function list(data) {
  return request({
    url: 'api/dept/list',
    method: 'post',
    data
  })
}