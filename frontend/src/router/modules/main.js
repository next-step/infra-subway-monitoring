const mainRoutes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "mainPage" */ '@/views/main/MainPage')
  }
]
export default mainRoutes
