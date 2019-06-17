<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center>
            <div class="headline">Editar Representante</div>
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  label="Nome"
                  v-model="model.nome"
                  :counter="40"
                  required
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="model.email1"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field label="Area/Setor" v-model="model.area_setor"></v-text-field>
              </v-flex>&nbsp;&nbsp;
              <v-flex xs12 md5>
                <v-text-field label="Função/Cargo" v-model="model.funcao_cargo"></v-text-field>
              </v-flex>
              <v-flex ml-2 mt-2 >
                <v-checkbox label="Gestor" v-model="model.gestor"></v-checkbox>
              </v-flex>
              <v-flex xs11 sm5 md3 >
                <v-text-field
                  label="telefone 1"
                  v-model="model.telefone1"
                  single-line
                  prepend-icon="phone"
                ></v-text-field>
              </v-flex>
                  <v-flex xs11 sm5 md3 class="ml-5">
                    <v-text-field
                      label="telefone 2"
                      v-model="model.telefone2"
                      single-line
                      prepend-icon="phone"
                    ></v-text-field>
                  </v-flex>
              <v-flex xs11 sm5 md3 class="ml-5">
                <v-text-field
                  label="Celular"
                  v-model="model.celular_telefone3"
                  single-line
                  prepend-icon="smartphone"
                ></v-text-field>
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
