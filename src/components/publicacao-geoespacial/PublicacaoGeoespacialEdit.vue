<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="pa-0 primary">
          <v-flex center class="headline textPrimary--text">
            {{ model.ator_nome }}
          </v-flex>
          <v-btn flat icon color="red" @click.native="cancel">
            <v-icon light>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <v-container fluid>
            <v-layout row wrap justify-center>
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
import { mapGetters } from 'vuex'

export default {
  name: 'AtorEdit',
  data () {
    return {
      etag: '',
      model: {},
      rules: {
        required: v => !!v || 'Este campo é obrigatorio'
      },
      parsedAtor: {
        parsedNameList: [],
        idList: []
      },
      selectOption: [
        'Sim',
        'Não',
        'Não Informado'
      ]
    }
  },
  methods: {
    test () {
      return this.atorList
    },
    cancel () {
      this.$store.state.editPublicacaoGeoespacial = false
      this.$store.commit('clearModel')
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
  computed: {
    ...mapGetters({atorList: 'getAtorList'})
  },
  created () {
    this.model = JSON.parse(JSON.stringify(this.$store.state.editModel))
  },
  mounted () {
    axios.get(`publicacaoinformacaogeoespacial-list/${this.model.id_publicacao_informacao_geoespacial}/`)
      .then(res => {
        this.etag = res.headers.etag
        this.model = res.data
      })
  }
}
</script>

<style scoped>

</style>
