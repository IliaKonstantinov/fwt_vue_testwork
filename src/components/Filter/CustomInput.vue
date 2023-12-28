<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="select__body">
    <div
      class="select__default"
      :class="{
        'select__default--dark': paintingsStore.theme === 'dark',
        'select__default--visible': isVisible === true,
      }"
      @click="isVisible = !isVisible"
    >
      {{ selectedOption || defaultOption }}
      <span v-if="selectedOption !== null">
        <undoSvg @click="handleDeleteOption()" />
      </span>
    </div>
    <div
      class="select__options"
      :class="{
        'select__options--visible': isVisible === true,
        'select__options--dark': paintingsStore.theme === 'dark' && isVisible === true,
      }"
    >
      <div
        class="select__option"
        :class="{
          select__hidden: isVisible === false,
          'select__option--dark': paintingsStore.theme === 'dark',
        }"
        v-for="option in options"
        :key="option.id"
        @click="handleOption(option.location || option.name, option.id)"
      >
        {{ option.location || option.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import usePaintingsStore from "@/store/paintingsStore";
import { defineComponent } from "vue";
import undoSvg from "./undoSvg.vue";

export default defineComponent({
  name: "CutomInput",
  data() {
    return {
      selectedOption: null as string | null,
      paintingsStore: usePaintingsStore(),
      isVisible: false as boolean,
    };
  },
  components: {
    undoSvg,
  },
  props: {
    defaultOption: {
      type: String,
      required: true,
    },
    options: {
      type: [Object],
      required: true,
    },
  },
  methods: {
    async handleOption(option: string, id: number) {
      switch (this.defaultOption) {
        case "Location":
          this.selectedOption = option;
          this.paintingsStore.locationId = id;
          break;
        case "Author":
          this.selectedOption = option;
          this.paintingsStore.authorId = id;
          break;
        default:
          throw new Error("Wrond default option! Check code in Filtre.vue");
      }
      this.isVisible = false;
      this.paintingsStore.page = 1;
      await this.paintingsStore.fetchPaintings();
    },
    async handleDeleteOption() {
      switch (this.defaultOption) {
        case "Location":
          this.selectedOption = null;
          this.paintingsStore.locationId = null;
          break;
        case "Author":
          this.selectedOption = null;
          this.paintingsStore.authorId = null;
          break;
        default:
          throw new Error("Wrond default option! Check code in Filtre.vue");
      }
      this.paintingsStore.page = 1;
      await this.paintingsStore.fetchPaintings();
    },
  },
});
</script>
