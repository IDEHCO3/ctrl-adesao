<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center class="headline textPrimary--text">
            Editar Publicação Geoespacial
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-text-field label="Nome do Ator" required v-model="model.id_ator"/>
              </v-flex>
              <v-flex xs12 md5 grey>
                <v-autocomplete
                  :items="ParsedAtorNames"
                  :filter="customFilter"
                  item-text="name"
                  label="Nome do autor auto complete"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md5>
                <v-select
                  class="mr-2"
                  :items="selectOption"
                  v-model="model.tem_metadados"
                  label="Metadados"
                />
              </v-flex>&nbsp;&nbsp;
              <v-flex xs12 md5>
                <v-select
                  class="mr-2"
                  :items="selectOption"
                  v-model="model.tem_geoservicos"
                  label="Geoserviços"
                />
              </v-flex>
              <v-flex xs12 md5>
                <v-select
                  class="mr-2"
                  :items="selectOption"
                  v-model="model.tem_download"
                  label="Download"
                />
              </v-flex>&nbsp;&nbsp;
              <v-flex xs12 md5>
                <v-select 
                  class="mr-2"
                  :items="selectOption"
                  v-model="model.tem_vinde"
                  label="VINDE"
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
  name: 'AtorEdit',
  data () {
    return {
      etag: '',
      model: {},
      ParsedAtorNames: ['test1', 'test2'],
      selectOption: [
        'Sim',
        'Não',
        'Não informado'
      ]
    }
  },
  methods: {
    cancel () {
      this.$store.state.editPublicacaoGeoespacial = false
      this.$store.commit('clearModel')
    },
    customFilter (item, itemText) {
      const textOne = item.name.toLowerCase()

      return textOne.indexOf(searchText) > -1
    },
    dialog () {
      return this.$store.state.editPublicacaoGeoespacial
    },
    edit () {
      let headers = {
        headers: {
          'If-Match': `${this.etag}`
        }
      }
      axios.put(`publicacaoinformacaogeoespacial-list/${this.model.id_publicacao_informacao_geoespacial}/`, this.model, headers)
      .then(res => {
        this.$store.dispatch('findPublicacaoGeoespacialList')
        this.cancel()
      })
    }
  },
  created () { // alterar para um get futuramente
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  },
  mounted () {
    axios.get(`publicacaoinformacaogeoespacial-list/${this.model.id_publicacao_informacao_geoespacial}/`)
      .then(res => {
        this.etag = res.headers.etag
      })
  }
}
</script>

<style scoped>

</style>
