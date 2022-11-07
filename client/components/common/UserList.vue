<!-- Reusable component representing a list of users -->

<template>
  <main>
    <h2>{{ title }}</h2>
    <div v-if="users.length">
      <UserComponent v-for="user in users" :key="user" :username="user" />
    </div>
    <div v-else-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-else-if="Object.keys(alerts).length">
      <h3>Error getting data.</h3>
    </div>
    <div v-else>
      <h3>No data to display</h3>
    </div>
  </main>
</template>

<script>
import UserComponent from "@/components/User/UserComponent.vue";

export default {
  name: "UserList",
  components: {
    UserComponent,
  },
  data() {
    /**
     * Options for displaying this list.
     */
    return {
      title: "", // Title for page
      users: [], // List of users to display
      loading: true, // True if users are loading, false otherwise
      alerts: {}, // Alerts during fetching
    };
  },
};
</script>