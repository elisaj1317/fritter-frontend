<!-- Displays a freet and its comments -->

<template>
  <main>
    <div v-if="freet">
      <section>
        <header>
          <h2>Freet</h2>
        </header>
        <FreetComponent
          :key="freet._id"
          :freet="freet"
          :hideCommentButton="true"
        />
      </section>

      <section v-if="$store.state.username">
        <header>
          <h2>Write a Comment:</h2>
        </header>
        <CreateCommentForm
          :freetId="freet._id"
          :categories="commentCategories"
          @refreshComments="fetchCommentData"
        />
      </section>

      <section v-if="comments.length">
        <header>
          <h2 v-if="!chosenCategoriesIdx.length">Viewing all Comments:</h2>
          <h2 v-else>Viewing Filtered Comments:</h2>
          <CommentFilters :categories="commentCategories" @updatedFilter="filterComments"/>
        </header>
        <div v-for="comment in comments" :key="comment._id">
          <CommentComponent
            v-if="!chosenCategoriesIdx.length || chosenCategoriesIdx.includes(comment.category)"
            v-on:refreshComments="fetchCommentData"
            :comment="comment"
            :categories="commentCategories"
          />
        </div>
      </section>
      <section v-else>
        <p>No comments found</p>
      </section>
    </div>
    <div v-else-if="loadingFreets || loadingComments">
      <h2>Loading</h2>
    </div>
    <div v-else>
      <h2>Freet not found</h2>
    </div>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import CommentFilters from "@/components/Comment/CommentFilters.vue";

export default {
  name: "SingleFreetPage",
  components: {
    FreetComponent,
    CommentComponent,
    CreateCommentForm,
    CommentFilters,
  },
  data() {
    return {
      loadingFreets: false,
      loadingComments: false,
      freet: null,
      commentCategories: {
        happy: {src: "https://www.svgrepo.com/show/209064/happy-emoji.svg", index: 0},
        love: {src: "https://www.svgrepo.com/show/209105/in-love-emoji.svg", index: 1},
        sad: {src: "https://www.svgrepo.com/show/209093/crying-emoji.svg", index: 2},
        angry: {src: "https://www.svgrepo.com/show/209074/angry-emoji.svg", index: 3},
        suspicious: {src: "https://www.svgrepo.com/show/209095/suspicious-emoji.svg", index: 4},
      },
      comments: [],
      chosenCategoriesIdx: [],
      alerts: {},
    };
  },
  created() {
    
    this.$watch(
      () => this.$route.params,
      () => {
        this.freet = null;
        this.comments = [];
        this.fetchFreetData(), this.fetchCommentData();
      },
      { immediate: true }
    );
  },
  methods: {
    filterComments(chosenCategoriesIdx) {
      this.chosenCategoriesIdx = chosenCategoriesIdx;
    },
    async fetchFreetData() {
      this.loadingFreets = true;

      const freetUrl = `api/freets/${this.$route.params.freetId}`;
      try {
        const r = await fetch(freetUrl);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.freet = res;
        this.loadingFreets = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loadingFreets = false;
        console.log('here');
        // setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async fetchCommentData() {
      this.loadingComments = true;
      // fetch comment data
      const commentUrl = `api/comments?freetId=${this.$route.params.freetId}`;
      try {
        const r = await fetch(commentUrl);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.comments = res;
        this.loadingComments = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loadingComments = false;
        // setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
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
