<template>
  <v-card class="grey lighten-4 elevation-0">

    <v-card-title class="pa-0 primary">
      <v-flex center>
        <div class="headline">Novo Representante</div>
      </v-flex>
      <v-btn flat icon color="red" @click.native="close">
        <v-icon light>cancel</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pt-0 pb-0">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Nome"
              v-model="representante.nome"
              :counter="40"
              required
            />
            <v-text-field
              label="E-mail"
              v-model="representante.email1"
            />
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field label="Area/Setor" v-model="representante.area_setor"></v-text-field>
          </v-flex>&nbsp;&nbsp;
          <v-flex xs12 md5>
            <v-text-field label="Função/Cargo" v-model="representante.funcao_cargo"></v-text-field>
          </v-flex>
          <v-flex ml-2 >
            <v-select label="Gestor" v-model="representante.gestor" :items="['Não', 'Sim', 'Não Informado']" item-value="text"/>
          </v-flex>
          <v-flex xs11 sm5 md3 >
            <v-text-field
              label="telefone 1"
              v-model="representante.telefone1"
              single-line
              prepend-icon="phone"
            ></v-text-field>
          </v-flex>
              <v-flex xs11 sm5 md3 class="ml-5">
                <v-text-field
                  label="telefone 2"
                  v-model="representante.telefone2"
                  single-line
                  prepend-icon="phone"
                ></v-text-field>
              </v-flex>
          <v-flex xs11 sm5 md3 class="ml-5">
            <v-text-field
              label="Celular"
              v-model="representante.celular_telefone3"
              single-line
              prepend-icon="smartphone"
            ></v-text-field>
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
        email1: '',
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
        email1: '',
        telefone1: '',
        telefone2: '',
        celular_telefone3: '',
        area_setor: '',
        funcao_cargo: '',
        id_ator: ''
        // gestor: ''
      }
    }
  }
}
</script>
