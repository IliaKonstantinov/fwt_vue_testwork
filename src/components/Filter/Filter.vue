<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="filter__container">
    <input
      placeholder="Name"
      class="filter__input--name"
      :class="paintingsStore.theme === 'dark' ? 'filter__input--dark' : ''"
      aria-label="search by name"
      type="text"
      v-model="name"
    />
    <custom-input
      name="locations"
      class="filter__select"
      :options="paintingsStore.locations"
      :defaultOption="'Location'"
    />
    <custom-input name="authors" :options="paintingsStore.authors" :defaultOption="'Author'" />
    <div
      class="filter__created"
      :class="{
        'filter__created--dark': paintingsStore.theme === 'dark',
        'filter__created--visible': isVisible === true,
      }"
    >
      <div class="filter__default" @click="isVisible = !isVisible">Created</div>
      <div
        class="filter__inputs"
        :class="{
          inputs__hidden: isVisible === false,
          'inputs--dark': paintingsStore.theme === 'dark',
        }"
      >
        <input
          class="filter__input"
          placeholder="from"
          aria-label="search from year"
          type="number"
          v-model="from"
        />
        <input
          class="filter__input"
          placeholder="before"
          aria-label="search before year"
          type="number"
          v-model="before"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePaintingsStore from "@/store/paintingsStore";
import CustomInput from "./CustomInput.vue";

export default defineComponent({
  name: "PaintingsFilter",
  data() {
    return {
      paintingsStore: usePaintingsStore(),
      isVisible: false as boolean,
      from: null as number | null,
      before: null as number | null,
      name: null as string | null,
    };
  },
  components: {
    CustomInput,
  },
  watch: {
    async name(newValue: string) {
      if (newValue) {
        this.paintingsStore.q = newValue;
      } else {
        this.paintingsStore.q = null;
      }
      this.paintingsStore.page = 1;
      await this.paintingsStore.fetchPaintings();
    },
    async from(newValue) {
      if (newValue) {
        this.paintingsStore.created_gte = newValue;
      } else {
        this.paintingsStore.created_gte = null;
      }
      this.paintingsStore.page = 1;
      await this.paintingsStore.fetchPaintings();
    },
    async before(newValue: number) {
      if (newValue) {
        this.paintingsStore.created_lte = newValue;
      } else {
        this.paintingsStore.created_lte = null;
      }
      this.paintingsStore.page = 1;
      await this.paintingsStore.fetchPaintings();
    },
  },
});
</script>
