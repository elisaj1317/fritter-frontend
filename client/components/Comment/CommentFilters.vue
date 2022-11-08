<!-- Component for filtering comments -->
<template>
  <div>
    <h2>Filter by:</h2>
    <CategoryIcon
      v-for="(value, key) in categories"
      :key="key"
      :src="value.src"
      :alt="key"
      :isSelectable="true"
      :isActive="chosenCategoriesIdx.includes(value.index)"
      @click="clickOn(value.index)"
    />
  </div>
</template>

<script>
import CategoryIcon from "@/components/Comment/CategoryIcon.vue";

export default {
  name: "CommentFilters",
  components: { CategoryIcon },
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { chosenCategoriesIdx: [], alerts: {} };
  },
  methods: {
    clickOn(index) {
      console.log("here");
      if (!this.chosenCategoriesIdx.includes(index)) {
        this.chosenCategoriesIdx.push(index);
      } else {
        this.chosenCategoriesIdx.splice(
          this.chosenCategoriesIdx.indexOf(index),
          1
        );
      }

      this.$emit("updatedFilter", this.chosenCategoriesIdx);
    },
  },
};
</script>

<style scoped>

div {
  display: flex;
  gap: 0.5em;
}

</style>
