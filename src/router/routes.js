// import Home from '@/views/Home'
// 路由懒加载  加载第一次访问这个路由的时候才会加载
const Home = ()=>import('@/views/Home')
// import Search from '@/views/Search'
const Search = ()=>import('@/views/Search')
// import Login from '@/views/Login'
const Login = ()=>import('@/views/Login')
// import Register from '@/views/Register'
const Register = ()=>import('@/views/Register')
// import Detail from '@/views/Detail'
const Detail = ()=>import('@/views/Detail')
// import AddCartSuccess from '@/views/AddCartSuccess'
const AddCartSuccess = ()=>import('@/views/AddCartSuccess')
// import ShopCart from '@/views/ShopCart'
const ShopCart = ()=>import('@/views/ShopCart')
// import Trade from '@/views/Trade'
const Trade = ()=>import( '@/views/Trade')
// import Pay from '@/views/Pay'
const Pay = ()=>import('@/views/Pay')
// import PaySuccess from '@/views/PaySuccess'
const PaySuccess = ()=>import('@/views/PaySuccess')
// import Center from '@/views/Center'
const Center = ()=>import('@/views/Center')
// import MyOrder from '@/views/Center/MyOrder'
const MyOrder = ()=>import('@/views/Center/MyOrder')
// import GroupOrder from '@/views/Center/GroupOrder'
const GroupOrder = ()=>import('@/views/Center/GroupOrder')
import store from '@/store'
export default [
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect: 'myorder'
      },
    ]
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === 'pay'){
        next()
      }else{
        next('/')
      }
    }
  },
  {    
    path:'/pay',
  component:Pay,
  beforeEnter: (to, from, next) => {
    if(from.path === '/trade'){
      next()
    }else{
      next('/')
    }
  }
},
  {
    path:'/trade',
    component:Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if(skuInfo&&skuNum){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/detail/:skuId',
    component:Detail
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/search/:keyword?',
    component:Search,
    name:'search',
    props: (route)=>({keyword:route.params.keyword, keyword1: route.query.keyword1 })
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHidden:true
    },
    beforeEnter: (to, from, next) => {
      if(store.state.users.userInfo.name){
        next('/')
      }else{
        next()
      }
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHidden:true
    }
  },
  {
    path:'/',
    redirect:'/home'
  }
]