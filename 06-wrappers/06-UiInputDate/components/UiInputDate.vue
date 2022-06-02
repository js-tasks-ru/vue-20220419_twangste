<template>
  <ui-input ref="input" :type="type" v-model="value" @change="onChange" v-bind="$attrs">
    <template v-if="hasLeftIcon()" #left-icon>
      <component :is="$slots['left-icon']" />
    </template>
    <template v-if="hasRightIcon()" #right-icon>
      <component :is="$slots['right-icon']" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        const date = new Date(this.modelValue);
        const hasStep = !!this.$attrs?.step;
        switch (this.type) {
          case 'date':
            return date.toISOString().substr(0, 10);
          case 'time':
            return date.toISOString().substr(11, hasStep ? 8 : 5);
          case 'datetime-local':
            return date.toISOString().substr(0, 16);
          default:
            return this.modelValue.toString();
        }
      },
    },
  },

  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
    hasLeftIcon() {
      return !!this.$slots['left-icon'];
    },
    hasRightIcon() {
      return !!this.$slots['right-icon'];
    },
  },
  mounted() {
    console.log({ slots: this.$slots });
  },
};
</script>
