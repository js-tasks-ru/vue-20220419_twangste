<template>
  <div class="toast" :class="class">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>
<script>
import UiIcon from './UiIcon';

const iconByType = {
  success: 'check-circle',
  error: 'alert-circle',
};

export default {
  name: 'UiToast',
  components: { UiIcon },

  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    closeTimeout: {
      type: Number,
      default: 5 * 1000,
    },
  },
  computed: {
    class() {
      return `toast_${this.type}`;
    },
    icon() {
      return iconByType?.[this.type] || '';
    },
  },
  methods: {
    onClose() {
      this.$emit('onClose');
    },
  },

  mounted() {
    if (this.closeTimeout) {
      setTimeout(() => {
        this.onClose();
      }, this.closeTimeout);
    }
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
.toast + .toast {
  margin-top: 20px;
}
</style>
