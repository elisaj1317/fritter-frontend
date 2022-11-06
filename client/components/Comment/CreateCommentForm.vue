<!-- Form for creating comment -->

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="content">Content:</label>
      <textarea name="content" v-model="content" />
    </div>

    <div>
      <label for="category">Category:</label>
      <div class="category-buttons">
        <span
          v-for="(value, key, index) in categories"
          :key="key"
          class="reaction"
          :class="{ active: index === chosenCategory }"
        >
          <img :src="value" :alt="key" @click="chosenCategory = index" />
        </span>
        </div>
    </div>

    <button type="submit">Create Comment</button>

    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: "CreateCommentForm",
  props: {
    freetId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: "",
      alerts: {},
      categories: {
        happy: "https://www.svgrepo.com/show/209064/happy-emoji.svg",
        love: "https://www.svgrepo.com/show/209105/in-love-emoji.svg",
        sad: "https://www.svgrepo.com/show/209093/crying-emoji.svg",
        angry: "https://www.svgrepo.com/show/209074/angry-emoji.svg",
        suspicious: "https://www.svgrepo.com/show/209095/suspicious-emoji.svg",
      },
      chosenCategory: null,
    };
  },
  methods: {
    async submit() {
      /**
       * Creates the comment with specified values
       */
      const url = `/api/comments/${this.freetId}`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          content: this.content,
          category: "" + this.chosenCategory,
        }),
      };

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$emit("refreshComments");

        this.content = "";
        this.chosenCategory = null;

        const message = "Successfully created comment!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
form {
  border: 1px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

div {
  display: flex;
  flex-direction: column;
}

textarea {
  font-family: inherit;
  font-size: inherit;
}

form > * {
  margin: 0.3em 0;
}

.category-buttons {
  display: flex;
  flex-direction: row;
  gap: 2em;
  margin-top: 0.3em;
}

.reaction {
  user-select: none;
  display: flex;
  padding: 0.3em;
  border-radius: 50%;
  cursor: pointer;
}

.reaction:hover:not(.active) {
  background-color: #74c0fc;
}
.active {
  background-color: #228be6;
}
</style>