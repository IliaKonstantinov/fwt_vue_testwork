<template>
  <div :class="paintingStore.theme === 'dark' ? 'header__container--dark' : 'header__container'">
    <img className="header__logo" src="../../assets/images/fwt__logo.png" alt="Logo" />
    <theme-svg
      :class="paintingStore.theme === 'dark' ? 'header__theme--dark' : 'header__theme'"
      @click="paintingStore.changeTheme()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePaintingsStore from "../../store/paintingsStore";
import ThemeSvg from "./ThemeSvg.vue";

export default defineComponent({
  name: "HeaderVue",
  data() {
    return {
      paintingStore: usePaintingsStore(),
    };
  },
  components: {
    ThemeSvg,
  },
});
</script>
