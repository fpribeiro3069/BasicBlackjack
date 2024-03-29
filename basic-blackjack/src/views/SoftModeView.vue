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
                    <h2 
                        @click="isBlurred = !isBlurred" 
                        :class="isBlurred ? 'blur' : ''"
                        title="Click to hide">
                        Your points: {{ getCardPoints() }}
                    </h2>
                </div>
                <div class="player-cards">
                    <playing-card :rank="playerCards[0].rank" :suit="playerCards[0].suit"/>
                    <playing-card :rank="playerCards[1].rank" :suit="playerCards[1].suit" />
                </div>
            </div>
            <div class="grid-item-3">
                <div class="charts-container">
                    <bb-button label="View Charts" @click="chartVisibility = true"></bb-button>
                    <p>Correct answers: {{ localTotalCorrectCount }}/{{ localTotalCount }}</p>
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

import { generateRandomCard, generateRandomSoftHand, checkDecision, isSplitAllowed } from '@/Game';
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

        let localTotalCount = 0;
        let localTotalCorrectCount = 0;


        let modalVisibility = false;
        let chartVisibility = false;
        let answerCorrect = false;
        let answer = "";
        let isBlurred = false;


        return { 
            store, dealerCard, playerCards, modalVisibility, chartVisibility, 
            answerCorrect, answer, localTotalCorrectCount, localTotalCount,
            isBlurred
        }    
    },
    methods: {
        evaluate(decision) {
            const veredict = checkDecision(this.playerCards, this.dealerCard, decision);

            this.answerCorrect = veredict[0];
            this.answer = veredict[1];

            if (!veredict[0]) {
                this.modalVisibility = true;
            }

            if (veredict[0]) {
                this.store.commit('incrementTotalCorrectCount');
                this.localTotalCorrectCount++;
            }
            this.store.commit('incrementTotalCount');
            this.localTotalCount++;

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
    },
    computed: {
        splitDisabled() {
            return !isSplitAllowed(this.playerCards);
        }
    }
}
</script>

<style lang="scss" scoped>
.soft-mode-view {
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

    & p {
        text-align: center;
        font-size: 1.03em;
        font-weight: bold;
    }
}

@media only screen and (max-width: 750px) {

    .soft-mode-view {
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