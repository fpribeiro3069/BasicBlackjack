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
        <h1 class="modal__title">Basic Strategy Charts</h1>
        <div class="modal__content">
            <p>Column values represent the <b>dealer card</b> and 
            Row values represent the <b>sum of the points</b> of your cards.</p>
            <ul style="color: white">
              <li><b>H</b> => Hit</li>
              <li style="color: red;"><b>S</b> => Stand</li>
              <li style="color: #81d41a;"><b>D</b> => Double Down</li>
            </ul>
            <img src="../assets/charts/hard-hands.png" alt="Hard hands chart"/>
            <img src="../assets/charts/soft-hands.png" alt="Soft hands chart"/>
            <img src="../assets/charts/split.png" alt="Split decisison chart"/>
        </div>
    </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

export default {
    name: 'chart-modal',
    emits: [
        'close'
    ],
    components: {
        VueFinalModal,
        BootstrapIcon,
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

ul {
  color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>