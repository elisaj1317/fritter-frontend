<!-- Form for changing username (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "ChangeUsernameForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/users",
      method: "PATCH",
      hasBody: true,
      setUsername: true,
      fields: [{ id: "username", label: "Username", value: "" }],
      title: "Change username",
      callback: () => {
        const message = "Successfully changed username!";
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

      return { status: "success" };
    },
  },
};
</script>
