import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      meetup: null,
      loading: false,
      error: null,
    };
  },

  methods: {
    async getMeetup(id) {
      try {
        this.loading = true;
        this.error = null;
        this.meetup = await fetchMeetupById(id);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },

  computed: {
    showMeetup() {
      const { loading, error, meetup } = this;
      return !loading && !error && meetup;
    },
  },

  watch: {
    meetupId(id) {
      this.getMeetup(id);
    },
  },

  mounted() {
    this.getMeetup(this.meetupId);
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="showMeetup" :meetup="meetup"/>

      <ui-container>
        <ui-alert v-if="loading">Загрузка...</ui-alert>
      </ui-container>

      <ui-container>
        <ui-alert v-if="error">{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
