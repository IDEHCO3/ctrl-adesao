<template>
  <v-app>
    <v-tabs
      v-model="tab"
      color="primary  "
      grow
      dark
    >
      <v-tabs-slider color="warning"/>
      <v-tab
        v-for="item in tabs"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item">
        <atores-tab v-if='item=="ATOR"'></atores-tab>
        <representantes-tab v-if='item=="REPRESENTANTES"'></representantes-tab>
        <publicacao-geoespacial-tab v-if='item=="PUBLICAÇÃO GEOESPACIAL"'></publicacao-geoespacial-tab>
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import {version} from '@/../package.json'

import AtoresTab from './atores/AtoresTab'
import PublicacaoGeoespacialTab from './publicacao-geoespacial/PublicacaoGeoespacialTab'
import RepresentantesTab from './representantes/RepresentantesTab'

export default {
  name: 'NavTabs',
  components: {
    AtoresTab, PublicacaoGeoespacialTab, RepresentantesTab
  },
  data () {
    return {
      apiVersion: '',
      tab: null,
      tabs: [
        'ATOR',
        'REPRESENTANTES',
        'PUBLICAÇÃO GEOESPACIAL'
      ]
    }
  },
  created () {
    this.apiVersion = version
  }
}
</script>

<style scoped>

</style>
