<template>
  <button
    :class="{ ['dropdown__item']: !isTitle, ['dropdown__item_icon']: item?.icon || hasIcon }"
    role="option"
    type="button"
  >
    <ui-icon :icon="item?.icon" class="dropdown__icon" />
    {{ item.text }}
  </button>
</template>
<script>
import UiIcon from './UiIcon';
export default {
  name: 'UiDropdownItem',
  components: { UiIcon },
  props: {
    item: {
      type: Object,
      required: true,
      validator: (value) => {
        return typeof value?.value === 'string' && typeof value?.text === 'string';
      },
    },
    isTitle: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>
<style scoped>
.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
