<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>

    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">Sign in</router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>

    <section>
      <header>
        <h2>Viewing all freets</h2>
      </header>

      <section v-if="$store.state.freets.length">
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet._id"
          :freet="freet"
        />
      </section>

      <article v-else>
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CreateFreetForm from "@/components/Freet/CreateFreetForm.vue";

export default {
  name: "FreetPage",
  components: { FreetComponent, CreateFreetForm },
  mounted() {
    this.$store.dispatch("refreshFreets");
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
