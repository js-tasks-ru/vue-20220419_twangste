<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
      @onClose="removeToast(toast.id)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    addToast(type, message) {
      const toast = {
        id: Date.now(),
        type,
        message,
      };
      this.toasts.push(toast);
    },

    removeToast(id) {
      this.toasts = this.toasts.filter((item) => item.id !== id);
    },

    success(message) {
      this.addToast('success', message);
    },

    error(message) {
      this.addToast('error', message);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
