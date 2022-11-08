<template>
  <div class="nav-bar">
    <router-link
      v-if="$store.state.username"
      :to="{ path: `/user/${$store.state.username}` }"
      class="menu-item"
      >Your Profile</router-link
    >
    <router-link v-if="$store.state.username" to="/account" class="menu-item"
      >Account Settings</router-link
    >
    <router-link v-else to="/login" class="menu-item">Login</router-link>
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

.logo {
  display: flex;
}

h1 {
  font-size: 32px;
  margin: 0 5px;
}

.menu-item {
  text-decoration: none;
  color: #007991;
  font-size: 1.5em;
}

img {
  height: 32px;
}
</style>