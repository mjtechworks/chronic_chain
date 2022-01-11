<template>
  <div v-if="initialized" class="app-container">
    <img src="./assets/logo.svg" class="app-logo" />
    <sp-wallet ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
    <sp-layout>
      <template v-slot:sidebar>
        <Sidebar />
      </template>
      <template v-slot:content>
        <router-view />
      </template>
    </sp-layout>
  </div>
</template>

<script>
import './scss/app.scss'
import '@starport/vue/lib/starport-vue.css'
import Sidebar from './components/Sidebar'

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
  async created() {
    await this.$store.dispatch('common/env/init')
    this.initialized = true
  },
}
</script>

<style>
body {
  margin: 0;
}

.app-container {
  background-image: url('assets/coin.svg');
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: bottom right;
}

.app-logo {
  position: fixed;
  top: 3.2rem;
  left: clamp(25rem, 24vw, 30rem);
  z-index: 90;
  max-height: 3.2rem;
}

@media screen and (max-width: 768px) {
  .app-logo {
    left: 8.5rem;
    right: auto;
  }
}
</style>
