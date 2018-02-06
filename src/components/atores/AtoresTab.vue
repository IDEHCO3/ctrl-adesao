<template>
  <v-flex xs12 md10 offset-md1>
    <ator-edit v-if="this.$store.state.editAtor"></ator-edit>
    <v-card height="100%">
    <v-card-title>
      ATOR
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="atorList" :search="search"
    :pagination.sync="pagination" hide-actions class="elevation-1" 
    :rows-per-page-items="rows" :custom-sort="sortByNome">

      <template slot="items" slot-scope="props">
        <td class="text-xs-left"> {{ props.item.nome }}
          <v-btn flat icon @click.native.stop="editAtor(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-center">{{ props.item.status_adesao }}</td>
        <td class="text-xs-center">{{ props.item.capacitacao }}</td>
        <td class="text-xs-center">{{ props.item.modalidade }}</td>

        <v-expansion-panel expand popout>

          <v-expansion-panel-content >
            <div slot="header">DOC Solicitação</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{ props.item.documento_solicitacao }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Observação</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{ props.item.observacao }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>

        </v-expansion-panel>
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
import AtorEdit from './AtorEdit'

export default {
  name: 'AtoresTab',
  components: {AtorEdit},
  data () {
    return {
      search: '',
      pagination: {},
      rows: [5],
      headers: [
        {text: 'NOME: ', align: 'left', sortable: false},
        {text: 'Status da Adesão', sortable: false, align: 'center'},
        {text: 'Capacitação', sortable: false, align: 'center'},
        {text: 'Modalidade', sortable: false, align: 'center'}
      ]
    }
  },
  methods: {
    editAtor (ator) {
      this.$store.state.editAtor = true
      this.$store.state.editModel = ator
    },
    sortByNome (items) {
      return items.sort((a, b) => a.nome > b.nome ? 1 : -1)
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList'}),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.atorList.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>

</style>
