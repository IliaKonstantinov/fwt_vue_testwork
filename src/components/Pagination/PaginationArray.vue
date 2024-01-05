<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="pagination__container">
    <on-first-page
      class="pagination__image pagination__first"
      :class="{
        image__disabled: paintingsStore.page === 1,
        'pagination__image--dark': paintingsStore.theme === 'dark',
      }"
      @click="changePage(1)"
    />
    <decrement
      class="pagination__image"
      :class="{
        image__disabled: paintingsStore.page === 1,
        'pagination__image--dark': paintingsStore.theme === 'dark',
      }"
      @click="changePage((paintingsStore.page -= 1))"
    />
    <div
      class="pagination__page"
      :class="{
        'current__page--dark': page === paintingsStore.page && paintingsStore.theme === 'dark',
        current__page: page === paintingsStore.page,
        'pagination__page--dark': paintingsStore.theme === 'dark',
      }"
      v-for="page in paintingsStore.pages"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </div>
    <increment
      class="pagination__image"
      :class="{
        image__disabled: paintingsStore.page === paintingsStore.pages,
        'pagination__image--dark': paintingsStore.theme === 'dark',
      }"
      @click="changePage((paintingsStore.page += 1))"
    />
    <on-last-page
      class="pagination__image pagination__last"
      :class="{
        image__disabled: paintingsStore.page === paintingsStore.pages,
        'pagination__image--dark': paintingsStore.theme === 'dark',
      }"
      @click="changePage(paintingsStore.pages)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePaintingsStore from "../../store/paintingsStore";
import decrement from "./Decr.vue";
import increment from "./Incr.vue";
import OnFirstPage from "./OnFirstPage.vue";
import OnLastPage from "./OnLastPage.vue";

export default defineComponent({
  name: "PaginationArray",
  components: {
    decrement,
    increment,
    OnFirstPage,
    OnLastPage,
  },
  data() {
    return {
      paintingsStore: usePaintingsStore(),
    };
  },
  methods: {
    changePage(page: number) {
      this.paintingsStore.changePage(page);
    },
  },
});
</script>
