<!-- Page for displaying followings (User List style) -->

<script>
import UserList from "@/components/common/UserList.vue";

export default {
  name: "UserFollowers",
  mixins: [UserList],
  data() {
    return {
      title: "Followers",
      users: [],
      loading: true,
      alerts: {},
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.users = [];
        this.fetchFollowers();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchFollowers() {
      this.loading = true;

      const url = `api/follows?followed=${this.$route.params.user}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.users = res.map((follow) => follow.followee);
        this.loading = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        this.loading = false;
      }
    },
  },
};
</script>