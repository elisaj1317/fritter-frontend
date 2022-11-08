<!-- Form for registering an account (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "RegisterForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/users",
      method: "POST",
      hasBody: true,
      setUsername: true,
      fields: [
        { id: "username", label: "Username", value: "" },
        { id: "password", label: "Password", value: "" },
      ],
      title: "Create account",
      callback: () => {
        const message = "Successfully created an account!";
        this.$router.push({ name: "Home" });
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
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
