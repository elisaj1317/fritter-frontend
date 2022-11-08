<!-- Form for creating comment -->

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="content">Content:</label>
      <textarea name="content" v-model="content" placeholder="Leave a reply!"/>
    </div>

    <div>
      <label for="category">Category:</label>
      <div class="category-buttons">
        <CategoryIcon 
          v-for="(value, key) in categories"
          :key="key"
          :src="value.src"
          :alt="key"
          :isSelectable="true"
          :isActive="key === chosenCategory"
          @click="chosenCategory=key"
        />
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
import CategoryIcon from "@/components/Comment/CategoryIcon.vue";

export default {
  name: "CreateCommentForm",
  components: {CategoryIcon},
  props: {
    freetId: {
      type: String,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      content: "",
      alerts: {},
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
          category: "" + this.categories[this.chosenCategory].index,
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

form {
  border: 1px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  background-color: #BCD8C1;
  border-radius: 5px;
}

div {
  display: flex;
  flex-direction: column;
}

form > * {
  margin: 0.3em 0;
}

.category-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.3em;
}

</style>