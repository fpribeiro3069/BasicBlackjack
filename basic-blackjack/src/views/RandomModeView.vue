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
                <div class="card-count">
                    <h2>Your points: {{ getCardPoints() }}</h2>
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
            <bb-button label="Split" :disabled="splitDisabled" @click="evaluate('Split')"></bb-button>
        </div>
    </div>
</template>

<script>
import PlayingCard from '@/components/PlayingCard.vue';
import BbButton from '@/components/BbButton.vue';
import AnswerModal from '@/modals/AnswerModal.vue';
import ChartModal from '@/modals/ChartModal.vue';

import { useStore } from 'vuex';

import { generateRandomCard, generateRandomHand, checkDecision, isSplitAllowed } from '@/Game';

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

        const store = useStore();

        let modalVisibility = false;
        let chartVisibility = false;
        let answerCorrect = false;
        let answer = "";

        return { store, dealerCard, playerCards, modalVisibility, chartVisibility, answerCorrect, answer }
    },
    methods: {
        evaluate(decision) {
            const veredict = checkDecision(this.playerCards, this.dealerCard, decision);

            this.modalVisibility = true;
            this.answerCorrect = veredict[0];
            this.answer = veredict[1];

            if (veredict[0]) {
                this.store.commit('incrementTotalCorrectCount');
            }
            this.store.commit('incrementTotalCount');

            // TODO: Change this generation for after the modal closes
            this.dealerCard = generateRandomCard();
            this.playerCards = generateRandomHand();
        },
        getCardPoints() {
            let sum = 0;
            let secondSum = 0;

            for(let i = 0; i < this.playerCards.length; i++) {
                let scoreArr = this.playerCards[i].valueArray();
                if (scoreArr.length === 1) {
                    sum += scoreArr[0];
                    secondSum += scoreArr[0];
                } else {
                    sum += scoreArr[0];
                    secondSum += scoreArr[1];
                }
            }

            if (sum !== secondSum) {
                return sum + ' or ' + secondSum;
            }
            return sum;
        }
    },
    computed: {
        splitDisabled() {
            return !isSplitAllowed(this.playerCards);
        }
    }
}
</script>

<style lang="scss" scoped>
.random-mode {
    max-width: 750px; 
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

.card-count {
    display: flex;
    justify-content: center;

    margin-top: 1.5rem;
}

.player-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.buttons {
    display: flex;
    flex-direction: row;
    width: 80%;
}

.charts-container {
    width: 60%;
    float: right;

}

@media only screen and (max-width: 750px) {

    .random-mode {
        max-width: 740px; 
        margin: 0 auto !important; 
        float: none !important;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .grid-container {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin: 1rem;
    }

    .grid-item-1 {
        order: 1;
    }

    .grid-item-2 {
        order: 3;
    }

    .grid-item-3 {
        display: flex;
        justify-content: center;
        order: 1;
    }

    .charts-container {
        width: 10rem;
    }
}
</style>