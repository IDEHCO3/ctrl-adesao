<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center class="headline textPrimary--text">
            Editar Ator
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap justify-center>
              
              <v-flex xs12>
                <v-text-field label="Nome do Ator *" :rules="[rules.required]" v-model="model.nome"/>
              </v-flex>
              <v-flex xs12 md3>
                <v-select label="Capacitação" v-model="model.capacitacao" :items="['Sim', 'Não', 'Não Informado']"/>
              </v-flex>
              <v-flex xs12 md3 ml-4>  
                <v-select label="Modalidade" v-model="model.modalidade" :items="['NP', 'NC', 'Não Informado']"/>
              </v-flex>
              <v-flex xs12 md3 ml-4>
                <v-select label="Nó implementado" v-model="model.no_implementado" :items="['Sim', 'Não', 'Não Informado']"/>
              </v-flex>
              <v-flex xs12 md4>
                <v-select label="Status Adesão *" :rules="[rules.required]" v-model="model.status_adesao" :items="['Implementado', 'Interessado', 'Processo de Adesão']"/>
              </v-flex>
              <v-flex xs12 md4 ml-4>
                <v-menu lazy  :close-on-content-click="true"  v-model="dateSelector"  transition="scale-transition" offset-y full-width  :nudge-left="40" max-width="290px">
                  <v-text-field slot="activator" label="Data do Oficio" v-model="model.data_oficio" readonly></v-text-field>
                  <v-date-picker  v-model="model.data_oficio" no-title scrollable actions>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 md12>
                <v-textarea label="Observação" auto-grow v-model="model.observacao"/>
                <v-textarea label="DOC Solicitação" auto-grow v-model="model.documento_solicitacao"/>
              </v-flex>
            </v-layout>

            <v-layout justify-center> <!-- Botoes -->
              <v-btn outline color="success" @click.native="edit">
                Salvar
                <v-icon class="ml-1">save</v-icon>
              </v-btn>
              <v-btn outline color="red" @click.native="cancel">
                Cancelar
                <v-icon class="ml-1">cancel</v-icon>
              </v-btn>
            </v-layout>

          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AtorEdit',
  data () {
    return {
      dateSelector: false,
      etag: '',
      model: {},
      prevModel: {},
      rules: {
        required: v => !!v || 'Este campo é obrigatorio'
      }
    }
  },
  methods: {
    cancel () {
      this.$store.state.editAtor = false
      this.$store.commit('clearModel')
    },
    dialog () {
      return this.$store.state.editAtor
    },
    edit () {
      let headers = {
        headers: {
          'If-Match': `${this.etag}`
        }
      }
      axios.put(`ator-list/${this.model.id_ator}/`, this.model, headers)
      .then(res => {
        this.$store.dispatch('findAtorList')
        this.cancel()
      })
    }
  },
  created () {
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  },
  mounted () {
    axios.get(`ator-list/${this.model.id_ator}/`)
      .then(res => {
        this.etag = res.headers.etag
        this.model = res.data
      })
  }
}
</script>

<style scoped>

</style>
