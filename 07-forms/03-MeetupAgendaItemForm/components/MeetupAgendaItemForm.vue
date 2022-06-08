<template>
  {{ duration }}
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="item.type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input type="time" placeholder="00:00" name="startsAt" v-model="item.startsAt" @change="startsAtChange" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" placeholder="00:00" name="endsAt" v-model="item.endsAt" @change="endsAtChange" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleText">
      <ui-input name="title" v-model="item.title" />
    </ui-form-group>

    <ui-form-group label="Докладчик" v-if="isTypeTalk">
      <ui-input name="speaker" v-model="item.speaker" />
    </ui-form-group>
    <ui-form-group label="Описание" v-if="isTypeOther || isTypeTalk">
      <ui-input multiline name="description" v-model="item.description" />
    </ui-form-group>
    <ui-form-group label="Язык" v-if="isTypeTalk">
      <ui-dropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="item.language" />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const timeToMs = (time) => +new Date(`1970-01-01T${time}`);
const msToTimeString = (ms) => new Date(ms).toTimeString().substr(0, 5);

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:agendaItem', 'remove'],
  data() {
    return {
      item: {},
      duration: 0,
    };
  },
  mounted() {
    this.item = { ...this.agendaItem };
    this.duration = this.getDuration();
  },
  computed: {
    titleText() {
      switch (this.item.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
    isTypeTalk() {
      return this.item.type === 'talk';
    },
    isTypeOther() {
      return this.item.type === 'other';
    },
  },
  methods: {
    startsAtChange(event) {
      const endDateMs = timeToMs(event.target.value) + this.duration;
      this.item.endsAt = msToTimeString(endDateMs);
    },
    endsAtChange(event) {
      this.duration = this.getDuration();
    },

    getDuration() {
      const startDate = timeToMs(this.item.startsAt);
      const endDate = timeToMs(this.item.endsAt);
      return endDate - startDate;
    },
  },
  watch: {
    item: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', newValue);
      },
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
