<template>
    <vue-final-modal classes="modal-container" content-class="modal-content">
        <button @click="$emit('close')">
            <BootstrapIcon
                class="modal__close"
                icon="x"
                color="white"
                size="2x"
            />
        </button>
        <div class="answer-modal">
            <h1 class="modal__title">About</h1>
            <p >Thank you for using this application. This app was developed by Francisco Ribeiro. 2022</p>
        </div>
    </vue-final-modal>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import { VueFinalModal } from 'vue-final-modal';

export default {
    name: 'about-modal',
    components: {
        VueFinalModal,
        BootstrapIcon
    },
    emits: [
        'close',
    ]
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

    max-width: 95%;
}

.answer-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>