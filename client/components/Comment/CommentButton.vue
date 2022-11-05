<!-- Component for commenting on freets -->
<template>
    <span>
        <button type="submit" @click="redirectToComments">
            Comment
        </button>
    </span>
</template>

<script>
export default {
    name: 'CommentButton',
    props: {
        freetId: {
            type: String,
            required: true
        },
        shouldRefreshFreets: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {alerts: {}};
    },
    methods: {
        redirectToComments() {
            this.$router.push(`/freet/${this.freetId}`);
        }
    }
}
</script>
