import MainPage from '@/views/main/MainPage'

const mainRoutes = [
  {
    path: '/',
    component: () => import('@/views/main/MainPage')
  }
]
export default mainRoutes
