<!-- Component representing username and route to user page -->

<template>
  <h3 class="username"><router-link :to="{path: `/user/${username}`}">@{{ username }}</router-link></h3>
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