const mapRoutes = [
  {
    path: '/maps',
    component: () => import(/* webpackChunkName: "mapPage" */ '@/views/map/MapPage')
  }
]
export default mapRoutes
