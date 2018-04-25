<template>
  <v-flex xs12 md10 offset-md1>
    <ator-edit v-if="this.$store.state.editAtor"></ator-edit>
    <v-card height="100%">
    <v-card-title>
      ATOR

      <v-btn large icon @click="downloadPDF(searchedList)" color="cyan--text">
        <v-icon large>description</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
      <v-flex xs6 class="filterselect">
        <v-select
          class="mr-2"
          :items="status"
          v-model="statusAdesao"
          label="Status de Adesão"
          item-value="text"
        ></v-select>
        <v-select
          class="mr-2"
          :items="[{text: ''},{text: 'Sim'},{text: 'Não'},{text: 'Não Informado'}]"
          v-model="capacitacao"
          label="Capacitação"
          item-value="text"
        ></v-select>
        <v-select
          class="mr-2"
          :items="[{text: ''},{text: 'NP'},{text: 'NC'},{text: 'Não Informado'}]"
          v-model="modalidade"
          label="Modalidade"
          item-value="text"
        ></v-select>
      </v-flex>
    <v-data-table :headers="headers" :items="searchedList"
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
import pdfGenerator from '@/getPDF'
import AtorEdit from './AtorEdit'

export default {
  name: 'AtoresTab',
  components: {AtorEdit},
  data () {
    return {
      search: '',
      pagination: {},
      rows: [8],
      statusAdesao: '',
      capacitacao: '',
      modalidade: '',
      status: [
        {text: ''},
        {text: 'Implementado'},
        {text: 'interessado'},
        {text: 'Processo de Adesão'}
      ],
      headers: [
        {text: 'NOME: ', align: 'left', sortable: false},
        {text: 'Status da Adesão', sortable: false, align: 'center'},
        {text: 'Capacitação', sortable: false, align: 'center'},
        {text: 'Modalidade', sortable: false, align: 'center'}
      ]
    }
  },
  methods: {
    downloadPDF (list) {
      pdfGenerator(list)
    },
    editAtor (ator) {
      this.$store.state.editAtor = true
      this.$store.state.editModel = ator
    },
    filters (ator, filter) {
      if (ator === null || filter === null) {
        return true
      }
      if (ator.toLowerCase() === filter.toLowerCase()) {
        return true
      } else {
        return false
      }
    },
    sortByNome (items) {
      return items.sort((a, b) => a.nome > b.nome ? 1 : -1)
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList'}),
    searchedList (search) {
      const atores = this.atorList
      let filters = []
      filters['statusAdesao'] = this.statusAdesao === '' ? null : this.statusAdesao
      filters['capacitacao'] = this.capacitacao === '' ? null : this.capacitacao
      filters['modalidade'] = this.modalidade === '' ? null : this.modalidade
      let list = atores.filter(ator => ator.nome.match(new RegExp(this.search, 'i')))
      return list.filter(ator =>
        this.filters(ator.status_adesao, filters.statusAdesao) &&
        this.filters(ator.capacitacao, filters.capacitacao) &&
        this.filters(ator.modalidade, filters.modalidade)
        )
    },
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.searchedList.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>
.filterselect {
  display: inline-flex !important;
  width: 50% !important;
}
</style>
