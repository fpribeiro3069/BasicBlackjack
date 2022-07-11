<template>
    <vue-final-modal classes="modal-container" content-class="modal-content">
        <div class="answer-modal">
            <h1 class="modal__title">{{ isCorrect ? 'Correct!' : 'Wrong!'}}</h1>
            <p v-if="!isCorrect">Correct answer would be <b>{{getRightAnswer}}</b>.</p>
            <div class="modal__action">
                <bb-button label="Next" @click="$emit('close')"/>
            </div>
        </div>
    </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import BbButton from '@/components/BbButton.vue';

export default {
    name: 'answer-modal',
    components: {
        VueFinalModal,
        BbButton,
    },
    emits: [
        'close',
    ],
    props: {
        isCorrect: {
            type: Boolean,
            required: true,
        },
        correctAnswer: {
            type: String,
            required: false,
            default: "",
        }
    },
    computed: {
        getRightAnswer() {
            if (this.correctAnswer) {
                switch(this.correctAnswer) {
                    case 'Hit':
                        return 'hitting';
                    case 'Stand':
                        return 'standing';
                    case 'Double':
                        return 'to double down';
                    case 'Split':
                        return 'splitting';
                }
            }
            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
    position: relative;

    padding: 2rem 3rem 2rem 3rem; 
    border-radius: 0.25rem;
    background: $dark-green;

    min-height: 10rem;
    min-width: 20rem;
}

.answer-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal__action {
    position: absolute;
    bottom: 1rem;
    left: auto;
    right: auto;
    padding: 1rem 0 0;
}

</style>