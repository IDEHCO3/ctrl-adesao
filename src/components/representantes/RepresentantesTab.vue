<template>
  <v-flex xs12 md10 offset-md1>
    <representante-edit v-if="this.$store.state.editRepresentante"></representante-edit>
    <v-card height="100%">
    <v-card-title>
      REPRESENTANTES
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Procurar" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :items="atorList" :search="search" 
    :pagination.sync="pagination" hide-actions class="elevation-1" 
    :rows-per-page-items="rows" :custom-sort="sortByNome">

      <template slot="items" slot-scope="props">
        <v-expansion-panel popout>
          <v-expansion-panel-content class="pb-2 mb-1 light-blue lighten-2">
            <div slot="header"> {{ props.item.nome }} </div>
            <!-- Representantes -->
            <v-expansion-panel inset>
              <v-expansion-panel-content class="pb-2 mb-1 light-blue lighten-4" v-for="(representante, i) in findRepresentantes(props.item.id_ator)" :key="i">
                <div slot="header">{{ representante.nome }}
                  <v-btn icon flat small @click="editRepresentante(representante)">
                    <v-icon light>edit</v-icon>
                  </v-btn>
                </div>
                <v-card>
                  <table>
                    <tr>
                      <th>Email</th>
                      <td>{{ representante.email1 }}</td>
                    </tr>
                    <tr>
                      <th>Contatos</th>
                      <td>{{ representante.telefone1 }}<td>
                      <td>{{ representante.telefone2 }}</td>
                      <td>{{ representante.celular_telefone3 }}</td>
                    </tr>

                    <tr>
                      <th>Função/Cargo</th>
                      <td v-if="representante.funcao_cargo">
                        {{ representante.funcao_cargo }}
                      </td>
                      <td v-else>Não informado</td>
                    </tr>
                    <tr>
                      <th>Area/Setor</th>
                      <td v-if="representante.area_setor">
                        {{ representante.area_setor }}
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

    </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="12"></v-pagination>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import RepresentanteEdit from './RepresentanteEdit'

export default {
  name: 'RepresentantesTab',
  components: { RepresentanteEdit },
  data () {
    return {
      search: '',
      pagination: {},
      rows: [8]
    }
  },
  methods: {
    editRepresentante (rep) {
      this.$store.state.editRepresentante = true
      this.$store.state.editModel = rep
    },
    findRepresentantes (idAtor) {
      const representantes = this.representanteList.filter(rep => this.urlToId(rep.ator) === idAtor)
      return representantes
    },
    urlToId (linkedData) {
      return parseInt(linkedData.split('/').reverse()[1])
    },
    sortByNome (items) {
      return items.sort((a, b) => a.nome > b.nome ? 1 : -1)
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList', representanteList: 'getRepresentantesList'}),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.atorList.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>

</style>
