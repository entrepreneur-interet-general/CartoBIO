import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Map from './views/Map'
import data from "@/data.json"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/carte',
      name: 'map',
      component: Map,
      props: {
        parcels: data.features
      }
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import( /* webpackChunkName: "map" */ './views/Map.vue')
    },
    {
      path: '/carte/:user',
      name: 'mapuser',
      component: Map,
      props: (route) => ({
        parcels: getUserParcels(route.params.user)
      })
    }


  ]
})

// suremly not the best place for this
let getUserParcels = (userName) => {
  let filteredData = data.features.filter((feat) => {
    return feat.properties.NOM === userName.toUpperCase();
  });
  return filteredData;
}