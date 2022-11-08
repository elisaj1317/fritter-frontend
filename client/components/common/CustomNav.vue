<template>
  <nav class="nav-bar">
    <div class="logo">
      <img src="../../public/logo.svg" />
      <h1 class="title">Fritter</h1>
    </div>

    <div class="standard-link" v-for="entry in standard" :key="entry.name">
      <router-link v-if="entry.show" :to="{ path: `${entry.url}` }" class="menu-item">{{
        entry.name
      }}</router-link>
    </div>

    <draggable v-if="menu" :list="menu.entries" handle=".handle" class="menu-items" @end="updateLocations">
      <span v-for="item in menu.entries" :key="item.name">
        <i class="handle">icon</i>
        <router-link :to="{ path: `${item.url}` }" class="menu-item">{{
          item.name
        }}</router-link>
      </span>
    </draggable>
    
    <div v-if="!isInStandard" class="adding-controls">
      <button v-if="!addingTitle" @click="handleAddRemoveClick">{{ buttonText }}</button> <!-- Add/Remove from menu button -->
      <div class="add-title" v-else>
        <input v-model="title" type="text" name="title">
        <div class="title-controls">
          <button @click="addRemoveFromMenu">Save</button> <button @click="addingTitle=false">Cancel</button>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "CustomNav",
  components: {
    draggable,
  },
  data() {
    return {
      menu: null,
      addingTitle: false,
      title: '',
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
    standard() {
      /**
       * Returns standard fixed menu items
       */
      return [
        {
          name: "Home",
          url: "/",
          show: true,
        },
        {
          name: "Liked",
          url: "/liked",
          show: this.$store.state.username !== null,
        },
        {
          name: "Following",
          url: "/following",
          show: this.$store.state.username !== null,
        },
      ];
    },
    isInStandard() {
      /**
       * Returns true if current path in standard paths, false otherwise
       */
      for (const [index, item] of this.standard.entries()) {
        if (item.url == this.$route.path) {
          return true;
        }
      }

      return false;

    },
    pathPosition() {
      /**
       * Returns position of current path in this.menu, if exists or -1 if not in this.menu
       */
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
    handleAddRemoveClick() {
      if (this.pathPosition == -1) {
        this.addingTitle = true;
      } else {
        this.addRemoveFromMenu()
      }
    },
    async updateLocations(moved) {
      if (moved.oldIndex == moved.newIndex) {
        return;
      }

      const url = '/api/menus';
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin", // Sends express-session credentials with request
        body: JSON.stringify({
          previousLocation: '' + moved.oldIndex,
          newLocation: '' + moved.newIndex
        })
      };

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

      } catch (e) {
        this.$store.commit("alert", {
          message: e,
          status: "error",
        });
      }
    },
    async addRemoveFromMenu() {
      this.addingTitle = false;

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
          name: this.title,
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
            message: "Successfully removed page from menu!",
            status: "success",
          });
        } else {
          this.$store.commit("alert", {
            message: "Successfully added page to menu!",
            status: "success",
          });
        }

        this.title = "";
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

<style scoped>
.nav-bar {
  padding: 1em;
  border-radius: 2px;
}

.logo {
  display: flex;
}

.title {
  font-size: 2em;
  margin: 0 5px;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-item {
  text-decoration: none;
  color: black;
  font-size: 1.5em;
}

img {
  height: 32px;
}
</style>