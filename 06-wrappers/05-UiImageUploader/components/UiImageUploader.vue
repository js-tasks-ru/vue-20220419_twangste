<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="url ? `--bg-url: url('${url}')` : ''"
    >
      <span class="image-uploader__text">{{ imageUploaderText }}</span>
      <input
        ref="input"
        type="file"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        @change="handleChange"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  inheritAttrs: false,
  emits: ['select', 'remove', 'upload', 'error'],
  data() {
    return {
      url: null,
      loading: false,
    };
  },

  watch: {
    preview: {
      immediate: true,
      handler(value) {
        this.url = value;
        // if (!value) {
        //   this.removeFile();
        // }
      },
    },
  },
  computed: {
    imageUploaderText() {
      return this.loading ? 'Загрузка...' : this.url ? 'Удалить изображение' : 'Загрузить изображение';
    },
  },
  methods: {
    handleClick(event) {
      if (this.url) {
        this.removeFile();
        event.preventDefault();
      }
    },
    removeFile() {
      this.url = null;
      this.$refs.input.value = null;
      this.$emit('remove');
    },

    handleChange(event) {
      const file = event.target.files[0];
      this.$emit('select', file);
      if (this.uploader) this.uploadHandler(file);
      else this.url = (file instanceof File && URL.createObjectURL(file)) || null;
    },

    async uploadHandler(file) {
      try {
        this.loading = true;
        const response = await this.uploader(file);
        this.$emit('upload', response);
        this.url = response.image;
      } catch (error) {
        this.$emit('error', error);
        this.removeFile();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
