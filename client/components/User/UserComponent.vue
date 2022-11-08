<!-- Reusable component representing a single user and its actions -->

<template>
  <article class="user">
    <div class="name-container">
      <UsernameComponent :username="username" />
      <FollowButton
        v-if="shouldShowFollowButton"
        @refreshFollowers="fetchFollowers"
        :username="username"
        :canFollow="canFollow()"
      />
    </div>

    <div
      v-if="
        showFollowData && !loadingFollowers && !loadingFollowings && !Object.keys(alerts).length
      "
      class="follow-data"
    >
      <router-link
        :to="{ path: `/user/${username}/followers` }"
        class="data-router"
        >{{ followers.length }} Followers</router-link
      >
      <router-link
        :to="{ path: `/user/${username}/followings` }"
        class="data-router"
        >{{ followings.length }} Following</router-link
      >
    </div>
    <div v-else-if="showFollowData && (loadingFollowers || loadingFollowings)">
      <h4>Loading user details</h4>
    </div>
    <div v-else-if="showFollowData">
      <h4>User not found</h4>
    </div>
  </article>
</template>

<script>
import FollowButton from "@/components/Follow/FollowButton.vue";
import UsernameComponent from "@/components/User/UsernameComponent.vue";

export default {
  name: "UserComponent",
  components: { FollowButton, UsernameComponent },
  props: {
    // Data from the stored freet
    username: {
      type: String,
      required: true,
    },
    showFollowData: {
      type: Boolean,
      required: true,
    },
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
  computed: {
    shouldShowFollowButton() {
      return (
        this.$store.state.username &&
        this.username !== this.$store.state.username &&
        !this.loadingFollowings &&
        !this.loadingFollowers &&
        !Object.keys(this.alerts).length
      );
    }
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
      return !this.followers.find(
        (follow) => follow.followee == this.$store.state.username
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
.name-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
}

.follow-data {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1.5em;
}

.data-router {
  text-decoration: none;
  color: #007991;
  font-weight: bold;
}

.user {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
  background-color: #bcd8c1;
  border-radius: 5px;
}
</style>
