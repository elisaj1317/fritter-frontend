<!-- Component for liking freets/comments (inline style) -->
<template>
  <span v-if="$store.state.username" class="like">
    <img :src="likeSrc" @click="submit"/>
    <span> {{ likedObject.numLikes }} </span>
  </span>
</template>

<script>
export default {
  name: "LikeButton",
  props: {
    likedObject: {
      // object being liked
      type: Object,
      required: true,
    },
    isFreet: {
      // true if object being liked is a freet, false if it is comment
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      justLiked: false, // no longer need to wait for like refresh to return for button to update
      justUnliked: false, // no longer need to wait for like refresh to return for button to update
      alerts: {},
    };
  },
  computed: {
    canLike() {
      if (this.isFreet) {
        return !this.$store.state.likedFreets.find(
          (liked) => liked._id == this.likedObject._id
        );
      }
      return !(
        this.$store.state.likedComments.filter(
          (liked) => liked._id == this.likedObject._id
        ).length > 0
      );
    },
    likeSrc() {
      // determines image based on canLike
      if (this.justUnliked || (!this.justLiked && this.canLike)) {
        return "images/heart.svg";
      }
      return "images/heart-fill.svg";
    },
  },
  methods: {
    async submit() {
      const url = this.isFreet
        ? `/api/likes/freet/${this.likedObject._id}`
        : `/api/likes/comment/${this.likedObject._id}`;

      const options = {};
      if (this.canLike) {
        options.method = "PUT";
      } else {
        options.method = "DELETE";
      }

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.canLike) {
          this.likedObject.numLikes += 1;
          this.justLiked = true;
          this.justUnliked = false;
        } else {
          this.likedObject.numLikes -= 1;
          this.justLiked = false;
          this.justUnliked = true;
        }

        if (this.isFreet) {
          this.$store.dispatch("refreshLikedFreets");
        } else {
          this.$store.dispatch("refreshLikedComments");
        }
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>

<style scoped>

.like {
  display: flex;
  align-items: center;
  gap: 0.25em;
}

img {
  width: 1.5em;
  height: 1.5em;
  filter: invert(31%) sepia(43%) saturate(1863%) hue-rotate(155deg) brightness(100%) contrast(101%);
  cursor: pointer;
}

.like > span {
  color: #007991;
  font-size: 1em;
}
</style>
