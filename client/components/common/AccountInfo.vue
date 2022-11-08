<template>
  <div>
    <div class="nav-bar">
      <router-link
        v-if="$store.state.username"
        :to="{ path: `/user/${$store.state.username}` }"
        :class="{ 'menu\-item': true, bold: $route.path == `/user/${$store.state.username}` }"
        >Your Profile</router-link
      >
      <router-link v-if="$store.state.username" to="/account" :class="{ 'menu\-item': true, bold: $route.path == '/account' }"
        >Account Settings</router-link
      >
      <router-link v-else to="/login" :class="{ 'menu\-item': true, bold: $route.path == '/login' }">Login</router-link>
    </div>

    <div class="search">
      <label for="username">User Search:</label>
      
      <div class="actions">
        <input type="text" name="username" ref="userInput" v-model="username" placeholder="Search for..." />
        <button @click="triggerSearch">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  data() {
    return {username: ''}
  },
  methods: {
    isValidUsername() {
      const usernameRegex = /^\w+$/i;
      if (!usernameRegex.test(this.username)) {
        return false;
      }

      return true;
    },
    triggerSearch() {
      if (this.isValidUsername()) {
        this.$router.push({path: `/user/${this.username}`});
        this.username = '';
      } else {
        this.$refs.userInput.focus();
        this.$store.commit("alert", {
          message: "Error: Enter a username to search",
          status: "error"
        })
      }
    }
  }
}
</script>


<style scoped>
.nav-bar, .search {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  border-radius: 2px;
}

.menu-item {
  text-decoration: none;
  color: #007991;
  font-size: 1.5em;
}

.bold {
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 0.5em
}

.search {
  align-items: center;
  border: 1px solid #111;
  background-color: #BCD8C1;
  margin: 0.5em 0em;
}
</style>