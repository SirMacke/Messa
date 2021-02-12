import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Socketio from './plugins/Socketio.js'

const app = createApp(App)

app.use(store)
app.use(router)

app.use(Socketio, {
    connection: 'http://localhost:3001',
    options: {
        // Your Socket.io options here
    }
})

app.mount('#app')
