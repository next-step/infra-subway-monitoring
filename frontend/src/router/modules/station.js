import StationPage from '@/views/station/StationPage'

const stationRoutes = [
  {
    path: '/stations',
    component: () => import(/* webpackChunkName: "stationPage" */ '@/views/station/StationPage')
  }
]
export default stationRoutes
