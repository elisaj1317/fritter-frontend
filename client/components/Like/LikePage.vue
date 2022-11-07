<!-- Page for displaying current user's liked freets (Freet List style) -->

<script>
import FreetList from "@/components/common/FreetList.vue";

export default {
  name: "LikePage",
  mixins: [FreetList],
  data() {
    return {
      title: "Liked Freets",
      loading: true,
      alerts: {},
    };
  },
  computed: {
    freets() {
      return this.$store.state.likedFreets;
    }
  },
  created() {
    if (this.$store.state.username) {
      this.$store.dispatch("refreshLikedFreets").then((this.loading = false));
    }
  },
};
</script>