<!-- Component for liking freets/comments (inline style) -->
<template>
    <div>
        <button type="submit" @click="submit">
            {{ buttonText }}
        </button>
        <article
            v-for="(status, alert, index) in alerts"
            :key="index"
            :class="status"
        >
            <p>{{ alert }}</p>
        </article>
      </div>
</template>

<script>
export default {
    name: 'LikeButton',
    props: ['isFreet', 'objectId', 'shouldRefreshFreets'],
    data() {
        return {alerts: {}};
    },
    computed: {
        canLike() {
            return !(this.$store.state.likedFreets.filter(liked => liked._id == this.objectId).length > 0);
        },
        buttonText() {
            if (this.canLike) {
                return "Like";
            } 
            return "Unlike"
        }
    },
    methods: {
        async submit() {
            const url = this.isFreet ? `/api/likes/freet/${this.objectId}` : `/api/likes/comment/${this.objectId}`;
            let msg = '';
            const options = {};
            if (this.canLike) {
                options.method = 'PUT';
                msg = 'Successfully liked!'
            } else {
                options.method = 'DELETE';
                msg = 'Successfully unliked!'
            }
            
            try {
                const r = await fetch(url, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }

                this.$store.commit('refreshLikes');

                if (this.shouldRefreshFreets) {
                    this.$store.commit('refreshFreets');
                }

            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }

        }
    }
}
</script>
