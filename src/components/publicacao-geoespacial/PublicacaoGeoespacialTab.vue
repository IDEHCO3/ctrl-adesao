<template>
  <v-flex xs12 md10 offset-md1>
    <PublicacaogeoespacialEdit v-if="this.$store.state.editPublicacaoGeoespacial"/>
    <v-dialog v-model="addPublicacaoModal" persistent max-width="800px">
      <add-publicacao-geoespacial @close="addPublicacaoModal = false"/>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent max-width="350">
      <delete-modal @close="deleteDialog = false" ref="deletePublic"/>
    </v-dialog>
    
    <v-card height="100%">
    <v-card-title>
      <v-flex center>
        <v-btn outline @click="downloadPDF(searchedList)" color="primary">
          GERAR PDF
          <v-icon color="primary">description</v-icon>
        </v-btn>
        <br>
        <v-btn outline @click="addPublicacaoModal = true" color="primary">
          Nova Publicação
          <v-icon color="primary">add</v-icon>
        </v-btn>
      </v-flex>

      <v-flex xs6 pt-4 class="filterselect">
        <v-select
          class="mr-2"
          :items="filter"
          v-model="metadados"
          label="Metadados"
          item-value="text"
        ></v-select>
        <v-select
          class="mr-2"
          :items="filter"
          v-model="geoservicos"
          label="Geoserviços"
          item-value="text"
        ></v-select>
        <v-select
          class="mr-2"
          :items="filter"
          v-model="download"
          label="Download"
          item-value="text"
        ></v-select>
        <v-select
          class="mr-2"
          :items="filter"
          v-model="vinde"
          label="VINDE"
          item-value="text"
        ></v-select>
      </v-flex>

      <v-flex ma-0 xs12 sm6 md3>
        <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
    </v-card-title>

    <v-data-table :headers="headers" :items="searchedList"
    :pagination.sync="pagination" hide-actions class="elevation-1"
    :rows-per-page-items="rows" > <!-- :custom-sort="sortByNome" -->

      <template slot="items" slot-scope="props">
        <td class="text-xs-left"> {{ props.item.ator_nome }} </td>
        <td class="text-xs-center">{{ props.item.tem_metadados }}</td>
        <td class="text-xs-center">{{ props.item.tem_geoservicos }}</td>
        <td class="text-xs-center">{{ props.item.tem_download }}</td>
        <td class="text-xs-center">{{ props.item.tem_vinde }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon @click.native.stop="editPublic(props.item)" target="_blank" title="Editar">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click.native.stop="deletePublic(props.item)" target="_blank" title="Apagar">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Erro: Dados não encontrados !
        </v-alert>
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
import pdfGenerator from '@/utils/PublicPdf'
import AddPublicacaoGeoespacial from './AddPublicacaoGeoespacial.vue'
import PublicacaogeoespacialEdit from './PublicacaoGeoespacialEdit.vue'
import DeleteModal from '../DeleteModal'

export default {
  name: 'publicacaoGeoespacialTab',
  components: {AddPublicacaoGeoespacial, PublicacaogeoespacialEdit, DeleteModal},
  data () {
    return {
      addPublicacaoModal: false,
      deleteDialog: false,
      search: '',
      pagination: {},
      rows: [13],
      metadados: '',
      geoservicos: '',
      download: '',
      vinde: '',
      filter: [
        {text: ''},
        {text: 'Sim'},
        {text: 'Não'},
        {text: 'Não Informado'}
      ],
      headers: [
        {text: 'Nome', align: 'center', sortable: false},
        {text: 'Metadados', sortable: false, align: 'center'},
        {text: 'Geoserviços', sortable: false, align: 'center'},
        {text: 'Download', sortable: false, align: 'center'},
        {text: 'VINDE', sortable: false, align: 'center'},
        {text: 'Ações', sortable: false, align: 'center'}
      ]
    }
  },
  methods: {
    downloadPDF (list) {
      pdfGenerator(list)
    },
    editPublic (publicacao) {
      this.$store.state.editPublicacaoGeoespacial = true
      this.$store.state.editModel = publicacao
    },
    filters (publicacao, filter) {
      if (publicacao === null || filter === null) {
        return true
      }
      if (publicacao.toLowerCase() === filter.toLowerCase()) {
        return true
      } else {
        return false
      }
    },
    deletePublic (publicacao) {
      const id = parseInt(publicacao.id_ator.split('/').reverse()[0])
      const nome = this.atorList.find(ator => ator.id_ator === id).nome
      this.$refs.deletePublic.name = nome
      this.$refs.deletePublic.url = `publicacaoinformacaogeoespacial-list/${publicacao.id_publicacao_informacao_geoespacial}/`
      this.deleteDialog = true
    },
    sortByNome (items) {
      return items.sort((a, b) => {
        if (a.ator_nome && b.ator_nome) {
          return a.ator_nome > b.ator_nome ? 1 : -1
        } else {
          return 1
        }
      })
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList', publicacaoGeoespacialList: 'getPublicacaoGeoespacialList'}),
    searchedList (search) {
      const publicacaoGeoespacial = this.publicacaoGeoespacialList
      let filters = []
      filters['metadados'] = this.metadados === '' ? null : this.metadados
      filters['geoservicos'] = this.geoservicos === '' ? null : this.geoservicos
      filters['download'] = this.download === '' ? null : this.download
      filters['vinde'] = this.vinde === '' ? null : this.vinde
      let list = publicacaoGeoespacial.filter(publicacao => publicacao.id_ator.match(new RegExp(this.search, 'i')))
      return list.filter(publicacao =>
        this.filters(publicacao.tem_metadados, filters.metadados) &&
        this.filters(publicacao.tem_geoservicos, filters.geoservicos) &&
        this.filters(publicacao.tem_download, filters.download) &&
        this.filters(publicacao.tem_vinde, filters.vinde)
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
