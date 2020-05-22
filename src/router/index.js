import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'guide', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/specification',
    component: Layout,
    // redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: '标注规范',
    meta: {
      title: '标注规范',
      icon: 'edit'
      // roles: ['admin','annotator'] // you can set roles in root nav
    },
    children: [
      {
        path: 'specificationList',
        component: () => import('@/views/specification/specificationList'),
        name: '规范列表',
        meta: {
          title: '规范列表'
          // roles: ['admin','annotator'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'newSpecification',
        component: () => import('@/views/specification/newSpecification'),
        name: '新建规范',
        meta: {
          title: '新建规范'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'specificationDetail',
        component: () => import('@/views/specification/specificationDetail'),
        name: '规范详情',
        hidden: true,
        meta: {
          title: '规范详情'
        }
      }
    ]
  },
  {
    path: '/taskManagement',
    component: Layout,
    // redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: '任务管理',
    meta: {
      title: '任务管理',
      icon: 'list'
      // roles: ['admin','annotator'] // you can set roles in root nav
    },
    children: [
      {
        path: 'taskList',
        component: () => import('@/views/taskManagement/taskList'),
        name: '任务列表',
        meta: {
          title: '任务列表'
          // roles: ['admin','annotator'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'newTask',
        component: () => import('@/views/taskManagement/newTask'),
        name: '新建任务',
        meta: {
          title: '新建任务'
          // roles: ['admin','annotator']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'assignments',
        component: () => import('@/views/taskManagement/assignments'),
        name: '分配任务',
        hidden: true,
        meta: {
          title: '分配任务'
          // roles: ['admin']
        }
      },
      {
        path: 'taskDetails',
        component: () => import('@/views/taskManagement/taskDetails'),
        name: '任务详情',
        hidden: true,
        meta: {
          title: '任务详情'
          // roles: ['admin','annotator']
        }
      }
    ]
  },

  // {
  //   path: '/personnel',
  //   component: Layout,
  //   // redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: '人员管理',
  //   meta: {
  //     title: '人员管理',
  //     icon: 'peoples',
  //     roles: ['admin'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'personnelList',
  //       component: () => import('@/views/personnel/personnelList'),
  //       name: '人员列表',
  //       meta: {
  //         title: '人员列表',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // },

  {
    path: '/label',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/label/index'),
        name: '标注任务',
        meta: { title: '标注任务', icon: 'form'
        // roles: ['admin', 'annotator']
        }
      },
      {
        path: 'labeling',
        component: () => import('@/views/label/labeling'),
        name: '进行标注',
        hidden: true,
        meta: { title: '进行标注'
        //  roles: ['admin', 'annotator']
        }
      }
    ]
  },

  // {
  //   path: '/review',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/review/index'),
  //       name: '审核任务列表',
  //       meta: { title: '审核任务列表', icon: 'skill', roles: ['admin', 'editor'] }
  //     },
  //     {
  //       path: 'reviewing',
  //       component: () => import('@/views/review/reviewing'),
  //       name: '审核任务',
  //       hidden: true,
  //       meta: { title: '审核任务', roles: ['admin', 'editor'] }
  //     }
  //   ]
  // },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    hidden: true,
    meta: {
      title: 'Permission',
      icon: 'lock'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission'
          // roles: ['admin']
        }
      }
    ]
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    hidden: true,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    hidden: true,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    hidden: true,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://www.cnki.net/',
  //       meta: { title: '中国知网', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
