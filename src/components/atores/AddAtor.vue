<template>
  <v-card class="grey lighten-4 elevation-0">

    <v-card-title class="pa-0 primary">
      <v-flex center class="headline textPrimary--text">
        Novo Ator
      </v-flex>

      <v-btn flat icon color="red" @click.native="close">
        <v-icon light>cancel</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container class="pt-0" fluid>
        <v-layout row wrap justify-center>

          <v-flex xs12>
            <v-text-field label="Nome do ator *" v-model="ator.nome" :rules="[rules.required]"/>
          </v-flex>
          <v-flex xs12 md4>
            <v-select label="Capacitação" v-model="ator.capacitacao" :items="['Sim', 'Não', 'Não Informado']"/>
          </v-flex>
          <v-flex xs12 md4 ml-4>
            <v-select label="Modalidade" v-model="ator.modalidade" :items="['NP', 'NC', 'Não Informado']"/>
          </v-flex>
          <v-flex xs12 md3 ml-4>
            <v-select label="Nó implementado" v-model="ator.no_implementado" :items="['Sim', 'Não', 'Não Informado']"/>
          </v-flex>
          <v-flex xs12 md4>
            <v-select label="Status Adesão *" :rules="[rules.required]" v-model="ator.status_adesao" :items="['Implementado', 'Interessado', 'Processo de Adesão', 'Não Informado']"/>
          </v-flex>
          <v-flex xs12 md4 ml-4>
            <v-menu lazy  :close-on-content-click="true"  v-model="dateSelector"  transition="scale-transition" offset-y full-width  :nudge-left="40" max-width="290px">
              <v-text-field slot="activator" label="Data do Oficio" v-model="ator.data_oficio" readonly></v-text-field>
              <v-date-picker  v-model="ator.data_oficio" no-title scrollable actions>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 md12>
            <v-textarea label="Observação" auto-grow v-model="ator.observacao"/>
            <v-textarea label="DOC Solicitação" auto-grow v-model="ator.documento_solicitacao"/>
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
      dateSelector: false,
      rules: {
        required: v => !!v || 'Este campo é obrigatorio'
      },
      ator: {
        nome: null,
        capacitacao: null,
        data_oficio: null,
        documento_solicitacao: null,
        modalidade: null,
        no_implementado: null,
        observacao: null,
        status_adesao: null
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
        nome: null,
        capacitacao: null,
        data_oficio: null,
        documento_solicitacao: null,
        modalidade: null,
        no_implementado: null,
        observacao: null,
        status_adesao: null
      }
    }
  }
}
</script>
