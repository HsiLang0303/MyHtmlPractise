import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/home/Home.vue'
import BabyParent from '@/views/home/BabyParent.vue'
import ClothingBags from '@/views/home/ClothingBags.vue'
import Crowdfunding from '@/views/home/Crowdfunding.vue'
import DigitalAppliance from '@/views/home/DigitalAppliance.vue'
import ForYouSelect from '@/views/home/ForYouSelect.vue'
import GlobalSelect from '@/views/home/GlobalSelect.vue'
import HomeLife from '@/views/home/HomeLife.vue'
import PersonalCare from '@/views/home/PersonalCare.vue'
import PetLife from '@/views/home/PetLife.vue'
import SportsTravel from '@/views/home/SportsTravel.vue'
import WineFood from '@/views/home/WineFood.vue'


const routes = [
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',
        component:Home
      },
      {
        path:'/babyParent',
        component:BabyParent
      },
      {
        path:'/clothingBags',
        component:ClothingBags
      },
      {
        path:'/crowdfunding',
        component:Crowdfunding
      },
      {
        path:'/digitalAppliance',
        component:DigitalAppliance
      },
      {
        path:'/forYouSelect',
        component:ForYouSelect
      },
      {
        path:'/globalSelect',
        component:GlobalSelect
      },
      {
        path:'/homeLife',
        component:HomeLife
      },
      {
        path:'/personalCare',
        component:PersonalCare
      },
      {
        path:'/petLife',
        component:PetLife
      },
      {
        path:'/sportsTravel',
        component:SportsTravel
      },
      {
        path:'/wineFood',
        component:WineFood
      }
    ]
  },
  {
    path:'/Login',
    component:Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
