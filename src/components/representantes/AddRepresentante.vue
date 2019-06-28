<template>
  <v-card class="grey lighten-4 elevation-0">

    <v-card-title class="pa-0 primary">
      <v-flex center class="headline textPrimary--text">
        Novo Representante
      </v-flex>
      <v-btn flat icon color="red" @click.native="close">
        <v-icon light>cancel</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pt-0 pb-0">
      <v-container fluid>
        <v-layout row wrap justify-center>
          <v-flex xs11>
            <v-text-field
              label="Nome"
              v-model="representante.nome"
              :counter="40"
              required
            />
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
                label="E-mail 1"
                v-model="representante.email1"
            />
          </v-flex>
          <v-flex xs12 md5 ml-5>
            <v-text-field
                label="E-mail 2"
                v-model="representante.email2"
            />
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field label="Area/Setor" v-model="representante.area_setor"/>
          </v-flex>
          <v-flex xs12 md5 ml-5>
            <v-text-field label="Função/Cargo" v-model="representante.funcao_cargo"/>
          </v-flex>
          <v-flex xs12 md5 >
            <v-select label="Gestor" v-model="representante.gestor" :items="['Não', 'Sim', 'Não Informado']" item-value="text"/>
          </v-flex>
          <v-flex xs12 md5 ml-5>
            <v-select label="Capacitado" v-model="representante.capacitado" :items="['Não', 'Sim', 'Não Informado']" item-value="text"/>
          </v-flex>
          <v-flex xs11 sm5 md3 >
            <v-text-field
              label="telefone 1"
              v-model="representante.telefone1"
              single-line
              prepend-icon="phone"
            />
          </v-flex>
              <v-flex xs11 sm5 md3 class="ml-5">
                <v-text-field
                  label="telefone 2"
                  v-model="representante.telefone2"
                  single-line
                  prepend-icon="phone"
                />
              </v-flex>
          <v-flex xs11 sm5 md3 class="ml-5">
            <v-text-field
              label="Celular"
              v-model="representante.celular_telefone3"
              single-line
              prepend-icon="smartphone"
            />
            </v-flex>
        </v-layout>

        <v-layout justify-center> <!-- Botoes -->
              <v-btn outline color="success" @click.native="addRepresentante">
                Salvar
                <v-icon class="ml-1">save</v-icon>
              </v-btn>
              <v-btn outline color="red" @click.native="close">
                Cancelar
                <v-icon class="ml-1">cancel</v-icon>
              </v-btn>
        </v-layout>

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      representante: {
        nome: '',
        capacitado: '',
        email1: '',
        email2: '',
        telefone1: '',
        telefone2: '',
        celular_telefone3: '',
        area_setor: '',
        funcao_cargo: '',
        id_ator: '',
        gestor: ''
      }
    }
  },
  methods: {
    async addRepresentante () {
      try {
        await axios.post('representante-list/', this.representante)
        this.$store.dispatch('findRepresentanteList')
        this.close()
      } catch (error) {
        console.log(error)
      }
    },
    close () {
      this.clearFields()
      this.$emit('close')
    },
    clearFields () {
      this.representante = {
        nome: '',
        capacitado: '',
        email1: '',
        email2: '',
        telefone1: '',
        telefone2: '',
        celular_telefone3: '',
        area_setor: '',
        funcao_cargo: '',
        id_ator: '',
        gestor: ''
      }
    }
  }
}
</script>
