import { createApp } from 'vue';
import router from '@/router/router.js';
import App from '@/App.vue';
require('./style.scss');

const app = createApp(App);

app.use(router)
app.mount('#root');
