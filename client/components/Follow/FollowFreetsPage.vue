<!-- Page for displaying freets from the current user's follows (Freet List style) -->

<script>
import FreetList from "@/components/common/FreetList.vue";

export default {
  name: "FollowFreetsPage",
  mixins: [FreetList],
  data() {
    return {
      title: "Following Page",
      loading: true,
      alerts: {},
      localFreets: []
    };
  },
  computed: {
    freets() {
      return this.localFreets;
    }
  },
  created() {
    if (this.$store.state.username) {
      this.fetchFollowFreets();
    }
  },
  methods: {
    async fetchFollowFreets() {
      const url = '/api/follows/freet';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.localFreets = res;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>