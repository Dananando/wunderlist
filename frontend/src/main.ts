import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
