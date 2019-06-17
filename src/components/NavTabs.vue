<template>
  <v-app>
		<v-tabs grow centered>	  
	    <v-tabs-bar color="primary" dark>
	      <v-tabs-slider color="grey lighten-1"/>
	      <v-tabs-item v-for="tab in tabs" :key="tab.nome" :href="'#' + tab.nome">
	        {{ tab.nome }}
	      </v-tabs-item>
        <v-btn  icon @click="$router.push('/login')">
          <v-icon large>account_box</v-icon>
        </v-btn>
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
      ]
    }
  }
}
</script>

<style scoped>

</style>
