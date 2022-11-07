<template>
  <div class="menu" v-if="menu">
    <router-link
      v-for="entry in menu.entries"
      :key="entry.name"
      :to="{ path: `${entry.url}` }"
      >{{ entry.name }}</router-link
    >

    <button @click="handleMenuClick">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: "CustomNav",
  data() {
    return {
      menu: null,
    };
  },
  watch: {
    "$store.state.username": function (newUsername) {
      if (newUsername) {
        this.fetchMenuData();
      } else {
        this.menu = null;
      }
    },
  },
  computed: {
    pathPosition() {
      if (this.menu == null) {
        return -1;
      }

      for (const [index, item] of this.menu.entries.entries()) {
        if (item.url == this.$route.path) {
          return index;
        }
      }

      return -1;
    },
    buttonText() {
      if (this.pathPosition == -1) {
        return "Add to Menu";
      }
      return "Remove from Menu";
    },
  },
  created() {
    if (this.$store.state.username) {
      this.fetchMenuData();
    }
  },
  methods: {
    async handleMenuClick() {
      const url = `api/menus`;

      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin", // Sends express-session credentials with request
      };

      if (this.pathPosition !== -1) {
        options.body = JSON.stringify({
          previousLocation: "" + this.pathPosition,
          newLocation: "-1",
        });
      } else {
        options.body = JSON.stringify({
          name: "placeholder",
          url: this.$route.path,
        });
      }

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.pathPosition !== -1) {
          this.$store.commit("alert", {
            message: "Successfully removed page to menu!",
            status: "success",
          });
        } else {
          this.$store.commit("alert", {
            message: "Successfully added page to menu!",
            status: "success",
          });
        }

        this.fetchMenuData();
        
      } catch (e) {
        this.$store.commit("alert", {
          message: e,
          status: "error",
        });
      }
    },
    async fetchMenuData() {
      const url = `api/menus`;

      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.menu = res;
      } catch (e) {
        this.$store.commit("alert", {
          message: e,
          status: "error",
        });
      }
    },
  },
};
</script>