import request from '@/utils/request';

export function signIn(data) {
  return request({
    url: 'sys/sign_in',
    method: 'post',
    data
  })
}

export default { signIn }