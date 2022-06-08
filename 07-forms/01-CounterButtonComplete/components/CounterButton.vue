<template>
  <button @click="this.value++">{{ value }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  emits: ['update:count'],
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.value = value;
      },
    },
    value(value) {
      this.$emit('update:count', value);
    },
  },
};
</script>
