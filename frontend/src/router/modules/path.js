import PathPage from '../../views/path/PathPage'

const pathRoutes = [
  {
    path: '/path',
    component: () => import(/* webpackChunkName: "pathPage" */ '@/views/path/PathPage')
  }
]
export default pathRoutes
