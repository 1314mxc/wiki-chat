import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const NameKey = 'template_name'

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(token) {
  return Cookies.set(NameKey, token)
}

export function removeName() {
  return Cookies.remove(NameKey)
}
