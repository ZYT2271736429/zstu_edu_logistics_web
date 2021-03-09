import { postRequest } from './api'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  postRequest('/menu/all', JSON.parse(window.sessionStorage.getItem('user')).id).then(data => {
    if (data) {
      // 格式化router
      const fmtRoutes = formatRoutes(data.data.data)
      // 添加到router
      router.addRoutes(fmtRoutes)
      // 将数据存入vuex
      store.commit('initRoutes', fmtRoutes)
      // store.dispatch('connect')
    }
  })
}
export const formatRoutes = (routes) => {
  const fmRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      iconCls,
      children
    } = router
    if (children && children instanceof Array) {
      // 递归
      children = formatRoutes(children)
    }
    const fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component (resolve) {
        if (component.startsWith('Home')) {
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith('Anno')) {
          require(['../views/anno/' + component + '.vue'], resolve)
        } else if (component.startsWith('Dorm')) {
          require(['../views/dorm/' + component + '.vue'], resolve)
        } else if (component.startsWith('Repair')) {
          require(['../views/repair/' + component + '.vue'], resolve)
        } else if (component.startsWith('Asset')) {
          require(['../views/asset/' + component + '.vue'], resolve)
        } else if (component.startsWith('Cant')) {
          require(['../views/cant/' + component + '.vue'], resolve)
        } else if (component.startsWith('Auth')) {
          require(['../views/auth/' + component + '.vue'], resolve)
        } else if (component.startsWith('Suggest')) {
          require(['../views/suggest/' + component + '.vue'], resolve)
        } else if (component.startsWith('User')) {
          require(['../views/user/' + component + '.vue'], resolve)
        }
      }
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}
