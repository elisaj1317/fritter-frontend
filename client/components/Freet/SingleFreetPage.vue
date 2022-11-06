<!-- Displays a freet and its comments -->

<template>
  <main>
    <section v-if="freet">
      <header>
        <h2>Freet</h2>
      </header>
      <FreetComponent
      :key="freet._id"
      :freet="freet"
      :hideCommentButton="true"
      />
    </section>

    <section v-if="$store.state.username && freet">
      <header>
        <h2>Write a Comment:</h2>
      </header>
      <CreateCommentForm 
        :freetId="freet._id"
        @refreshComments="fetchCommentData"
        />
    </section>

    <section v-if="comments.length">
      <header>
        <h2>Viewing all Comments</h2>
      </header>
      <CommentComponent
        v-for="comment in comments"
        v-on:refreshComments="fetchCommentData"
        :key="comment._id"
        :comment="comment"
      />
    </section>
    <section v-else>
      <p> No comments found </p>
    </section>
    
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import CommentComponent from '@/components/Comment/CommentComponent.vue';
import CreateCommentForm from '@/components/Comment/CreateCommentForm.vue';

export default {
  name: 'SingleFreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, CommentComponent, CreateCommentForm},
  data() {
    return {
      loadingFreets: false,
      loadingComments: false,
      freet: null,
      comments: [],
      alerts: {},
    }
  },
  created() {
    this.$store.dispatch('refreshLikedComments');

    this.$watch(
      () => this.$route.params,
      () => {
        this.freet = null;
        this.comments = [];
        this.fetchFreetData(),
        this.fetchCommentData()
      },
      { immediate: true}
    )
  },
  methods: {
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
        this.$set(this.alerts, e, 'error');
        this.loadingFreets = false;
        setTimeout(() => this.$delete(this.alerts, e), 3000);
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
        this.$set(this.alerts, e, 'error');
        this.loadingComments = false;
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
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
