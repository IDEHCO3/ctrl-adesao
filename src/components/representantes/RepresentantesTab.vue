<template>
  <v-flex xs12 md10 offset-md1>
    <representante-edit v-if="this.$store.state.editRepresentante"></representante-edit>
    <v-dialog v-model="addRepresentanteModal" persistent max-width="800px">
      <AddRepresentante @close="addRepresentanteModal = false" ref="addRepresentanteModal"/>
    </v-dialog>
    <v-card height="100%">

    <v-card-title>
      REPRESENTANTES
      <v-spacer></v-spacer>
      <v-flex ma-0 xs12 sm6>
        <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
    </v-card-title>

    <v-data-table :items="searchedList"
    :pagination.sync="pagination" hide-actions class="elevation-1"
    :rows-per-page-items="rows" :custom-sort="sortByNome">

      <template slot="items" slot-scope="props">
        <v-expansion-panel popout>
          <v-expansion-panel-content class="mb-1 primary white--text">
            <template v-slot:actions>
              <v-icon color="textPrimary">keyboard_arrow_down</v-icon>
            </template>
            
            <div slot="header"> 
              <v-flex left mt-2>
                {{ props.item.nome }} <!-- Nome dos Atores -->
              </v-flex>
              <v-flex right>
                <v-btn  icon small title="Novo representante" @click.stop="addRepresentante(props.item.id_ator)" >
                  <v-icon color="textPrimary">person_add</v-icon>
                </v-btn>
              </v-flex>
            </div>

            <v-expansion-panel expand>
              <div class="warning--text" v-if="findRepresentantes(props.item.id_ator) < 1">
                Nenhum representante registrado
                <v-icon color="warning">error_outline</v-icon>
              </div>
              <v-expansion-panel-content class="mb-1 grey lighten-2" v-for="(representante, i) in findRepresentantes(props.item.id_ator)" :key="i">
                <v-flex slot="header">
                  <v-flex left mt-2>
                    {{ representante.nome }} <!-- Nome dos Representantes -->
                    <v-icon color="black" title="Gestor" v-if="representante.gestor == 'Sim'">star_border</v-icon>
                  </v-flex>
                  <v-flex right> 
                    <v-btn icon small title="Editar" @click.stop="editRepresentante(representante)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon small title="Apagar" @click.stop="deleteRepresentante(representante)">
                      <v-icon color="red darken-3">delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-flex>

                <v-card>
                  <table>
                    <tr>
                      <th>Area/Setor</th>
                      <td v-if="representante.area_setor">
                        {{ representante.area_setor }}
                      </td>
                      <td v-else>Não informado</td>
                    </tr>
                    <tr>
                      <th>Capacitado</th>
                      <td v-if="representante.capacitado">
                        {{ representante.capacitado }}
                      </td>
                      <td v-else>Não informado</td>
                    </tr>
                    <tr>
                      <th>Contatos</th>
                      <td>
                        <v-icon>phone</v-icon>
                        {{ representante.telefone1 }}
                      </td>
                      <td>
                        <v-icon>phone</v-icon>
                        {{ representante.telefone2 }}
                      </td>
                      <td>
                        <v-icon>smartphone</v-icon>
                        {{ representante.celular_telefone3 }}
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ representante.email1 }}</td>
                      <td>{{ representante.email2 }}</td>
                    </tr>
                    <tr>
                      <th>Função/Cargo</th>
                      <td v-if="representante.funcao_cargo">
                        {{ representante.funcao_cargo }}
                      </td>
                      <td v-else>Não informado</td>
                    </tr>
                  </table>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Erro: Dados não encontrados !
        </v-alert>
      </template>
    </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination color="primary" v-model="pagination.page" :length="pages" :total-visible="10"></v-pagination>
      </div>
      <v-dialog v-model="deleteDialog" persistent max-width="350">
        <delete-modal @close="deleteDialog = false" ref="deleteRepresentante"/>
      </v-dialog>
    </v-card>
  </v-flex>
</template>

<script>
import { defaults as axiosDefaults } from 'axios'
import { mapGetters } from 'vuex'
import AddRepresentante from './AddRepresentante'
import RepresentanteEdit from './RepresentanteEdit'
import DeleteModal from '../DeleteModal'

export default {
  name: 'RepresentantesTab',
  components: { AddRepresentante, RepresentanteEdit, DeleteModal },
  data () {
    return {
      deleteDialog: false,
      addRepresentanteModal: false,
      search: '',
      pagination: {},
      rows: [10]
    }
  },
  methods: {
    addRepresentante (atorId) {
      this.$refs.addRepresentanteModal.representante.id_ator = `${axiosDefaults.baseURL}ator-list/${atorId}/`
      this.addRepresentanteModal = true
    },
    editRepresentante (rep) {
      this.$store.state.editRepresentante = true
      this.$store.state.editModel = rep
    },
    deleteRepresentante (rep) {
      this.$refs.deleteRepresentante.name = rep.nome
      this.$refs.deleteRepresentante.url = `representante-list/${rep.id_representante}/`
      this.deleteDialog = true
    },
    findRepresentantes (idAtor) {
      const representantes = this.representanteList.filter(rep => this.urlToId(rep.id_ator) === idAtor)
      return representantes
    },
    urlToId (linkedData) {
      return parseInt(linkedData.split('/').reverse()[0])
    },
    sortByNome (items) {
      return items.sort((a, b) => a.nome > b.nome ? 1 : -1)
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList', representanteList: 'getRepresentantesList'}),
    searchedList (search) {
      const atores = this.atorList
      const regexp = new RegExp(this.search, 'i')
      const list = atores.filter(ator => ator.nome.match(regexp))
      return list
    },
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.searchedList.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>

</style>
