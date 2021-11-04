import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
  {
    path: '/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../scenes/Login')),
    showInMenu: false,
  },
];

export const appRouters: any = [
  {
    path: '/admin',
    exact: true,
    name: 'admin',
    permission: '',
    title: 'Admin Panel',
    icon: 'home',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: 'home',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Dashboard')),
  },
  {
    path: '/admin/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: 'user',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Users')),
  },
  {
    path: '/admin/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: 'tags',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Roles')),
  },
  {
    path: '/admin/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: 'appstore',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Tenants')),
  },
  {
    path: '/admin/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: 'info-circle',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/admin/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('../../components/Logout')),
  },
  {
    path: '/admin/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
  },
];

export const eventsRouter: any = [
  {
    path: '/',
    name: 'events',
    title: 'Events List',
    component: LoadableComponent(() => import('../../components/Layout/EventsLayout')),
    isLayout: true,
    showInMenu: false,
  },
  /*{
    path: '/eventtype',
    permission: '',
    title: 'Events Type',
    component: LoadableComponent(() => import('../../scenes/EventType') )
  },*/
];

export const routers = [...userRouter, ...appRouters, ...eventsRouter];

