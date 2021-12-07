const favoriteRoutes = [
  {
    path: '/favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '@/views/favorite/Favorites')
  }
]
export default favoriteRoutes
