import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true}},
    {
      path:'/collect',
      component:()=>import('../components/Collect.vue')
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue')
    },
    // /detail/1  {bid:1} 路径参数 必须有但是可以随机
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail'},
    {
      path:'/list',
      component:()=>import('../components/List.vue')},
    {
      path:'*',
      redirect:'/home'
    },
  ]
})
