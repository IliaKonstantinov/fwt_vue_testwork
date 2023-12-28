import axios from "axios";
import { defineStore } from "pinia";

export interface paintingInfo {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface locationInfo {
  id: number;
  location: string;
}

export interface authorInfo {
  id: number;
  name: string;
}

const usePaintingsStore = defineStore({
  id: "paintingsStore",
  state: () => ({
    paintings: [] as paintingInfo[],
    locations: [] as locationInfo[],
    authors: [] as authorInfo[],
    paintingsCount: 0 as number,
    page: 1 as number,
    pages: 0 as number,
    objectsOnPage: 12 as number,
    q: null as string | null,
    authorId: null as number | null,
    locationId: null as number | null,
    created_gte: null as number | null,
    created_lte: null as number | null,
    theme: "white" as string,
  }),
  actions: {
    countPaginationPages() {
      this.pages = Math.ceil(this.paintingsCount / this.objectsOnPage);
    },
    async fetchPaintings() {
      const res = await axios.get("https://test-front.framework.team/paintings", {
        params: {
          _page: this.page,
          _limit: this.objectsOnPage,
          q: this.q,
          authorId: this.authorId,
          locationId: this.locationId,
          created_gte: this.created_gte,
          created_lte: this.created_lte,
        },
      });
      this.paintings = await res.data;
      this.paintingsCount = await Number(res.headers["x-total-count"]);
      this.countPaginationPages();
    },
    async fetchLocations() {
      const res = await axios.get("https://test-front.framework.team/locations");
      this.locations = await res.data;
    },
    async fetchAuthors() {
      const res = await axios.get("https://test-front.framework.team/authors");
      this.authors = await res.data;
    },
    changePage(value: number) {
      this.page = value;
      this.fetchPaintings();
    },
    changeTheme() {
      switch (this.theme) {
        case "white":
          this.theme = "dark";
          localStorage.setItem("theme", this.theme);
          break;
        case "dark":
          this.theme = "white";
          localStorage.setItem("theme", this.theme);
          break;
        default:
          throw new Error("Wrong theme degining! Check state in PaintingsStore.ts");
      }
    },
  },
});

export default usePaintingsStore;
