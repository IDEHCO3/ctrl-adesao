<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center class="headline textPrimary--text">
            Editar Representante
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-text-field
                  label="Nome"
                  v-model="model.nome"
                  :counter="40"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field
                    label="E-mail 1"
                    v-model="model.email1"
                />
              </v-flex>
              <v-flex xs12 md5 ml-5>
                <v-text-field
                    label="E-mail 2"
                    v-model="model.email2"
                />
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field label="Area/Setor" v-model="model.area_setor"/>
              </v-flex>
              <v-flex xs12 md5 ml-5>
                <v-text-field label="Função/Cargo" v-model="model.funcao_cargo"/>
              </v-flex>
              <v-flex xs12 md5 >
                <v-select label="Gestor" v-model="model.gestor" :items="['Não', 'Sim', 'Não Informado']" item-value="text"/>
              </v-flex>
              <v-flex xs12 md5 ml-5>
                <v-select label="Capacitado" v-model="model.capacitado" :items="['Não', 'Sim', 'Não Informado']" item-value="text"/>
              </v-flex>
              <v-flex xs11 sm5 md3 >
                <v-text-field
                  label="telefone 1"
                  v-model="model.telefone1"
                  single-line
                  prepend-icon="phone"
                />
              </v-flex>
                  <v-flex xs11 sm5 md3 class="ml-5">
                    <v-text-field
                      label="telefone 2"
                      v-model="model.telefone2"
                      single-line
                      prepend-icon="phone"
                    />
                  </v-flex>
              <v-flex xs11 sm5 md3 class="ml-5">
                <v-text-field
                  label="Celular"
                  v-model="model.celular_telefone3"
                  single-line
                  prepend-icon="smartphone"
                />
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
      model: {},
      etag: '',
      rules: {
        required: v => !!v || 'Este campo é obrigatorio'
      }
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
      let headers = {
        headers: {
          'If-Match': `${this.etag}`
        }
      }
      axios.put(`representante-list/${this.model.id_representante}/`, this.model, headers)
      .then(res => {
        this.$store.dispatch('findRepresentanteList')
        this.cancel()
      })
    }
  },
  created () {
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  },
  mounted () {
    axios.get(`representante-list/${this.model.id_representante}/`)
      .then(res => {
        this.etag = res.headers.etag
        this.model = res.data
      })
  }
}
</script>

<style scoped>

</style>
