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
                <v-text-field box
                  label="Nome"
                  v-model="model.nome"
                  :counter="40"
                  required
                ></v-text-field>
                <v-text-field box
                  label="E-mail"
                  v-model="model.email1"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-subheader>Telefone 1</v-subheader>
              </v-flex>
                  <v-flex xs11 sm5 md3>
                    <v-text-field
                      v-model="model.telefone1"
                      single-line
                      prepend-icon="phone"
                    ></v-text-field>
                  </v-flex>
              <v-flex xs1>
                <v-subheader>Telefone 2</v-subheader>
              </v-flex>
                  <v-flex xs11 sm5 md3>
                    <v-text-field
                      v-model="model.telefone2"
                      single-line
                      prepend-icon="phone"
                    ></v-text-field>
                  </v-flex>
              <v-flex xs1>
                <v-subheader>Celular</v-subheader>
              </v-flex>
              <v-flex xs11 sm5 md3>
                <v-text-field
                  v-model="model.celular_telefone3"
                  single-line
                  prepend-icon="phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md5 offset-md1>
                <v-text-field label="Area/Setor" v-model="model.area_setor"></v-text-field>
              </v-flex>&nbsp;&nbsp;
              <v-flex xs12 md5>
                <v-text-field label="Função/Cargo" v-model="model.funcao_cargo"></v-text-field>
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
  name: 'RepresentanteEdit',
  data () {
    return {
      model: {}
    }
  },
  methods: {
    cancel () {
      this.$store.state.editRepresentante = false
      this.$store.commit('clearModel')
    },
    dialog () {
      return this.$store.state.editRepresentante
    },
    edit () {
      axios.put(`representante-list/${this.model.id_representante}/`, this.model).then(res => {
        this.$store.dispatch('findRepresentanteList')
        this.cancel()
      })
    }
  },
  created () {
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  }
}
</script>

<style scoped>

</style>
