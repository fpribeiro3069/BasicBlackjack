<template>
  <div id="app-content">
    <div class="nav">
      <h1>Basic Blackjack</h1>
      <div class="nav-buttons">
        <router-link class="icons" to="/">
          <BootstrapIcon 
            icon="shuffle"
            color="white"
            size="2x"
          />
        </router-link>
        <router-link class="icons" to="/soft">
          <BootstrapIcon
            icon="shuffle"
            color="white"
            size="2x"
          />
        </router-link>
        <router-link class="icons" to="/split">
          <BootstrapIcon
            icon="shuffle"
            color="white"
            size="2x"
          />
        </router-link>
        
        <div id="stats" class="icons">
           <BootstrapIcon
            icon="bar-chart-fill"
            color="white"
            size="2x"
          />
        </div>
        
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

export default {
  name: 'App',
  components: {
    BootstrapIcon
  },
  computed: {
    isActive() {
      
      return this.$router.name === "random";
    }
  },
  data() {

    

    return {}
  }
}
</script>

<style lang="scss">
#app-content {
}

.router-link-active > svg {
  color: #e1e1e1;
  transition: all .5s;
  //border-bottom: solid 3px white;
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

</style>
