import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const RootComponent = defineComponent({
  data() {
    return {
      meetups: [],
      activeMeetupId: 1,
    };
  },
  computed: {
    currentMeetup() {
      return this.meetups.find((item) => item.id === this.activeMeetupId);
    },
  },
  watch: {
    activeMeetupId: function (id) {
      if (id && !this.currentMeetup) this.getMeetUpdata(id);
    },
  },
  methods: {
    async getMeetUpdata(id) {
      if (!id) return;
      const index = this.meetups.findIndex((item) => item.id === id);
      if (index === -1) {
        const response = await fetchMeetupById(id);
        if (response) this.meetups.push(response);
      }
    },
  },
  mounted() {
    this.getMeetUpdata(this.activeMeetupId);
  },
});

const app = createApp(RootComponent).mount('#app');
