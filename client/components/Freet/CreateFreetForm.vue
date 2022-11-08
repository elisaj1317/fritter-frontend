<!-- Form for creating freets (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "CreateFreetForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/freets",
      method: "POST",
      hasBody: true,
      fields: [{ id: "content", label: "Content", value: "", placeholder: "How are you today?" }],
      title: "Create a freet",
      refreshFreets: true,
      callback: () => {
        const message = "Successfully created a freet!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      },
    };
  },
  computed: {
    canSubmit() {
      const content = this.fields[0].value;
      // Error 400
      if (!content.trim()) {
        return {
          message: "Error: Freet content must be at least one character long",
          status: "error",
          focus: () => {
            this.$refs.content[0].focus();
          },
        };
      }

      // Error 413
      if (content.length > 140) {
        return {
          message: "Error: Freet content must be no more than 140 characters.",
          status: "error",
          focus: () => {
            this.$refs.content[0].focus();
          },
        };
      }

      // No client side issues detected
      return {
        status: "success",
      };
    },
  },
};
</script>
