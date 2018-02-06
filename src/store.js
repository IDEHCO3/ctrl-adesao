import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
  findAtorList ({ commit }) {
    axios.get('ator-list/').then(res => commit('setAtorList', res.data))
  },
  findRepresentanteList ({ commit }) {
    axios.get('representante-list/').then(res => commit('setRepresentanteList', res.data))
  },
  findPublicacaoGeoespacialList ({ commit }) {
    axios.get('publicacaoinformacaogeoespacial-list/').then(res => commit('setPublicacaoGeoespacialList', res.data))
  }
}

const getters = {
  getAtorList (state) {
    return state.ator_list
  },
  getPublicacaoGeoespacialList (state) {
    return state.publicacao_geoespacial_list
  },
  getRepresentantesList (state) {
    return state.representante_list
  }
}

const mutations = {
  clearModel (state) {
    state.editModel = {}
  },
  setAtorList (state, atorList) {
    state.ator_list = atorList
  },
  setRepresentanteList (state, representanteList) {
    state.representante_list = representanteList
  },
  setPublicacaoGeoespacialList (state, publicacaoGeoespacialList) {
    state.publicacao_geoespacial_list = publicacaoGeoespacialList
  }
}

const state = {
  editAtor: false,
  editPublicacaoGeoespacial: false,
  editRepresentante: false,
  editModel: {},
  ator_list: [],
  representante_list: [],
  publicacao_geoespacial_list: []
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
