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
    },
    apiResponses: {},
  },
  getters: {
    getLang: state => state.lang,
    getResults: state => type => state.results[type],
    getDetails: state => type => state.details[type],
    getResponse: state => url => state.apiResponses[url],
  },
  mutations: {
    addAuthorsToPassages: (state, {loc, obj}) => {
      console.log('addAuthorsToPassages', state, loc, obj);
      if (state.results.passage[loc].autorLocale) state.results.passage[loc].autorLocale.push(obj);
      else state.results.passage[loc].autorLocale = [obj];
    },
    addApiResponse: (state, {url, response}) => {
      state.apiResponses[url] = response;
    },
    setDetails: (state, {name, obj}) => {
      console.log(state, name, obj);
      state.details[name] = obj;
    },
    setLang: (state, str) => state.lang = str,
    setResults: (state, {name, arr}) => {
      console.log(state, name, arr);
      state.results[name.toLowerCase()] = arr;
    },

  },
})
