import './assets/main.css';
import { createApp } from 'vue';
import App from './app/App.vue';
import 'primeicons/primeicons.css';

createApp(App)
  .directive('focus', (el: HTMLElement) => el.focus())
  .mount('#app');
