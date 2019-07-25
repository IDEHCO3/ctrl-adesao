<template>
  <v-app>
    <v-toolbar dark color="primary" class="elevation-{10}">
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title class="textPrimary--text">
        Controle de adesão INDE <small> v{{ apiVersion }} </small>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn  icon @click="$router.push('/login')">
        <v-icon large>account_box</v-icon>
      </v-btn>

    </v-toolbar>
    <v-tabs
      v-model="tab"
      color="primary  "
      grow
      dark
    >
      <v-tabs-slider color="accent"/>
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
