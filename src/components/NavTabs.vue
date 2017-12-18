<template>
  <v-app>
		<v-tabs grow centered>

	    <v-toolbar extended color="light-blue lighten-1" dark>
	      <v-toolbar-title slot="extension" class="text-xs-center white--text display-2">Controle de Adesão</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn large icon @click="$router.push('/login')">
          <v-icon large>account_box</v-icon>
        </v-btn>
	    </v-toolbar>

	    <v-tabs-bar color="light-blue lighten-1" dark>
	      <v-tabs-slider color="yellow"></v-tabs-slider>
	      <v-tabs-item v-for="tab in tabs" :key="tab.nome" :href="'#' + tab.nome">
	        {{ tab.nome }}
	      </v-tabs-item>
	    </v-tabs-bar>

	    <v-tabs-items>
	      <v-tabs-content id="ATOR">
	        <v-card flat>
	          <atores-tab></atores-tab>
	        </v-card>
	      </v-tabs-content>

        <v-tabs-content id="REPRESENTANTES">
          <v-card flat>
            <representantes-tab></representantes-tab>
          </v-card>
        </v-tabs-content>

        <v-tabs-content id="PUBLICAÇÃO GEOESPACIAL">
          <v-card flat>
            <publicacao-geoespacial-tab></publicacao-geoespacial-tab>
          </v-card>
        </v-tabs-content>
	    </v-tabs-items>

	  </v-tabs>
  </v-app>
</template>

<script>
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
      tabs: [
        {nome: 'ATOR'},
        {nome: 'REPRESENTANTES'},
        {nome: 'PUBLICAÇÃO GEOESPACIAL'}
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style scoped>

</style>
