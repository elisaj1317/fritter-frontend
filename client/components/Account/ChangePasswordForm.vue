<!-- Form for changing password (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "ChangePasswordForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/users",
      method: "PATCH",
      hasBody: true,
      fields: [{ id: "password", label: "Password", value: "" }],
      title: "Change password",
      callback: () => {
        const message = "Successfully changed password!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      },
    };
  },
  computed: {
    canSubmit() {
      const passwordRegex = /^\S+$/;
      if (!passwordRegex.test(this.fields[0].value)) {
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
