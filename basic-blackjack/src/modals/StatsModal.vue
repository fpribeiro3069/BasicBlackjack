<template>
    <vue-final-modal classes="modal__container" content-class="modal__content">
        <button @click="$emit('close')">
            <BootstrapIcon
                class="modal__close"
                icon="x"
                color="white"
                size="4x"
            />
        </button>
        <h1 class="modal__title">Statistics</h1>
        <div class="modal__content">
            <div class="entry">
                <p>Total hands</p>
                <p>{{ totalCount }}</p>
            </div>
            <div class="entry">
                <p>Total correct hands</p>
                <p>{{ totalCorrectCount }}</p>
            </div>
            <div class="entry">
                <p>Percentage</p>
                <p :class="getPercentageColor">{{getPercentage}}%</p>
            </div>
        </div>
        <div class="modal__action">
            <bb-button label="Delete all data" @click="confirmDelete"/>
        </div>
    </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import BbButton from '@/components/BbButton.vue';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

export default {
    name: 'stats-modal',
    components: {
        VueFinalModal,
        BbButton,
        BootstrapIcon,
    },
    emits: [
        'close',
        'delete'
    ],
    props: {
        totalCount: {
            type: Number,
        },
        totalCorrectCount: {
            type: Number,
        }
    },
    methods: {
        confirmDelete() {
            let answer = confirm("Are you sure you want to delete your whole history?");
            if (answer) {
                this.$emit('delete');
                this.$emit('close');
            }
        }
    },
    computed: {
        getPercentage() {
            if (!isNaN(this.totalCorrectCount / this.totalCount * 100)) {
                return (this.totalCorrectCount / this.totalCount * 100).toFixed(1);
            } else {
                return 0;
            }
        },
        getPercentageColor() {
            if (!isNaN(this.totalCorrectCount / this.totalCount * 100)) {
                const percentage = (this.totalCorrectCount / this.totalCount * 100).toFixed(1);

                if (percentage >= 95) {
                    return 'green-class';
                } else if (percentage >= 50) {
                    return 'yellow-class';
                } else {
                    return 'red-class';
                }
            } else {
                return '';
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
::v-deep .modal__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: $dark-green;

  min-width: 40vh;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal__title {
  text-align: center;
}

.modal__content > img {
    margin: .5rem;
    border-radius: 5px;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.entry {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.green-class {
    color: rgb(14, 226, 14);
    font-weight: 700;
}

.yellow-class {
    color: yellow;
    font-weight: 700;
}

.red-class {
    color: red;
    font-weight: 700;
}
</style>