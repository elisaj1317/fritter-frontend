<!-- Component representing username and route to user page -->

<template>
  <h3><router-link :to="{path: `/user/${username}`}" class="username">@{{ username }}</router-link></h3>
</template>

<script>
export default {
  name: "UsernameComponent",
  props: {
    username: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

.username {
  text-decoration: none;
  color: #007991
}

</style>