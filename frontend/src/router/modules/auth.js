const authRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "loginPage" */ '@/views/auth/LoginPage')
  },
  {
    path: '/join',
    component: () => import(/* webpackChunkName: "joinPage" */ '@/views/auth/JoinPage')
  },
  {
    path: '/mypage',
    component: () => import(/* webpackChunkName: "mypage" */ '@/views/auth/Mypage')
  },
  {
    path: '/mypage/edit',
    component: () => import(/* webpackChunkName: "mypageEdit" */ '@/views/auth/MypageEdit')
  }
]
export default authRoutes
