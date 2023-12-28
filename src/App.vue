<template>
  <div :class="paintingsStore.theme === 'dark' ? 'app__container--dark' : 'app__container'">
    <HeaderVue />
    <Filter />
    <paintings-list />
    <pagination-array />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PaintingsList from "./components/Paintings.vue";
import PaginationArray from "./components/Pagination/PaginationArray.vue";
import Filter from "./components/Filter/Filter.vue";
import HeaderVue from "./components/Header/Header.vue";
import usePaintingsStore from "./store/paintingsStore";

export default defineComponent({
  name: "App",
  data() {
    return {
      paintingsStore: usePaintingsStore(),
    };
  },
  components: {
    HeaderVue,
    Filter,
    PaintingsList,
    PaginationArray,
  },
  mounted() {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", this.paintingsStore.theme);
    } else {
      this.paintingsStore.theme = localStorage.getItem("theme") || "";
    }
  },
});
</script>
