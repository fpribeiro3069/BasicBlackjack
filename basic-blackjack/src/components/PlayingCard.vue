<template>
    <div class="card">
        <img class="size unselectable"
            :src="getSvgPath" 
            :alt="getCardText" 
            :title="getCardText" />
    </div>
</template>

<script>

export default {
    name: 'playing-card',
    props: {
        rank: {
            type: String,
            required: false,
            default: 'Ace'
        },
        suit: {
            type: String,
            required: false,
            default: 'Spades',
        },
        flipped: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        getSvgPath() {

            if (this.flipped) {
                return require('@/assets/cards/Back.svg');
            }

            const specialRanks = {'Ace': 'Ace', 'Queen': 'Queen', 'King': 'King', 'Jack': 'Jack'};

            let currentRank;    
            if (this.rank in specialRanks) {
                currentRank = this.rank.charAt(0);
            } else if (this.rank === '10') {
                currentRank = 'T';
            } else {
                currentRank = this.rank;
            }

            return require('@/assets/cards/' + currentRank + this.suit.charAt(0) + ".svg");
        },
        getCardText() {
            if (this.flipped) {
                return "Flipped card";
            }
            return this.rank + " of " + this.suit;
        }
    }
}
</script>

<style lang="scss" scoped>

.card > img {
    //height: 30vh;
    //max-height: 20rem;

    box-shadow: $button-shadow;
}
.card {
    margin: .5rem;
}

.size {
    height: 190px;
}

@media only screen and (max-width: 750px) {
    .size {
        height: 150px;
    }
}
</style>