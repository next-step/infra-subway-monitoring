const pathRoutes = [
  {
    path: '/path',
    component: () => import(/* webpackChunkName: "sathPage" */ '@/views/path/PathPage')
  }
]
export default pathRoutes
