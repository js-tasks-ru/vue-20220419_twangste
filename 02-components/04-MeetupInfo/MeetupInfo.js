import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: { type: String },
    place: { type: String },
    date: { type: Number, require: true },
  },
  computed: {
    meetupDate() {
      return new Date(this.date);
    },
    formatedMeetupDate() {
      return this.meetupDate.toISOString().slice(0, 10);
    },
    localizedMeetupDate() {
      return this.meetupDate.toLocaleDateString(navigator.language, { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formatedMeetupDate">{{localizedMeetupDate}}</time>
      </li>
    </ul>`,
});
