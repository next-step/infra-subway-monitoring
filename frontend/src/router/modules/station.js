const stationRoutes = [
  {
    path: '/stations',
    component: () => import(/* webpackChunkName: "stationPage" */ '@/views/station/StationPage')
  }
]
export default stationRoutes
