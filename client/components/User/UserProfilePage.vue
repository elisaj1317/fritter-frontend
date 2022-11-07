<!-- Displays a user profile -->

<template>
  <main>
    <div v-if="freets.length">
      <section>
        <header>
          <h2>@{{ $route.params.user }}'s Profile</h2>
        </header>
        <UserComponent :username="$route.params.user" />
      </section>

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
import UserComponent from "@/components/User/UserComponent.vue";

export default {
  name: "UserProfilePage",
  components: {
    FreetComponent,
    UserComponent,
  },
  data() {
    return {
      loadingFreets: false,
      freets: [],
      alerts: {},
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.freets = [];
        this.fetchFreets();
        // this.fetchFollowings();
        // this.fetchFollowers();
      },
      { immediate: true }
    );
  },
  methods: {
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
      }
    },
  },
};
</script>