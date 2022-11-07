<!-- Reusable component representing a list of freets -->

<template>
  <main>
    <h2>{{ title }}</h2>
    <div v-if="freets.length">
      <FreetComponent v-for="freet in freets" :key="freet._id" :freet="freet" />
    </div>
    <div v-else-if="!$store.state.username">
      <h3><router-link to="/login">Login</router-link> to view this page.</h3>
    </div>
    <div v-else>
      <h3>No data to display</h3>
    </div>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";

export default {
  name: "FreetList",
  components: {
    FreetComponent
  },
  data() {
    /**
     * Options for displaying this list.
     */
    return {
      title: "", // Title for page
      loading: true, // True if freets are loading, false otherwise
      alerts: {}, // Alerts during fetching
    };
  },
  computed: {
    freets() {
      return [];
    }
  }
};
</script>