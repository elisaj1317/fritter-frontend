<!-- Reusable component representing a single user and its actions -->

<template>
  <article class="user">
    <h3 v-if="showFollowData" class="author">@{{ username }}</h3>
    <h3 v-else class="author"><router-link :to="{ path: `/user/${username}`}">@{{username}}</router-link></h3>

    <div
      v-if="
        !loadingFollowers && !loadingFollowings && !Object.keys(alerts).length
      "
    >
      <FollowButton
        v-if="$store.state.username && (username !== $store.state.username)"
        @refreshFollowers="fetchFollowers"
        :username="username"
        :canFollow="canFollow()"
      />

      <router-link v-if="showFollowData" :to="{ path: `/user/${username}/followers` }"
        >{{followers.length}} Followers</router-link
      >
      <router-link v-if="showFollowData" :to="{ path: `/user/${username}/followings` }"
        >{{followings.length}} Following</router-link
      >
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
    showFollowData: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      loadingFollowings: false,
      loadingFollowers: false,
      followings: [],
      followers: [],
      alerts: {},
    };
  },
  created() {
    if (this.showFollowData) {
      this.loadingFollowings = true;
      this.fetchFollowings();
    }

    this.loadingFollowers = true;
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
