<template>
  <div id="app">
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>

    <div class="contents">
      <CustomNav class="side" />
      <router-view class="center" />
      <AccountInfo class="side" />
    </div>
  </div>
</template>

<script>
import CustomNav from "@/components/common/CustomNav.vue";
import AccountInfo from "@/components/common/AccountInfo.vue";

export default {
  name: "App",
  components: { CustomNav, AccountInfo },
  beforeCreate() {
    // Sync stored username to current session
    fetch("/api/users/session", {
      credentials: "same-origin", // Sends express-session credentials with request
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res.user;
        this.$store.commit("setUsername", user ? user.username : null);
      });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 80vw;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0 auto;
  background-color: whitesmoke;
}

.contents {
  display: flex;
}

.side {
  flex: 1;
  position: sticky;
  top: 0;
  height: max-content;
}

.center {
  flex: 2;
}

main {
  padding: 0 5em 5em;
  word-break: break-all
}

button {
  cursor: pointer;
  font: inherit;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

input {
  font-family: inherit;
}

.alerts {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}
</style>
