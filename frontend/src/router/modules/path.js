import PathPage from '../../views/path/PathPage'

const pathRoutes = [
  {
    path: '/path',
    component: () => import('@/views/path/PathPage')
  }
]
export default pathRoutes
