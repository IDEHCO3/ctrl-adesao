<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>

          <v-spacer></v-spacer>
          <v-btn floating small class="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
          <v-btn floating small class="green" @click.native="edit">
            <v-icon light>edit</v-icon>
          </v-btn>

        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>

              <v-flex xs12>
                <v-text-field label="Ator" v-model="model.nome"></v-text-field>
              </v-flex>

              <v-flex xs12 sm4>
                <v-text-field label="Status Adesão" v-model="model.status_adesao"></v-text-field>
                <v-text-field label="Capacitação" v-model="model.capacitacao"></v-text-field>
                <v-text-field label="Modalidade" v-model="model.modalidade"></v-text-field>
              </v-flex>

              <v-flex xs12 sm7 offset-sm1>
                <v-text-field label="Observação" multi-line v-model="model.observacao"></v-text-field>
                <v-text-field label="DOC Solicitação" multi-line v-model="model.documento_solicitacao"></v-text-field>
              </v-flex>

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
      prevModel: {}
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
      axios.put(`ator-list/${this.model.id_ator}/`, this.model).then(res => this.cancel())
    }
  },
  created () {
    this.model = this.$store.state.editModel
  }
}
</script>

<style scoped>

</style>
