<!-- Component for following users -->
<template>
  <span>
    <button type="submit" @click="submit">
      {{ buttonText }}
    </button>
  </span>
</template>

<script>
export default {
  name: "FollowButton",
  props: {
    username: {
      // username of user to follow
      type: String,
      required: true,
    },
    canFollow: {
      // true if currentUser can follow username, false if already following
      type: Boolean,
      required: true,
    },
  },
  data() {
    return { 
      justFollowed: false, // no longer need to wait for refresh followers for button to update
      justUnfollowed: false,  // no longer need to wait for refresh followers for button to update
      alerts: {} };
  },
  computed: {
    buttonText() {
      // determines text based on canFollow
      if (this.justUnfollowed || (!this.justFollowed && this.canFollow)) {
        return "Follow";
      }
      return "Unfollow";
    },
  },
  methods: {
    async submit() {
      const url = `/api/follows/${this.username}`;

      const options = {};
      if (this.canFollow) {
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

        if (this.canFollow) {
          this.justFollowed = true;
          this.justUnfollowed = false;
        } else {
          this.justFollowed = false;
          this.justUnfollowed = true;
        }

        this.$emit("refreshFollowers");
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>
