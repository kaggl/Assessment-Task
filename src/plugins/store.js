import { createStore } from 'vuex'

export default createStore({
  state: {
    lang: 'en',
    results: {
      passage: [],
      keyword: {
        "nodes": [],
        "edges": [],
        "types": {
          "nodes": [],
          "edges": []
        }
      },
      map: {
        type: 'FeatureCollection',
        features: [],
      },
    },
    details: {
      passage: {},
      keyword: {},
    }
  },
  getters: {
    getLang: state => state.lang,
    getResults: state => type => state.results[type],
    getDetails: state => type => state.details[type],
  },
  mutations: {
    setLang: (state, str) => state.lang = str,
    setResults: (state, {name, arr}) => {
      console.log(state, name, arr);
      state.results[name.toLowerCase()] = arr;
    },
    setDetails: (state, {name, obj}) => {
      console.log(state, name, obj);
      state.details[name] = obj;
    },
    addAuthorsToPassages: (state, {loc, obj}) => {
      console.log('addAuthorsToPassages', state, loc, obj);
      if (state.results.passage[loc].autorLocale) state.results.passage[loc].autorLocale.push(obj);
      else state.results.passage[loc].autorLocale = [obj];
    },
  },
})
