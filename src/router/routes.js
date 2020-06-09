function loadView(file) {
  return (resolve) => require([`@/views/${file}`], resolve)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: loadView('Login'),
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/404',
    component: loadView('404'),
  },
  {
    path: '/forget',
    component: loadView('help/Forget'),
  },
  {
    path: '/signUp',
    component: loadView('help/SignUp'),
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: _import('Index'),
  //   meta: {
  //     title: '首页'
  //   },
  //   children: [
  //     {
  //       path: '/system/dept',
  //       name: 'dept',
  //       component: _import('system/Department'),
  //       meta: {
  //         title: '组织管理'
  //       },
  //     }, {
  //       path: '/system/user',
  //       name: 'user',
  //       component: _import('system/User'),
  //       meta: {
  //         title: '用户管理'
  //       }
  //     }
  //   ]
  // }
];

export default routes;