import router from './router'
import { getToken, getName } from '@/utils/auth'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  // document.title = to.meta.title

  let path = to.path;

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/home' })
    } else {
      const hasGetUserInfo = getName()
      if (hasGetUserInfo) {
        next()
      } else {
        next(`/login?redirect=${path}`)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      ElMessage.error('登陆已过期，请重新登陆')
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${path}`)
    }
  }
})
