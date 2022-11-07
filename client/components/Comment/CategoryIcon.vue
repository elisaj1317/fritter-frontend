<template>
  <span
    class="reaction"
    :class="{ active: isActive, selectable: isSelectable }"
  >
    <img :src="src" :alt="alt" @click="$emit('click')" />
  </span>
</template>

<script>
export default {
  name: "CategoryIcon",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    isSelectable: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
img {
  width: 2.5em;
  height: 2.5em;
}

.reaction {
  padding: 0.3em;
}

.selectable.reaction {
  user-select: none;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
}

.selectable.reaction:hover:not(.active) {
  background-color: #74c0fc;
}
.selectable.active {
  background-color: #228be6;
}
</style>