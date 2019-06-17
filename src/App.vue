<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions(['findAtorList', 'findRepresentanteList', 'findPublicacaoGeoespacialList'])
  },
  created () {
    this.findAtorList()
    this.findRepresentanteList()
    this.findPublicacaoGeoespacialList()
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
