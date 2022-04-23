import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  data() {
    return {
      a: 0,
      b: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      const { a, b } = this;
      switch (this.operator) {
        case 'sum':
          return a + b;
        case 'subtract':
          return a - b;
        case 'multiply':
          return a * b;
        case 'divide':
          return b !== 0 ? a / b : NaN;
      }
    },
  },
});

const app = createApp(Root).mount('#app');
