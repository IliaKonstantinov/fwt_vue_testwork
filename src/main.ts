import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style/index.scss';

const app = createApp(App);
const store = createPinia();

app.use(store).mount('#app');
