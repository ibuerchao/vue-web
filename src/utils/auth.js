import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  let expires = Config.rememberMeNot;
  if (rememberMe){
    expires = Config.rememberMe;
  }
  Cookies.set(TokenKey, token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
