import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const Root = defineComponent({
  data() {
    return {
      count: 0,
    };
  },
});

const app = createApp(Root);
app.mount('#app');
