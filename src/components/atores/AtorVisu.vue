<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex md11 class="headline textPrimary--text">
            {{ model.nome }}
          </v-flex>
          <v-flex class="rigth">
            <v-btn flat icon color="red" @click.native="cancel">
              <v-icon light>cancel</v-icon>
            </v-btn>
          </v-flex>
          
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap justify-center>
              <v-flex xs12 md3> <!-- todos readonly -->
                <v-text-field label="Capacitação" v-model="model.capacitacao" :items="['Sim', 'Não', 'Não Informado']" readonly/>
              </v-flex>
              <v-flex xs12 md3 ml-4> 
                <v-text-field label="Modalidade" v-model="model.modalidade" :items="['NP', 'NC', 'Não Informado']" readonly/>
              </v-flex>
              <v-flex xs12 md3 ml-4>
                <v-text-field label="Nó implementado" v-model="model.no_implementado" :items="['Sim', 'Não', 'Não Informado']" readonly/>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Status Adesão" v-model="model.status_adesao" :items="['Implementado', 'Interessado', 'Processo de Adesão']" readonly/>
              </v-flex>
              <v-flex xs12 md4 ml-4>
                  <v-text-field slot="activator" label="Data do Oficio" v-model="model.data_oficio" readonly/>
              </v-flex>

              <v-flex xs12 md12>
                <v-textarea label="Observação" auto-grow v-model="model.observacao" readonly/>
                <v-textarea label="DOC Solicitação" auto-grow v-model="model.documento_solicitacao" readonly/>
              </v-flex>

              <v-flex xs12 md12 v-if="findDoc.length !== 0">
                <v-list subheader>
                  <v-subheader>Documentos: </v-subheader>
                  <template v-for="item in findDoc">
                    <v-list-tile :key="item.nome" avatar :href="item.pdf" target="_blank" title="Abrir documento">

                      <v-list-tile-avatar>
                        <v-icon class="grey textPrimary--text">description</v-icon>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.arquivo }}</v-list-tile-title>
                      </v-list-tile-content>

                    </v-list-tile>
                  </template>
                </v-list>
              </v-flex>

              <v-flex xs12 md12 v-if="findGestor.length !== 0">
                <v-list subheader>
                  <v-subheader>Gestor: </v-subheader>
                  <template v-for="item in findGestor">
                    <v-list-tile :key="item.nome">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                        <v-list-tile-sub-title>Email: {{ item.email1 }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-flex>
            
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AtorEdit',
  data () {
    return {
      model: {}
    }
  },
  methods: {
    test () {
      console.log('doc')
    },
    cancel () {
      this.$store.state.visuAtor = false
    },
    dialog () {
      return this.$store.state.visuAtor
    },
    urlToId (linkedData) {
      return parseInt(linkedData.split('/').reverse()[0])
    }
  },
  computed: {
    ...mapGetters({representanteList: 'getRepresentantesList', documentList: 'getDocumentacaoList'}),
    findGestor () {
      const gestorList = []
      for (let item in this.representanteList) {
        let id = this.urlToId(this.representanteList[item].id_ator) // Transformando url do id em int
        if (id === this.model.id_ator && this.representanteList[item].gestor === 'Sim') {
          gestorList.push(this.representanteList[item])
        }
      }
      return gestorList
    },
    findDoc () {
      const docList = []
      for (let item in this.documentList) {
        let id = this.urlToId(this.documentList[item].ator) // Transformando url do id em int
        if (id === this.model.id_ator) {
          docList.push(this.documentList[item])
        }
      }
      return docList
    }
  },
  created () {
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  }
}
</script>

<style scoped>

</style>
