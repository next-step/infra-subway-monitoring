const lineRoutes = [
  {
    path: '/lines',
    component: () => import(/* webpackChunkName: "linePage" */ '@/views/line/LinePage')
  }
]
export default lineRoutes
