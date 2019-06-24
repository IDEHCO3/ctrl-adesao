<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center>
            <div class="headline">Editar Ator</div>
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Ator" required v-model="model.nome"/>
              </v-flex>

              <v-flex xs12 sm4>
                <v-select label="Status Adesão" required v-model="model.status_adesao" :items="['Implementado', 'Interessado', 'Processo de Adesão']"/>
                <v-select label="Capacitação" v-model="model.capacitacao" :items="['Sim', 'Não', 'Não Informado']"/>
                <v-select label="Modalidade" v-model="model.modalidade" :items="['NP', 'NC', 'Não Informado']"/>
              </v-flex>

              <v-flex xs12 sm7 offset-sm1>
                <v-text-field label="Observação" multi-line v-model="model.observacao"/>
                <v-text-field label="DOC Solicitação" multi-line v-model="model.documento_solicitacao"/>
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
      model: {},
      prevModel: {},
      etag: ''
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
  created () { // alterar para um get futuramente
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  },
  mounted () {
    axios.get(`ator-list/${this.model.id_ator}/`)
      .then(res => {
        this.etag = res.headers.etag
      })
  }
}
</script>

<style scoped>

</style>
