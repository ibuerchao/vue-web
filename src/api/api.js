import data from './mock'
import Cookies from 'js-cookie'
import Config from '@/settings'


// let flag = false;

export function login(username) {
  if (username === 'hechao'){
    return {token:'123456',data:[data[0],data[1]]}
  }
  if(username === 'buerchao'){
    return {token:'654321',data:[data[1],data[2]]}
  }
  return {token:'all',data};
}

export function getMenus(){
  // return [data[0],data[1]]
  // return [data[1],data[2]]
  return data;
}

export function getToken(){
  return Cookies.get(Config.TokenKey)
}