const sectionRoutes = [
  {
    path: '/sections',
    component: () => import(/* webpackChunkName: "sectionPage" */ '@/views/section/SectionPage')
  }
]
export default sectionRoutes
