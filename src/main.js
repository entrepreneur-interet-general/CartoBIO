import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vue from 'vue'

// Vuetify & theme
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    biogreen: '#b9d065', // agence bio green for navbar, ... Maybe create a full theme around it ?
    bioblue: '#84d0f0'
  }
})

// VueLayers & associated css
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import i18n from './i18n'
Vue.use(VueLayers)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')