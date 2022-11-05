<!-- Component for liking freets/comments (inline style) -->
<template>
    <span>
        <button type="submit" @click="submit">
            {{ buttonText }}
        </button>
        <span> {{ numLikes }} </span>
    </span>
</template>

<script>
export default {
    name: 'LikeButton',
    props: {
        numLikes: { // number of likes on an object
            type: Number,
            required: true
        },
        isFreet: { // true if object being liked is a freet, false if it is comment
            type: Boolean,
            required: true
        },
        objectId: { // objectId of freet or comment
            type: String,
            required: true
        },
    },
    data() {
        return {alerts: {}};
    },
    computed: {
        canLike() {
            if (this.isFreet) {
                return !(this.$store.state.likedFreets.filter(liked => liked._id == this.objectId).length > 0);
            }
            return !(this.$store.state.likedComments.filter(liked => liked._id == this.objectId).length > 0);
        },
        buttonText() { // determines text based on canLike
            if (this.canLike) {
                return "Like";
            } 
            return "Unlike"
        }
    },
    methods: {
        async submit() {
            const url = this.isFreet ? `/api/likes/freet/${this.objectId}` : `/api/likes/comment/${this.objectId}`;
            const options = {};
            if (this.canLike) {
                options.method = 'PUT';
            } else {
                options.method = 'DELETE';
            }
            
            try {
                const r = await fetch(url, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }

                if (this.canLike) {
                    this.numLikes += 1;
                } else {
                    this.numLikes -= 1;
                }

                if (this.isFreet) {
                    this.$store.dispatch('refreshLikedFreets');
                } else {
                    this.$store.dispatch('refreshLikedComments');
                }

            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }

        }
    }
}
</script>
