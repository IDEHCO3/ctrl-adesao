<template>
  <v-flex xs12 md10 offset-md1>
    <representante-edit v-if="this.$store.state.editRepresentante"></representante-edit>
    <v-card height="100%">
    <v-card-title>
      REPRESENTANTES
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="publicacaoGeoespacialList" :search="search" 
    :pagination.sync="pagination" hide-actions class="elevation-1" 
    :rows-per-page-items="rows" :custom-sort="sortByNome">

      <template slot="items" slot-scope="props">
        <td class="text-xs-left"> {{ filterNome(props.item.ator) }} </td>
        <td class="text-xs-center">{{ props.item.tem_metadados }}</td>
        <td class="text-xs-center">{{ props.item.tem_geoservicos }}</td>
        <td class="text-xs-center">{{ props.item.tem_download }}</td>
        <td class="text-xs-center">{{ props.item.tem_vinde }}</td>
      </template>

    </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="12"></v-pagination>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      search: '',
      pagination: {},
      rows: [10],
      headers: [
        {text: 'NOME: ', align: 'left', sortable: false},
        {text: 'Metadados', sortable: false, align: 'center'},
        {text: 'Geoserviços', sortable: false, align: 'center'},
        {text: 'Download', sortable: false, align: 'center'},
        {text: 'VINDE', sortable: false, align: 'center'}
      ]
    }
  },
  methods: {
    filterNome (linkedData) {
      const id = parseInt(linkedData.split('/').reverse()[1])
      const nome = this.atorList.find(ator => ator.id_ator === id).nome
      return nome
    },
    sortByNome (items) {
      return items.sort((a, b) => a.nome > b.nome ? 1 : -1)
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList', publicacaoGeoespacialList: 'getPublicacaoGeoespacialList'}),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.publicacaoGeoespacialList.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>

</style>
