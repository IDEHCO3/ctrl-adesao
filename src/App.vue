<template>
  <div id="app">
    <nav-tabs></nav-tabs>
  </div>
</template>

<script>
import NavTabs from './components/NavTabs'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {NavTabs},
  methods: {
    ...mapActions(['findAllList'])
  },
  created () {
    this.$store.dispatch('findAllList')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}
</style>
