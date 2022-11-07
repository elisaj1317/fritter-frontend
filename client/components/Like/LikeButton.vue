<!-- Component for liking freets/comments (inline style) -->
<template>
  <span v-if="$store.state.username">
    <button type="submit" @click="submit">
      {{ buttonText }}
    </button>
    <span> {{ likedCopy.numLikes }} </span>
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
      likedCopy: this.likedObject,
      alerts: {},
    };
  },
  computed: {
    canLike() {
      if (this.isFreet) {
        return !(
          this.$store.state.likedFreets.filter(
            (liked) => liked._id == this.likedCopy._id
          ).length > 0
        );
      }
      return !(
        this.$store.state.likedComments.filter(
          (liked) => liked._id == this.likedCopy._id
        ).length > 0
      );
    },
    buttonText() {
      // determines text based on canLike
      if (this.justUnliked || (!this.justLiked && this.canLike)) {
        return "Like";
      }
      return "Unlike";
    },
  },
  methods: {
    async submit() {
      const url = this.isFreet
        ? `/api/likes/freet/${this.likedCopy._id}`
        : `/api/likes/comment/${this.likedCopy._id}`;

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
          this.likedCopy.numLikes += 1;
          this.justLiked = true;
          this.justUnliked = false;
        } else {
          this.likedCopy.numLikes -= 1;
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
