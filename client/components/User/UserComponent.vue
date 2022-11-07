<!-- Reusable component representing a single user and its actions -->

<template>
  <article class="user">
    <h3 class="author">@{{ username }}</h3>

    <div v-if="!loadingFollowers && !loadingFollowings && !Object.keys(alerts).length">
      <FollowButton
        v-if="username !== $store.state.username"
        @refreshFollowers="fetchFollowers"
        :username="username"
        :canFollow="canFollow()"
      />
    </div>
    <div v-else-if="loadingFollowers || loadingFollowings">
      <h4>Loading user details</h4>
    </div>
    <div v-else>
      <h4>User not found</h4>
    </div>
  </article>
</template>

<script>
import FollowButton from "@/components/User/FollowButton.vue";

export default {
  name: "UserComponent",
  components: { FollowButton },
  props: {
    // Data from the stored freet
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loadingFollowings: true,
      loadingFollowers: true,
      followings: [],
      followers: [],
      alerts: {}
    };
  },
  created() {
    this.fetchFollowings();
    this.fetchFollowers();
  },
  methods: {
    canFollow() {
      return (
        this.followers.filter(
          (follow) => follow.followee == this.$store.state.username
        ).length == 0
      );
    },
    async fetchFollowings() {
      this.loadingFollowings = true;

      const url = `api/follows?followee=${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.followings = res;
        this.loadingFollowings = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loadingFollowings = false;
        // setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async fetchFollowers() {
      this.loadingFollowers = true;

      const url = `api/follows?followed=${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.followers = res;
        this.loadingFollowers = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loadingFollowers = false;
        // setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>

<style scoped>
.user {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>