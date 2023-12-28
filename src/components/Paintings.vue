<template>
  <div class="paintings__container">
    <h1 v-if="paintingsStore.paintings.length == 0">Идет загрузка списка картин...</h1>
    <div class="paintings__item"
      v-else v-for="painting in paintingsStore.paintings"
      :key=painting.id
    >
      <img
        className="paintings__image"
        :src="'https://test-front.framework.team' + painting.imageUrl"
        alt="Изображение картины"
      />
      <div className="paintings__descr">
        <h2 className="paintings__title">{{painting.name}}</h2>
        <p className="paintings__string">
          <span className="paintings__bald">
            Author:
          </span>
          {{setAuthor(painting.authorId)}}
        </p>
        <p className="paintings__string">
          <span className="paintings__bald">Created: </span>
          {{painting.created}}
        </p>
        <p className="paintings__string">
          <span className="paintings__bald">
            Location:
          </span>
          {{setLocation(painting.locationId)}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import usePaintingsStore from '../store/paintingsStore';

export default defineComponent({
  name: 'PaintingsList',
  data() {
    return {
      paintingsStore: usePaintingsStore(),
    };
  },
  methods: {
    setAuthor(authorId:number) {
      let author = null as string | null;
      for (let i = 0; i < this.paintingsStore.authors.length; i += 1) {
        if (this.paintingsStore.authors[i].id === authorId) {
          author = this.paintingsStore.authors[i].name;
        }
      }
      return author;
    },
    setLocation(locationId:number) {
      let location = null as string | null;
      for (let i = 0; i < this.paintingsStore.locations.length; i += 1) {
        if (this.paintingsStore.locations[i].id === locationId) {
          location = this.paintingsStore.locations[i].location;
        }
      }
      return location;
    },
  },
  async mounted() {
    await this.paintingsStore.fetchPaintings();
    await this.paintingsStore.fetchLocations();
    await this.paintingsStore.fetchAuthors();
  },
});
</script>
