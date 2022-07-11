<template>
    <div class="random-mode">

        <chart-modal 
            v-model="chartVisibility"
            @close="chartVisibility = false"
        />

        <answer-modal 
            v-model="modalVisibility"
            :isCorrect="answerCorrect" 
            :correctAnswer="answer"
            @close="modalVisibility = false"
        />

        <div class="grid-container">
            <div class="grid-item-1">
                <p name="Mode description">Mode: Random cards from the deck. Choose according to basic strategy.</p>
            </div>
            <div class="grid-item-2">
                <div class="dealer-cards">
                    <playing-card flipped/>
                    <playing-card :rank="dealerCard.rank" :suit="dealerCard.suit" />
                </div>
                <div class="player-cards">
                    <playing-card :rank="playerCards[0].rank" :suit="playerCards[0].suit"/>
                    <playing-card :rank="playerCards[1].rank" :suit="playerCards[1].suit" />
                </div>
            </div>
            <div class="grid-item-3">
                <div class="charts-container">
                    <bb-button label="View Charts" @click="chartVisibility = true"></bb-button>
                </div>
            </div>
        </div>
        <div class="buttons">
            <bb-button label="Hit" @click="evaluate('Hit')"></bb-button>
            <bb-button label="Stand" @click="evaluate('Stand')"></bb-button>
            <bb-button label="Double" @click="evaluate('Double')"></bb-button>
            <bb-button label="Split" @click="evaluate('Split')"></bb-button>
        </div>
    </div>
</template>

<script>
import PlayingCard from '@/components/PlayingCard.vue';
import BbButton from '@/components/BbButton.vue';
import AnswerModal from '@/modals/AnswerModal.vue';
import ChartModal from '@/modals/ChartModal.vue';

import { generateRandomCard, generateRandomHand, checkDecision, checkPlayerBlackjack } from '@/Game';

export default {
    name: 'random-mode',
    components: {
        PlayingCard,
        BbButton,
        AnswerModal,
        ChartModal,
    },
    data() {
        let dealerCard = generateRandomCard();
        let playerCards = generateRandomHand();

        let modalVisibility = false;
        let chartVisibility = false;
        let answerCorrect = false;
        let answer = "";

        let totalCount = 0;
        let totalCorrectCount = 0;

        return { dealerCard, playerCards, modalVisibility, chartVisibility, answerCorrect, answer, totalCount, totalCorrectCount }
    },
    watch: {
        playerCards(hand) {
            if (checkPlayerBlackjack(hand)) {
                this.playerCards = generateRandomHand();
            }
        }
    },
    methods: {
        evaluate(decision) {
            const veredict = checkDecision(this.playerCards, this.dealerCard, decision);

            this.modalVisibility = true;
            this.answerCorrect = veredict[0];
            this.answer = veredict[1];

            if (veredict[0]) {
                this.totalCorrectCount += 1;
            }
            this.totalCount += 1;

            

            // TODO: Change this generation for after the modal closes
            this.dealerCard = generateRandomCard();
            this.playerCards = generateRandomHand();
        }
    },
    unmounted() {
        const persistedTotalCount = parseInt(localStorage.getItem('totalCount'));

        if (persistedTotalCount) {
            localStorage.setItem('totalCount', persistedTotalCount + this.totalCount);
        } else {
            localStorage.setItem('totalCount', this.totalCount);
        }

        const persistedTotalCorrectCount = parseInt(localStorage.getItem('totalCorrectCount'));

        if (persistedTotalCorrectCount) {
            localStorage.setItem('totalCorrectCount', persistedTotalCorrectCount + this.totalCorrectCount);
        } else {
            localStorage.setItem('totalCorrectCount', this.totalCorrectCount);
        }
    }
}
</script>

<style lang="scss" scoped>
.random-mode {
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