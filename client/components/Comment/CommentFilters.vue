<!-- Component for filtering comments -->
<template>
  <div>
    <h2>Filter Comments by:</h2>
    <div class="reactions">
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
  align-items: center;
  justify-content: space-between;
}

.reactions {
  gap: 1em;
}

</style>
