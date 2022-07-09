<template>
    <div class="split-mode-view">
        <div class="grid-container">
            <div class="grid-item-1">
                <p>Mode: Only hands doubles are shown to practice decision making for splitting.</p>
            </div>
            <div class="grid-item-2">
                <div class="dealer-cards">
                    <playing-card rank="Ace" suit="Diamonds" flipped/>
                    <playing-card rank="Jack" suit="Hearts" />
                </div>
                <div class="player-cards">
                    <playing-card rank="Ace" suit="Hearts"/>
                    <playing-card rank="3" suit="Hearts" />
                </div>
            </div>
            <div class="grid-item-3">
                <div class="charts-container">
                    <bb-button label="View Charts"></bb-button>
                </div>
            </div>
        </div>
        <div class="buttons">
            <bb-button label="Hit"></bb-button>
            <bb-button label="Stand"></bb-button>
            <bb-button label="Double"></bb-button>
            <bb-button label="Split" :disabled="true"></bb-button>
        </div>
    </div>
</template>

<script>
import PlayingCard from '@/components/PlayingCard.vue'
import BbButton from '@/components/BbButton.vue'

export default {
    name: 'split-mode-view',
    components: {
        PlayingCard,
        BbButton,
    },
}
</script>

<style lang="scss" scoped>
.split-mode-view {
    max-width: 1080px; 
	margin: 0 auto !important; 
	float: none !important;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.grid-container {
    display: grid;
    grid-template-rows: 1;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;

    margin-top: 2rem;
}

.dealer-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.player-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-top: 4rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    width: 80%;
}

.charts-container {
    width: 50%;
    float: right;

}
</style>