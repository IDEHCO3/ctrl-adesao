<template>
  <v-flex xs12 md10 offset-md1>
    <ator-edit v-if="this.$store.state.editAtor"/>
    <ator-visu v-if="this.$store.state.visuAtor"/>
    <v-dialog v-model="addAtorModal" persistent max-width="800px">
      <AddAtor @close="addAtorModal = false"/>
    </v-dialog>

    <v-card height="100%">
      <v-card-title>
        <v-flex center>
          <v-btn outline @click="downloadPDF(searchedList)" color="primary">
            GERAR PDF
            <v-icon color="primary">description</v-icon>
          </v-btn> 
          <br>         
          <v-btn outline @click="addAtorModal = true" color="primary">
            Novo Ator
            <v-icon ml-1 color="primary">add</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs6 pt-4 class="filterselect"><!-- Filtros de busca --->
          <v-select
            class="mr-2"
            :items="status"
            v-model="statusAdesao"
            label="Status de Adesão"
            item-value="text"
          />
          <v-select
            class="mr-2"
            :items="[{text: ''},{text: 'Sim'},{text: 'Não'},{text: 'Não Informado'}]"
            v-model="noImplementado"
            label="Nó implementado"
            item-value="text"
          />
          <v-select
            class="mr-2"
            :items="[{text: ''},{text: 'Sim'},{text: 'Não'},{text: 'Não Informado'}]"
            v-model="capacitacao"
            label="Capacitação"
            item-value="text"
          />
          <v-select
            class="mr-2"
            :items="[{text: ''},{text: 'NP'},{text: 'NC'},{text: 'Não Informado'}]"
            v-model="modalidade"
            label="Modalidade"
            item-value="text"
          />
        </v-flex>

        <v-flex ma-0 xs12 sm6 md3>
          <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
        </v-flex>
      </v-card-title>

      <v-data-table  :headers="headers" :items="searchedList"
      :pagination.sync="pagination" hide-actions class="elevation-1"
      :rows-per-page-items="rows" :custom-sort="sortByNome">

        <template slot="items" slot-scope="props">
          <td class="text-xs-left">
            {{ props.item.nome }}
            
          </td>
          <td class="text-xs-center">{{ props.item.status_adesao }}</td>
          <td class="text-xs-center">{{ props.item.no_implementado }}</td>
          <td class="text-xs-center">{{ props.item.capacitacao }}</td>
          <td class="text-xs-center">{{ props.item.modalidade }}</td>
          <td class="justify-center layout">
            <v-btn icon title="Ver" @click.native.stop="visuAtor(props.item)">
                <v-icon>remove_red_eye</v-icon>
            </v-btn>
            <v-btn icon title="Editar" @click.native.stop="editAtor(props.item)">
                <v-icon color="success">edit</v-icon>
            </v-btn>
            <v-btn icon title="Apagar" @click.native.stop="deleteAtor(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
          </td>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            Dados não encontrados !
          </v-alert>
        </template>
      </v-data-table>
      
      <div class="text-xs-center pt-2">
        <v-pagination color="primary" v-model="pagination.page" :length="pages" :total-visible="10"></v-pagination>
      </div>
      <v-dialog v-model="deleteDialog" persistent max-width="350">
        <delete-modal @close="deleteDialog = false" ref="deleteAtor"/>
      </v-dialog>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import pdfGenerator from '@/utils/AtorPdf'
import AddAtor from './AddAtor'
import AtorEdit from './AtorEdit'
import AtorVisu from './AtorVisu'
import DeleteModal from '../DeleteModal'

export default {
  name: 'AtoresTab',
  components: {AddAtor, AtorEdit, AtorVisu, DeleteModal},
  data () {
    return {
      addAtorModal: false,
      deleteDialog: false,
      search: '',
      pagination: {},
      rows: [13],
      statusAdesao: '',
      noImplementado: '',
      capacitacao: '',
      modalidade: '',
      status: [
        {text: ''},
        {text: 'Implementado'},
        {text: 'Interessado'},
        {text: 'Processo de Adesão'},
        {text: 'Não informado'}
      ],
      headers: [
        {text: 'Nome', align: 'center', sortable: false},
        {text: 'Status da Adesão', sortable: false, align: 'center'},
        {text: 'Nó implementado', sortable: false, align: 'center'},
        {text: 'Capacitação', sortable: false, align: 'center'},
        {text: 'Modalidade', sortable: false, align: 'center'},
        {text: 'Ações', sortable: false, align: 'center'}
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
    visuAtor (ator) {
      this.$store.state.visuAtor = true
      this.$store.state.editModel = ator
    },
    deleteAtor (ator) {
      this.$refs.deleteAtor.name = ator.nome
      this.$refs.deleteAtor.url = `ator-list/${ator.id_ator}/`
      this.deleteDialog = true
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
      filters['noImplementado'] = this.noImplementado === '' ? null : this.noImplementado
      filters['capacitacao'] = this.capacitacao === '' ? null : this.capacitacao
      filters['modalidade'] = this.modalidade === '' ? null : this.modalidade
      let list = atores.filter(ator => ator.nome.match(new RegExp(this.search, 'i')))
      return list.filter(ator =>
        this.filters(ator.status_adesao, filters.statusAdesao) &&
        this.filters(ator.no_implementado, filters.noImplementado) &&
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
