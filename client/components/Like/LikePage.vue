<!-- Default page that also displays freets user has liked-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login"> Sign in </router-link>
          to view your liked freets.
        </h3>
      </article>
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2>Viewing liked freets</h2>
        </div>
      </header>
      <section v-if="$store.state.likedFreets.length">
        <FreetComponent
          v-for="freet in $store.state.likedFreets"
          :key="freet._id"
          :freet="freet"
        />
      </section>
      <article v-else>
        <h3>
          No liked freets found. Go to
          <router-link to="/"> Home </router-link>
          to start liking freets.
        </h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";

export default {
  name: "LikePage",
  components: { FreetComponent },
  mounted() {
    if (this.$store.state.username) {
      this.$store.dispatch("refreshLikedFreets");
    }
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header,
header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
