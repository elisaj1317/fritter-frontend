<!-- Displays a user profile -->

<template>
  <main>
    <div v-if="freets.length">
      <FollowButton 
      v-if="$route.params.user !== $store.state.username"
      @refreshFollowers="fetchFollowers"
      :username="$route.params.user"
      :canFollow="canFollow()"
      />
      <section>
        <header>
          <h2>Freets by @{{ $route.params.user }}:</h2>
        </header>
        <FreetComponent
          v-for="freet in freets"
          :key="freet._id"
          :freet="freet"
        />
      </section>
    </div>
    <div v-else-if="loadingFreets">
      <h2>Loading</h2>
    </div>
    <div v-else-if="Object.keys(alerts).length">
      <h2>User not found. Return to <router-link to="/">Home</router-link>.</h2>
    </div>
    <div v-else>
      <h2>There are no freets written by @{{ $route.params.user }}.</h2>
    </div>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import FollowButton from "@/components/User/FollowButton.vue";


export default {
  name: "UserPage",
  components: {
    FreetComponent,
    FollowButton
  },
  data() {
    return {
      loadingFreets: false,
      loadingFollowings: false,
      loadingFollowers: false,
      freets: [],
      followings: [],
      followers: [],
      alerts: {},
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.freets = [];
        this.fetchFreets();
        this.fetchFollowings();
        this.fetchFollowers();
      },
      { immediate: true }
    );
  },
  methods: {
    canFollow() {
      return this.followers.filter(follow => follow.followee == this.$store.state.username).length == 0;
    },
    async fetchFreets() {
      this.loadingFreets = true;

      const url = `api/freets?author=${this.$route.params.user}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.freets = res;
        this.loadingFreets = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loadingFreets = false;
        // setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async fetchFollowings() {
      this.loadingFollowings = true;

      const url = `api/follows?followee=${this.$route.params.user}`;
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

      const url = `api/follows?followed=${this.$route.params.user}`;
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