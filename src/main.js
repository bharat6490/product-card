import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './components/store'
// import Vue from 'vue';
// const EventBus = new Vue();
// export default EventBus;
// const VueEventBus = require('vue-event-bus')
createApp(App)
// app.use(eventBus)
// app.use(VueEventBus)
.use(router)
.use(store)
.mount('#app')
// createApp(App).use(router).mount('#app')

