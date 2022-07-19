<template>
  <div id="app-content">

    <stats-modal
      v-model="statsModal"
      :totalCount="store.state.totalCount"
      :totalCorrectCount="store.state.totalCorrectCount"
      @close="statsModal = false"
      @delete="deleteStats"
    />

    <about-modal
      v-model="aboutModal"
      @close="aboutModal = false"
    />

    <div class="nav">
      <h1 class="unselectable">Basic Blackjack</h1>
      <div class="nav-buttons">
        <router-link class="icons" to="/">
          <BootstrapIcon 
            icon="shuffle"
            color="white"
            size="2x"
          />
        </router-link>
        <router-link class="icons" to="/soft">
          <!-- <BootstrapIcon
            icon="shuffle"
            color="white"
            size="2x"
          /> -->
          <img class="icon unselectable" src="@/assets/icons/soft.svg" />
        </router-link>
        <router-link class="icons" to="/split">
          <!-- <BootstrapIcon
            icon="shuffle"
            color="white"
            size="2x"
          /> -->
          <img class="icon unselectable" src="@/assets/icons/cards.png" />
        </router-link>
        
        <div id="stats" class="icons">
          <button @click="statsModal = true">
              <BootstrapIcon
                icon="bar-chart-fill"
                color="white"
                size="2x"
              />  
          </button>
        </div>
        
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="footer">
      <button @click="aboutModal = true">About</button>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import AboutModal from './modals/AboutModal.vue';
import StatsModal from './modals/StatsModal.vue';

import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    BootstrapIcon,
    AboutModal,
    StatsModal,
  },
  data() {
    let aboutModal = false;
    let statsModal = false;

    const store = useStore();

    return { store, aboutModal, statsModal }
  },
  methods: {
    deleteStats() {
      this.store.commit('clearCounts');
    }
  },
  computed: {
    isActive() {
      return this.$router.name === "random";
    }
  },
}
</script>

<style lang="scss">

.router-link-active > svg {
  color: #e1e1e1;
  transition: all .5s;
  //border-bottom: solid 3px white;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-buttons {
  display: flex;
  align-items: center;
}

.icons {
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  margin-left: 1.5rem;
  display:inline-block
}

.icons:after {
  display:block;
  content: '';
  border-bottom: solid 3px white;  
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
}

.icons:hover:after { transform: scaleX(1); }

#stats {
  margin-left: 2.5rem;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  // Padding on the sides
  max-width: 1080px; 
	margin: 0 auto !important; 
	float: none !important;
}

// Animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer {
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;

  & > button {
    color: $white;
    text-decoration: underline;
  }
}

.icon {
  width: 2rem;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(268deg) brightness(105%) contrast(102%);
}

</style>
