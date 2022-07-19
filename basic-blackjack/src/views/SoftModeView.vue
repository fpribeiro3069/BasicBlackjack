<template>
    <div class="soft-mode-view">

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
                <p>Mode: Only hands with Aces are shown to practice the decision making with soft hands.</p>
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
            <bb-button label="Split" @click="evaluate('Split')"></bb-button>
        </div>
    </div>
</template>

<script>
import PlayingCard from '@/components/PlayingCard.vue';
import BbButton from '@/components/BbButton.vue';
import AnswerModal from '@/modals/AnswerModal.vue';
import ChartModal from '@/modals/ChartModal.vue';

import { generateRandomCard, generateRandomSoftHand, checkPlayerBlackjack, checkDecision } from '@/Game';
import { useStore } from 'vuex';

export default {
    name: 'soft-mode-view',
    components: {
        PlayingCard,
        BbButton,
        AnswerModal,
        ChartModal,
    },
    data() {
        let dealerCard = generateRandomCard();
        let playerCards = generateRandomSoftHand();

        const store = useStore();

        let modalVisibility = false;
        let chartVisibility = false;
        let answerCorrect = false;
        let answer = "";

        return { store, dealerCard, playerCards, modalVisibility, chartVisibility, answerCorrect, answer  }
    },
    watch: {
        playerCards(hand) {
            if (checkPlayerBlackjack(hand)) {
                this.playerCards = generateRandomSoftHand();
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
                this.store.commit('incrementTotalCorrectCount');
            }
            this.store.commit('incrementTotalCount');

            // TODO: Change this generation for after the modal closes
            this.dealerCard = generateRandomCard();
            this.playerCards = generateRandomSoftHand();
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
    }
}
</script>

<style lang="scss" scoped>
.soft-mode-view {
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
    width: 50%;
    float: right;

}
</style>