<template>
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
</template>


<style scoped>
.nav-bar {
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
</style>