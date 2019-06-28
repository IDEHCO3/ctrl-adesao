<template>
  <v-card class="grey lighten-4 elevation-0">

    <v-card-title class="pa-0 primary">
      <v-flex center class="headline textPrimary--text">
        Nova Publicação Geoespacial
      </v-flex>

      <v-btn flat icon color="red" @click.native="close">
        <v-icon light>cancel</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container class="pt-0" fluid>
        <v-layout row wrap justify-center>

          <v-flex xs12>
            <v-text-field label="Nome do Ator" v-model="publicacaoGeoespacial.id_ator" required/>
          </v-flex>

          <v-flex xs12 md5>
            <v-select
              class="mr-2"
              :items="selectOption"
              v-model="publicacaoGeoespacial.tem_metadados"
              label="Metadados"
            />
          </v-flex>&nbsp;&nbsp;
          <v-flex xs12 md5>
            <v-select
              class="mr-2"
              :items="selectOption"
              v-model="publicacaoGeoespacial.tem_geoservicos"
              label="Geoserviços"
            />
          </v-flex>
          <v-flex xs12 md5>
            <v-select
              class="mr-2"
              :items="selectOption"
              v-model="publicacaoGeoespacial.tem_download"
              label="Download"
            />
          </v-flex>&nbsp;&nbsp;
          <v-flex xs12 md5>
            <v-select 
              class="mr-2"
              :items="selectOption"
              v-model="publicacaoGeoespacial.tem_vinde"
              label="VINDE"
            />
          </v-flex>          
        </v-layout>

        <v-layout justify-center> <!-- Botoes -->
          <v-btn outline color="success" @click.native="addPublicacaoGeoespacial">
            Salvar
            <v-icon class="ml-1">save</v-icon>
          </v-btn>
          <v-btn outline color="error" @click.native="close">
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      publicacaoGeoespacial: {
        id_ator: '',
        tem_download: '',
        tem_geoservicos: '',
        tem_metadados: '',
        tem_vinde: ''
      },
      selectOption: [
        'Sim',
        'Não',
        'Não informado'
      ]
    }
  },
  methods: {
    async addPublicacaoGeoespacial () {
      try {
        await axios.post('publicacaoinformacaogeoespacial-list/', this.publicacaoGeoespacial)
        this.$store.dispatch('findPublicacaoGeoespacialList')
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
      this.publicacaoGeoespacial = {
        id_ator: '',
        tem_download: '',
        tem_geoservicos: '',
        tem_metadados: '',
        tem_vinde: ''
      }
    },
    findAtorName () {
      /* const id = parseInt(linkedData.split('/').reverse()[0])
      const nome = this.atorList.find(ator => ator.id_ator === id).nome
      if (nome) {
        return nome
      } */
    }
  },
  computed: {
    ...mapGetters({atorList: 'getAtorList', publicacaoGeoespacialList: 'getPublicacaoGeoespacialList'})
  }
}
</script>
