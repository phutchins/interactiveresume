import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faPhone, faLocationDot, faSun, faMoon, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './style.css'
import App from './App.vue'

// Add FontAwesome icons
library.add(faEnvelope, faPhone, faLocationDot, faSun, faMoon, faBuilding, faLinkedin)

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    }
  ]
})

// Create and mount the app
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
