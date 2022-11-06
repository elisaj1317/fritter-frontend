<!-- Component for filtering comments -->
<template>
  <div>
    <h2>Filter by: </h2>
    <span
      v-for="(value, key) in categories"
      :key="key"
      class="reaction"
      :class="{ active: chosenCategoriesIdx.includes(value.index)}"
    >
      <img :src="value.src" :alt="key" @click="clickOn(value.index)" />
    </span>
  </div>
</template>

<script>
export default {
  name: "CommentFilters",
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
      if (!this.chosenCategoriesIdx.includes(index)) {
        this.chosenCategoriesIdx.push(index);
      } else {
        this.chosenCategoriesIdx.splice(this.chosenCategoriesIdx.indexOf(index), 1);
      }
      
      this.$emit("updatedFilter", this.chosenCategoriesIdx);
    },
  },
};
</script>

<style scoped>
img {
  width: 2.5em;
  height: 2.5em;
}

div {
  display: flex;
  gap: 2em;
}

.reaction {
  user-select: none;
  display: flex;
  padding: 0.3em;
  border-radius: 50%;
  cursor: pointer;
}

.reaction:hover:not(.active) {
  background-color: #74c0fc;
}
.active {
  background-color: #228be6;
}
</style>
