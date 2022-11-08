<!-- Form for signing in (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "LoginForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/users/session",
      method: "POST",
      hasBody: true,
      setUsername: true,
      fields: [
        { id: "username", label: "Username", value: "" },
        { id: "password", label: "Password", value: "" },
      ],
      title: "Sign in",
      callback: () => {
        this.$router.push({ name: "Home" });
        this.$store.commit("alert", {
          message: "You are now signed in!",
          status: "success",
        });
      },
    };
  },
  computed: {
    canSubmit() {
      const usernameRegex = /^\w+$/i;
      if (!usernameRegex.test(this.fields[0].value)) {
        return {
          status: "error",
          message: "Error: Username must be a nonempty alphanumeric string.",
          focus: () => {
            this.$refs.username[0].focus();
          },
        };
      }

      const passwordRegex = /^\S+$/;
      if (!passwordRegex.test(this.fields[1].value)) {
        return {
          status: "error",
          message: "Error: Password must be a nonempty string.",
          focus: () => {
            this.$refs.password[0].focus();
          },
        };
      }

      return { status: "success" };
    },
  },
};
</script>
