import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
  findAtorList ({ commit }) {
    axios.get('ator-list/').then(res => commit('setAtorList', res.data))
  },
  findDocumentacaoList ({ commit }) {
    axios.get('documentacao-list/').then(res => commit('setDocumentacaoList', res.data))
  },
  findRepresentanteList ({ commit }) {
    axios.get('representante-list/').then(res => {
      commit('setRepresentanteList', res.data)
      commit('setAtorNomeInRepresentante')
    })
  },
  findPublicacaoGeoespacialList ({ commit }) {
    axios.get('publicacaoinformacaogeoespacial-list/').then(res => {
      commit('setPublicacaoGeoespacialList', res.data)
      commit('setAtorNomeInPublicacao')
    })
  },
  findAllList ({ commit, dispatch }) {
    axios.get('ator-list/').then(res => {
      commit('setAtorList', res.data)
      dispatch('findDocumentacaoList')
      dispatch('findRepresentanteList')
      dispatch('findPublicacaoGeoespacialList')
    })
  }
}

const getters = {
  getAtorList (state) {
    return state.ator_list
  },
  getDocumentacaoList (state) {
    return state.documentacao_list
  },
  getPublicacaoGeoespacialList (state) {
    return state.publicacao_geoespacial_list
  },
  getRepresentantesList (state) {
    return state.representante_list
  }
}

export const mutations = {
  clearModel (state) {
    state.editModel = {}
  },
  setAtorList (state, atorList) {
    state.ator_list = atorList
  },
  setDocumentacaoList (state, documentacaoList) {
    state.documentacao_list = documentacaoList
  },
  setRepresentanteList (state, representanteList) {
    state.representante_list = representanteList
  },
  setPublicacaoGeoespacialList (state, publicacaoGeoespacialList) {
    state.publicacao_geoespacial_list = publicacaoGeoespacialList
  },
  setAtorNomeInRepresentante (state) {
    state.representante_list = state.representante_list.map(representante => {
      var atorNome = state.ator_list.find(ator => ator.id_ator === UrlToId(representante.id_ator)).nome
      var representanteComNomeDoAtor = {...representante, ator_nome: `${atorNome}`}
      return representanteComNomeDoAtor
    })
  },
  setAtorNomeInPublicacao (state) {
    state.publicacao_geoespacial_list = state.publicacao_geoespacial_list.map(publicacao => {
      var atorNome = state.ator_list.find(ator => ator.id_ator === UrlToId(publicacao.id_ator)).nome
      var publicacaoComNomeDoAtor = {...publicacao, ator_nome: `${atorNome}`}
      return publicacaoComNomeDoAtor
    })
  }
}

function UrlToId (linkedId) {
  const id = parseInt(linkedId.split('/').reverse()[0])
  return id
}

const state = {
  editAtor: false,
  visuAtor: false,
  editPublicacaoGeoespacial: false,
  editRepresentante: false,
  editModel: {},
  ator_list: [],
  documentacao_list: [],
  representante_list: [],
  teste: [],
  publicacao_geoespacial_list: []
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
