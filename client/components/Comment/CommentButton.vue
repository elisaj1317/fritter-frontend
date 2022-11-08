<!-- Component for commenting on freets -->
<template>
  <span>
    <img src="https://www.svgrepo.com/show/357540/comment.svg"  @click="redirectToComments" />
  </span>
</template>

<script>
export default {
  name: "CommentButton",
  props: {
    freetId: {
      type: String,
      required: true,
    },
  },
  data() {
    return { alerts: {} };
  },
  methods: {
    redirectToComments() {
      this.$router.push(`/freet/${this.freetId}`);
    },
  },
};
</script>

<style scoped>
span {
  display: flex;
  align-items: center;
}

img {
  width: 1.5em;
  height: 1.5em;
  filter: invert(31%) sepia(43%) saturate(1863%) hue-rotate(155deg) brightness(100%) contrast(101%);
  cursor: pointer;
}
</style>
