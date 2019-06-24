<template>
  <v-card class="grey lighten-4 elevation-0">

    <v-card-title class="pa-0 primary">
      <v-flex center>
        <div class="headline"> Novo Ator </div>
      </v-flex>

      <v-btn flat icon color="red" @click.native="close">
        <v-icon light>cancel</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container class="pt-0" fluid>
        <v-layout row wrap>

          <v-flex xs12>
            <v-text-field label="Nome do ator" v-model="ator.nome" required/>
          </v-flex>

          <v-flex xs12 sm4>
            <v-select label="Status Adesão" required v-model="ator.status_adesao" :items="['Implementado', 'Interessado', 'Processo de Adesão']"/>
            <v-select label="Capacitação" v-model="ator.capacitacao" :items="['Sim', 'Não', 'Não Informado']"/>
            <v-select label="Modalidade" v-model="ator.modalidade" :items="['NP', 'NC', 'Não Informado']"/>
          </v-flex>

          <v-flex xs12 sm7 offset-sm1>
            <v-text-field label="Observação" multi-line v-model="ator.observacao"/>
            <v-text-field label="DOC Solicitação" multi-line v-model="ator.documento_solicitacao"/>
          </v-flex>
        </v-layout>

        <v-layout justify-center> <!-- Botoes -->
          <v-btn outline color="success" @click.native="addAtor">
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
      ator: {
        nome: '',
        capacitacao: '',
        documento_solicitacao: '',
        modalidade: '',
        observacao: '',
        status_adesao: ''
      }
    }
  },
  methods: {
    async addAtor () {
      try {
        await axios.post('ator-list/', this.ator)
        this.$store.dispatch('findAtorList')
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
      this.ator = {
        nome: '',
        capacitacao: '',
        documento_solicitacao: '',
        modalidade: '',
        observacao: '',
        status_adesao: ''
      }
    }
  }
}
</script>
