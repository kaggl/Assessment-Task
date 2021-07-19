(function(e){function t(t){for(var a,c,s=t[0],i=t[1],l=t[2],u=0,_=[];u<s.length;u++)c=s[u],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&_.push(o[c][0]),o[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(_.length)_.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,c=1;c<n.length;c++){var i=n[c];0!==o[i]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},r=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-2d0c9189":"c81458cc","chunk-2d0cf391":"020c75ea","chunk-2d0da8f3":"c8c3e7e8","chunk-2d2248b6":"d84473c1","chunk-2d22523a":"4b710d99"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=o[e]=[t,a]}));t.push(n[2]=a);var r,i=document.createElement("script");i.charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.src=c(e);var l=new Error;r=function(t){i.onerror=i.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",l.name="ChunkLoadError",l.type=a,l.request=r,n[1](l)}o[e]=void 0}};var u=setTimeout((function(){r({type:"timeout",target:i})}),12e4);i.onerror=i.onload=r,document.head.appendChild(i)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/Assessment-Task/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0197":function(e,t,n){},"0f22":function(e,t,n){},"28c9":function(e,t,n){"use strict";n("e486")},"31c6":function(e,t,n){"use strict";n("6faa")},"3fbb":function(e,t,n){"use strict";var a=n("f2bf"),o=Object(a["P"])("data-v-5fbe74ed");Object(a["x"])("data-v-5fbe74ed");var r={ref:"visWrapper",class:"visualization"};Object(a["v"])();var c=o((function(e,t,n,o,c,s){return Object(a["u"])(),Object(a["e"])("div",r,null,512)})),s=(n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("d81d"),n("4de4"),n("de47")),i={name:"Visualization",data:function(){return{}},props:{backgroundColor:String,dagMode:{type:String,default:null},graph:{type:Object,default:{nodes:[],edges:[],types:{nodes:[],edges:[]}}},highlightedNodeIds:Set,onNodeClick:Function,onSimulationEnd:Function,onSimulationTick:Function,onZoom:Function,selectedNodeIds:Set,showNeighborsOnly:{type:Boolean,default:!1},width:{type:String},height:String},methods:{transformedData:function(e){return{nodes:this.addColorAndType(e.nodes,e.types.nodes),links:this.addColorAndType(e.edges,e.types.edges)}},addColorAndType:function(e,t){return e=e.map((function(e){var n=t.filter((function(t){return t.id==e.type}))[0];return n&&(e.color=n.color),e})),e},setCanvas:function(){var e=Object(s["a"])()(this.$refs.visWrapper);e.nodeLabel("label").height(this.height||this.$refs.visWrapper.clientHeight).width(this.width||this.$refs.visWrapper.clientWidth).backgroundColor(this.backgroundColor||null).dagMode(this.dagMode).onNodeClick(this.onNodeClick).onEngineStop(this.onSimulationEnd).onEngineTick(this.onEngineEnd).onZoom(this.onZoom).graphData(this.transformedData(this.graph)).nodeCanvasObjectMode((function(){return"after"})).cooldownTicks(100),e.onEngineStop((function(){return e.zoomToFit(400)}))}},mounted:function(){this.setCanvas()},updated:function(){this.setCanvas()}};n("5804");i.render=c,i.__scopeId="data-v-5fbe74ed";t["a"]=i},"54d9":function(e,t,n){"use strict";n("d3b7"),n("ddb0");var a=n("f2bf");function o(e,t,n,o,r,c){var s=Object(a["D"])("l-tile-layer"),i=Object(a["D"])("l-geo-json"),l=Object(a["D"])("l-map");return Object(a["u"])(),Object(a["e"])("div",null,[Object(a["h"])(l,{zoom:3,style:{height:"500px"},center:c.center},{default:Object(a["L"])((function(){return[Object(a["h"])(s,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","layer-type":"base",name:"OpenStreetMap"}),Object(a["h"])(i,{geojson:c.entries},null,8,["geojson"])]})),_:1},8,["center"])])}var r=n("5530"),c=(n("4de4"),n("d81d"),n("6cc5"),n("5afd")),s=n("5502"),i={props:{data:{type:Object,default:{type:"FeatureCollection",features:[]}}},components:{LMap:c["b"],LTileLayer:c["c"],LGeoJson:c["a"]},computed:Object(r["a"])(Object(r["a"])({},Object(s["b"])(["getResults"])),{},{center:function(){var e=this.entries.features.map((function(e){return e.bbox})).filter((function(e){return e}));if(!e.length)return[0,0];console.log("features",e);for(var t=[],n=function(n){t.push(e.reduce((function(e,t){return e+t[n]}),0)/e.length)},a=0;a<4;a+=1)n(a);return console.log("retArray",t),[(t[1]+t[3])/2,(t[0]+t[2])/2]},entries:function(){return this.data.features.length?this.data:this.getResults("map")}})};i.render=o;t["a"]=i},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("f2bf"),o={id:"app"};function r(e,t,n,r,c,s){var i=Object(a["D"])("nav-bar"),l=Object(a["D"])("router-view");return Object(a["u"])(),Object(a["e"])("div",o,[Object(a["h"])(i),Object(a["h"])(l)])}var c=n("eadc"),s=n.n(c),i=Object(a["P"])("data-v-700a4e42");Object(a["x"])("data-v-700a4e42");var l={class:"navbar navbar-expand-lg navbar-light"},u=Object(a["h"])("img",{src:s.a,class:"img-fluid",alt:"Your Logo",itemprop:"logo"},null,-1),d=Object(a["g"])("Assessment Task"),_={class:"dropdown"},b={class:"btn btn-outline-dark dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},h={class:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},p=Object(a["g"])("English"),f=Object(a["g"])("Deutsch"),O=Object(a["h"])("a",{href:"https://github.com/kaggl/Assessment-Task"},[Object(a["h"])("button",{class:"form-inline btn btn-outline-info"}," Repository ")],-1);Object(a["v"])();var j=i((function(e,t,n,o,r,c){var s=Object(a["D"])("router-link");return Object(a["u"])(),Object(a["e"])("nav",l,[Object(a["h"])("div",{class:"container",onClick:t[1]||(t[1]=function(){return c.logStore&&c.logStore.apply(c,arguments)})},[Object(a["h"])(s,{to:"/",class:"navbar-brand custom-logo-link",rel:"home"},{default:i((function(){return[u]})),_:1}),Object(a["h"])(s,{to:"/",class:"navbar-brand site-title-with-logo",rel:"home",title:"Assessment Task"},{default:i((function(){return[d]})),_:1}),Object(a["h"])("div",_,[Object(a["h"])("button",b,Object(a["F"])(e.$t("lang")),1),Object(a["h"])("div",h,[Object(a["h"])(s,{class:"dropdown-item",to:"/en/search/stelle"},{default:i((function(){return[p]})),_:1}),Object(a["h"])(s,{class:"dropdown-item",to:"/de/search/stelle"},{default:i((function(){return[f]})),_:1})])]),O])])})),m={name:"NavigationBar",data:function(){return{langMap:{en:"English",de:"Deutsch"}}},methods:{logStore:function(){console.log(this.$store.state.lang,this.$store.state.results,this.$store)}},watch:{$i18n:{handler:function(e){console.log("Language changed to:",e.locale)},deep:!0},$route:function(e){this.$i18n.locale=e.params.locale}}},g=(n("91ee"),function(e){e.__i18n=e.__i18n||[],e.__i18n.push({locale:"",resource:{en:{lang:e=>{const{normalize:t}=e;return t(["English"])}},de:{lang:e=>{const{normalize:t}=e;return t(["Deutsch"])}}}})});m.render=j,m.__scopeId="data-v-700a4e42","function"===typeof g&&g(m);var y=m,v=(n("caad"),{class:"container"}),w={class:"row"},k={class:"search input-group mb-3 col-md-6 offset-md-3"},D={key:0,class:"input-group-prepend"},E={class:"btn btn-outline-secondary dropdown-toggle",type:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},P={class:"dropdown-menu"},C={class:"input-group-prepend"},M=Object(a["h"])("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-search",viewBox:"0 0 16 16"},[Object(a["h"])("path",{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"})],-1),L={key:0,class:"col-md-2"},T={class:"form-check form-switch"},z={class:"btn"},A={class:"form-check-label",for:"checkbox"},I={class:"nav nav-tabs"},K={class:"nav-item"},R={class:"nav-item"},F={class:"nav-item"},S=Object(a["h"])("br",null,null,-1),x={key:0},$={key:1},U={key:2},B={key:3},W={key:4},N={key:5},V={key:0},q={for:"limit"};function J(e,t,n,o,r,c){var s=Object(a["D"])("vue-bootstrap-typeahead"),i=Object(a["D"])("router-link"),l=Object(a["D"])("router-view");return Object(a["u"])(),Object(a["e"])("div",v,[Object(a["h"])("div",w,[Object(a["h"])("div",k,["VisComponent"==c.type&&r.advanced?(Object(a["u"])(),Object(a["e"])("div",D,[Object(a["h"])("button",E,Object(a["F"])(r.keywordType?e.$t(r.keywordType):""),1),Object(a["h"])("div",P,[Object(a["h"])("a",{class:"dropdown-item",onClick:t[1]||(t[1]=Object(a["O"])((function(e){return r.keywordType=void 0}),["prevent"])),href:"#"},Object(a["F"])(e.$t("all")),1),Object(a["h"])("a",{class:"dropdown-item",onClick:t[2]||(t[2]=Object(a["O"])((function(e){return r.keywordType="Schlagwort"}),["prevent"])),href:"#"},Object(a["F"])(e.$t("Schlagwort")),1),Object(a["h"])("a",{class:"dropdown-item",onClick:t[3]||(t[3]=Object(a["O"])((function(e){return r.keywordType="Eigenname"}),["prevent"])),href:"#"},Object(a["F"])(e.$t("Eigenname")),1)])])):Object(a["f"])("",!0),"VisComponent"==c.type?Object(a["M"])((Object(a["u"])(),Object(a["e"])("input",{key:1,type:"text",placeholder:e.$t("keywords"),onKeyup:t[4]||(t[4]=Object(a["N"])((function(){return c.enterQuery&&c.enterQuery.apply(c,arguments)}),["enter"])),"onUpdate:modelValue":t[5]||(t[5]=function(e){return r.keyInput=e}),class:"form-control","aria-describedby":"basic-addon1"},null,40,["placeholder"])),[[a["I"],r.keyInput]]):Object(a["f"])("",!0),"Places"==c.type?Object(a["M"])((Object(a["u"])(),Object(a["e"])("input",{key:2,type:"text",placeholder:e.$t("keywords"),onKeyup:t[6]||(t[6]=Object(a["N"])((function(){return c.enterQuery&&c.enterQuery.apply(c,arguments)}),["enter"])),"onUpdate:modelValue":t[7]||(t[7]=function(e){return r.mapInput=e}),class:"form-control","aria-describedby":"basic-addon1"},null,40,["placeholder"])),[[a["I"],r.mapInput]]):Object(a["f"])("",!0),"DataTable"==c.type?Object(a["M"])((Object(a["u"])(),Object(a["e"])("input",{key:3,type:"text",placeholder:e.$t("stelle"),onKeyup:t[8]||(t[8]=Object(a["N"])((function(){return c.enterQuery&&c.enterQuery.apply(c,arguments)}),["enter"])),"onUpdate:modelValue":t[9]||(t[9]=function(e){return r.input=e}),class:"form-control","aria-describedby":"basic-addon1"},null,40,["placeholder"])),[[a["I"],r.input]]):Object(a["f"])("",!0),r.advanced&&"VisComponent"==c.type?Object(a["M"])((Object(a["u"])(),Object(a["e"])("input",{key:4,type:"text",placeholder:e.$t("author"),onKeyup:t[10]||(t[10]=Object(a["N"])((function(){return c.enterQuery&&c.enterQuery.apply(c,arguments)}),["enter"])),"onUpdate:modelValue":t[11]||(t[11]=function(t){return e.keywordAuthor=t}),class:"form-control","aria-describedby":"basic-addon1"},null,40,["placeholder"])),[[a["I"],e.keywordAuthor]]):Object(a["f"])("",!0),r.advanced&&"DataTable"==c.type?(Object(a["u"])(),Object(a["e"])(s,{key:5,type:"text",placeholder:"Use Case",ref:"useCaseRef",onInput:c.getKeywords,onHit:t[12]||(t[12]=function(e){return r.selectedUseCase=e}),onKeyup:Object(a["N"])(c.enterQuery,["enter"]),data:r.keywordObj,serializer:function(e){return e.selected_text},class:"form-control","aria-describedby":"basic-addon1",showAllResults:"true"},null,8,["onInput","onKeyup","data","serializer"])):Object(a["f"])("",!0),Object(a["h"])("div",C,[Object(a["h"])("button",{class:"btn btn-primary",onClick:t[13]||(t[13]=function(){return c.enterQuery&&c.enterQuery.apply(c,arguments)}),type:"button"},[M])])]),["DataTable","VisComponent"].includes(c.type)?(Object(a["u"])(),Object(a["e"])("div",L,[Object(a["h"])("div",T,[Object(a["h"])("button",z,[Object(a["M"])(Object(a["h"])("input",{class:"form-check-input",type:"checkbox",id:"checkbox","onUpdate:modelValue":t[14]||(t[14]=function(e){return r.advanced=e})},null,512),[[a["H"],r.advanced]]),Object(a["h"])("label",A,Object(a["F"])(e.$t("advancedSearch")),1)])])])):Object(a["f"])("",!0)]),Object(a["h"])("ul",I,[Object(a["h"])("li",K,[Object(a["h"])(i,{class:[{active:"DataTable"==c.type},"nav-link"],to:{name:"DataTable"}},{default:Object(a["L"])((function(){return[Object(a["g"])(Object(a["F"])(e.$t("datatable")),1)]})),_:1},8,["class"])]),Object(a["h"])("li",R,[Object(a["h"])(i,{class:[{active:"VisComponent"==c.type},"nav-link"],to:{name:"VisComponent"}},{default:Object(a["L"])((function(){return[Object(a["g"])(Object(a["F"])(e.$t("visualization")),1)]})),_:1},8,["class"])]),Object(a["h"])("li",F,[Object(a["h"])(i,{class:[{active:"Places"==c.type},"nav-link"],to:{name:"Places"}},{default:Object(a["L"])((function(){return[Object(a["g"])(Object(a["F"])(e.$t("map")),1)]})),_:1},8,["class"])])]),S,Object(a["h"])("p",null,[r.init?(Object(a["u"])(),Object(a["e"])("span",x,Object(a["F"])(e.$t("query")),1)):r.loading?(Object(a["u"])(),Object(a["e"])("span",$,Object(a["F"])(e.$t("loading"))+"...",1)):r.count&&"DataTable"==c.type?(Object(a["u"])(),Object(a["e"])("span",U,Object(a["F"])(r.count)+" "+Object(a["F"])(e.$t("results"))+" "+Object(a["F"])(parseInt(e.offset)+1)+"-"+Object(a["F"])(parseInt(e.offset)+r.limit>r.count?r.count:parseInt(e.offset)+r.limit),1)):e.getResults("keyword").nodes.length&&"VisComponent"==c.type?(Object(a["u"])(),Object(a["e"])("span",B,Object(a["F"])(e.$t("keyResults",{nodes:e.getResults("keyword").nodes.length,edges:e.getResults("keyword").edges.length})),1)):e.getResults("map").features.length&&"Places"==c.type?(Object(a["u"])(),Object(a["e"])("span",W,Object(a["F"])(e.getResults("map").count)+" "+Object(a["F"])(e.$t("mapResults"))+"!",1)):(Object(a["u"])(),Object(a["e"])("span",N,Object(a["F"])(e.$t("noResults")),1))]),"DataTable"==c.type?(Object(a["u"])(),Object(a["e"])("p",V,[Object(a["h"])("button",{class:"btn btn-outline-primary navButton",disabled:!r.previous,onClick:t[15]||(t[15]=function(e){return c.send(r.previous)})},Object(a["F"])(e.$t("previous")),9,["disabled"]),Object(a["h"])("label",q,Object(a["F"])(e.$t("resultsperPage"))+":",1),Object(a["M"])(Object(a["h"])("input",{type:"number",id:"limit","onUpdate:modelValue":t[16]||(t[16]=function(e){return r.limitField=e}),class:"form-control limit"},null,512),[[a["I"],r.limitField]]),Object(a["h"])("button",{class:"btn btn-outline-primary navButton",disabled:!r.next,onClick:t[17]||(t[17]=function(e){return c.send(r.next)})},Object(a["F"])(e.$t("next")),9,["disabled"])])):Object(a["f"])("",!0),Object(a["h"])(l)])}var Q=n("5530"),G=(n("4de4"),n("ac1f"),n("1276"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("b0c0"),n("841c"),n("bc3a")),Z=n.n(G),H=n("d45f"),Y=n("5502"),X=(n("a15b"),n("d81d"),Object(a["P"])("data-v-89a56e0a"));Object(a["x"])("data-v-89a56e0a");var ee={scope:"col"},te={scope:"col"},ne={scope:"col"},ae={scope:"col"},oe={scope:"col"},re={scope:"row"},ce={scope:"row"},se={scope:"row"},ie={scope:"row"},le={scope:"row"};Object(a["v"])();var ue=X((function(e,t,n,o,r,c){var s=Object(a["D"])("router-link");return Object(a["u"])(),Object(a["e"])("table",{class:"table",id:"table",key:r.renderKey},[Object(a["h"])("thead",null,[Object(a["h"])("tr",null,[Object(a["h"])("th",ee,Object(a["F"])(e.$t("label")),1),Object(a["h"])("th",te,Object(a["F"])(e.$t("title")),1),Object(a["h"])("th",ne,Object(a["F"])(e.$t("author")),1),Object(a["h"])("th",ae,Object(a["F"])(e.$t("keywords")),1),Object(a["h"])("th",oe,Object(a["F"])(e.$t("written")),1)])]),Object(a["h"])("tbody",null,[(Object(a["u"])(!0),Object(a["e"])(a["a"],null,Object(a["B"])(c.entriesWithAuthor,(function(e){return Object(a["u"])(),Object(a["e"])("tr",{key:e.legacy_pk},[Object(a["h"])("td",re,Object(a["F"])(e.display_label),1),Object(a["h"])("td",ce,[Object(a["h"])(s,{to:{name:"Detail",params:{id:c.getIdFromUrl(e.url)}}},{default:X((function(){return[Object(a["g"])(Object(a["F"])(e.text.title),1)]})),_:2},1032,["to"])]),Object(a["h"])("td",se,Object(a["F"])(e.autorLocale?c.localeAuthors(e.autorLocale).join(", "):""),1),Object(a["h"])("td",ie,Object(a["F"])(e.key_word.map((function(e){return e.stichwort})).join(", ")),1),Object(a["h"])("td",le,Object(a["F"])(e.text.start_date||"unknown")+" - "+Object(a["F"])(e.text.end_date||"unknown"),1)])})),128))])])})),de=(n("466d"),{name:"DataTable",data:function(){return{authorObj:{},renderKey:0}},props:["data"],computed:Object(Q["a"])(Object(Q["a"])({},Object(Y["b"])(["getResults"])),{},{entries:function(){return this.data||this.getResults("passage")},entriesWithAuthor:function(){for(var e=this.entries,t=0;t<this.entries.length;t+=1){var n;e[t].autorLocale=this.authorObj[null===(n=e[t])||void 0===n?void 0:n.url]}return e}}),methods:Object(Q["a"])(Object(Q["a"])({},Object(Y["c"])(["addAuthorsToPassages"])),{},{getIdFromUrl:function(e){return e.match(/(\d+)/)[0]},localeAuthors:function(e){var t=this;return e?e.map((function(e){return e[t.$i18n.locale]})):[]},addAuthors:function(){var e=this;if(this.entries.length)for(var t=function(t){var n=e.entries[t].text.autor;e.authorObj[e.entries[t].url]=[];for(var a=0;a<n.length;a+=1)Z()(n[a]).then((function(n){console.log("Autor",n.data),e.authorObj[e.entries[t].url].push({de:n.data.name,en:n.data.name_en,fr:n.data.name_fr,gr:n.data.name_gr,it:n.data.name_it,lat:n.data.name_lat}),e.renderKey-=-1})).catch((function(e){console.log(e)}))},n=0;n<this.entries.length;n+=1)t(n)}}),watch:{entries:function(){this.addAuthors()}}}),_e=(n("31c6"),function(e){e.__i18n=e.__i18n||[],e.__i18n.push({locale:"",resource:{en:{label:e=>{const{normalize:t}=e;return t(["Label"])},title:e=>{const{normalize:t}=e;return t(["Title"])},author:e=>{const{normalize:t}=e;return t(["Author"])},keywords:e=>{const{normalize:t}=e;return t(["Associated Keywords"])},written:e=>{const{normalize:t}=e;return t(["Written"])}},de:{label:e=>{const{normalize:t}=e;return t(["Label"])},title:e=>{const{normalize:t}=e;return t(["Titel"])},author:e=>{const{normalize:t}=e;return t(["Autor"])},keywords:e=>{const{normalize:t}=e;return t(["Stichwörter"])},written:e=>{const{normalize:t}=e;return t(["Geschrieben"])}}}})});de.render=ue,de.__scopeId="data-v-89a56e0a","function"===typeof _e&&_e(de);var be=de,he=Object(a["P"])("data-v-eeadab2c"),pe=he((function(e,t,n,o,r,c){var s=Object(a["D"])("visualization"),i=Object(a["D"])("node-details");return Object(a["u"])(),Object(a["e"])("div",null,[Object(a["h"])(s,{graph:e.getResults("keyword"),onNodeClick:c.nodeClick,height:"500"},null,8,["graph","onNodeClick"]),Object(a["h"])("p",null,[e.getDetails("keyword").id?(Object(a["u"])(),Object(a["e"])(i,{key:0})):Object(a["f"])("",!0)])])})),fe=n("3fbb"),Oe={class:"card"},je={class:"card-header"},me={key:0,class:"badge badge-pill badge-primary"},ge={class:"card-header list"},ye={key:0,class:"badge badge-pill badge-primary"};function ve(e,t,n,o,r,c){var s=Object(a["D"])("data-table");return Object(a["u"])(),Object(a["e"])("div",null,[Object(a["h"])("div",Oe,[Object(a["h"])("div",je,[Object(a["h"])("h1",null,[Object(a["g"])(Object(a["F"])(c.removeRoot(e.getDetails("keyword").label))+" ",1),r.count&&!r.countLoading?(Object(a["u"])(),Object(a["e"])("span",me,Object(a["F"])(r.count),1)):Object(a["f"])("",!0)])])]),(Object(a["u"])(!0),Object(a["e"])(a["a"],null,Object(a["B"])(c.connections,(function(t,n){return Object(a["u"])(),Object(a["e"])("div",null,[(Object(a["u"])(),Object(a["e"])("div",{class:"card",key:t.label+n,"data-toggle":"collapse","data-target":"#".concat(t.label+n)},[Object(a["h"])("div",ge,[Object(a["g"])(Object(a["F"])(c.removeRoot(e.getDetails("keyword").label))+" ↔ "+Object(a["F"])(c.removeRoot(t.label))+" ",1),r.crossKeywordData[t.id]?(Object(a["u"])(),Object(a["e"])("span",ye,Object(a["F"])(r.crossKeywordData[t.id].count),1)):Object(a["f"])("",!0)])],8,["data-target"])),Object(a["h"])("div",{class:"card-body collapse",id:t.label+n},[r.crossKeywordData[t.id]?(Object(a["u"])(),Object(a["e"])(s,{key:0,data:r.crossKeywordData[t.id].results},null,8,["data"])):Object(a["f"])("",!0)],8,["id"])])})),256))])}var we=n("2909"),ke=(n("5319"),n("99af"),n("6062"),{data:function(){return{count:0,crossKeywordData:{},countLoading:!1,connections:[]}},components:{DataTable:be},methods:{removeRoot:function(e){return e?e.split(",")[0]:""},removeStringFromID:function(e){return e?e.replace("archiv__keyword__",""):""},getConnectedNodesFromId:function(e){var t,n=this;console.count("getConnectedNodesFromId");var a=this.getResults("keyword").edges.filter((function(t){return t.source.id==e||t.target.id==e})),o=a.map((function(e){return[e.source,e.target]}));return o=(t=[]).concat.apply(t,Object(we["a"])(o)),o=Object(we["a"])(new Set(o)),o=o.filter((function(e){return e!=n.getDetails("keyword").label})),this.getKeywordCount(),console.log("nodes",o),o},getKeywordCount:function(){var e=this;this.getDetails("keyword").id&&Z()("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/",{params:{key_word:this.removeStringFromID(this.getDetails("keyword").id)}}).then((function(t){console.log("getKeywordCount",t.data.count),e.countLoading=!1,e.count=t.data.count})).catch((function(e){console.log(e)}))},getCrossKeywordData:function(e){var t=this;if("string"!=typeof e){for(var n="https://mmp.acdh-dev.oeaw.ac.at/api/stelle/",a=0;a<e.length;a+=1)n+=0==a?"?":"&",n+="key_word=".concat(this.removeStringFromID(e[a]));Z()(n).then((function(n){console.log("cross",n),t.crossKeywordData[e[0]]=n.data})).catch((function(e){console.log(e)}))}else this.getCrossKeywordData([e,this.getDetails("keyword").id])}},computed:Object(Q["a"])(Object(Q["a"])({},Object(Y["b"])(["getResults","getDetails"])),{},{connections:function(){return this.getConnectedNodesFromId(this.getDetails("keyword").id)}}),updated:function(){for(var e=this.getConnectedNodesFromId(this.getDetails("keyword").id),t=0;t<e.length;t+=1){var n;null!==(n=this.crossKeywordData[e[t].id])&&void 0!==n&&n.count||this.getCrossKeywordData(e[t].id)}},watch:{}});n("74fc");ke.render=ve;var De=ke,Ee={components:{Visualization:fe["a"],NodeDetails:De},methods:Object(Q["a"])(Object(Q["a"])({},Object(Y["c"])(["setDetails"])),{},{nodeClick:function(e){console.log("node clicked",e),this.debounce(this.setDetails({name:"keyword",obj:e}),500)},debounce:function(e,t){var n,a=this;return function(){for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];clearTimeout(n),n=setTimeout((function(){e.apply(a,r)}),t)}}}),computed:Object(Q["a"])({},Object(Y["b"])(["getResults","getDetails"]))};Ee.render=pe,Ee.__scopeId="data-v-eeadab2c";var Pe=Ee,Ce=n("54d9"),Me={name:"Search",data:function(){return{input:"",keyInput:"",mapInput:"",selectedUseCase:{},keywordArr:[],keywordObj:[],keywordType:"",loading:!1,count:0,init:!0,next:null,previous:null,limit:20,limitField:20,advanced:!1}},props:{offsetProp:{type:String,default:"20"}},components:{DataTable:be,VisComponent:Pe,Leaflet:Ce["a"],VueBootstrapTypeahead:H["a"]},methods:Object(Q["a"])(Object(Q["a"])({},Object(Y["c"])(["setResults","addAuthorsToPassages"])),{},{getIdFromUrl:function(e){return parseInt(e.split("/").filter((function(e){return parseInt(e)}))[0])},getCompNameFromType:function(e){var t={stelle:"DataTable",keyword:"VisComponent",map:"Places"};return t[e]},send:function(e){var t=this,n="string"==typeof e;if(this.loading=!0,n){console.log(e);var a=new URLSearchParams(e);this.offset=a.get("offset")||0}else this.limit=parseInt(this.limitField),this.offset=0;(n?Z()(e):Z()("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/",{params:{format:"json",zitat_lookup:"icontains",zitat:this.input,limit:this.limit,use_case:this.advanced&&this.selectedUseCase?this.selectedUseCase.id:void 0}})).then((function(e){console.log(e.data),t.count=e.data.count,t.setResults({name:"passage",arr:e.data.results}),t.next=e.data.next,t.previous=e.data.previous,t.loading=!1})).catch((function(e){console.log(e),t.loading=!1}))},keywordSendWithAuthor:function(){var e=this;this.loading=!0,Z()("https://mmp.acdh-dev.oeaw.ac.at/api/autor/",{params:{name:this.keywordAuthor,name_en:this.keywordAuthor,name_lookup:"icontains",name_en_lookup:"icontains"}}).then((function(t){console.log("author",t.data),e.keywordSend(e.getIdFromUrl(t.data.results[0].url))})).catch((function(t){console.log(t),e.loading=!1}))},keywordSend:function(e){var t=this;this.loading=!0;var n={stichwort:this.keyInput||void 0,stichwort_lookup:"icontains",art:this.keywordType||void 0,rvn_stelle_key_word_keyword__text__autor:e||void 0};Z()("https://mmp.acdh-dev.oeaw.ac.at/archiv/keyword-data/",{params:n}).then((function(e){console.log(e.data),t.setResults({name:"keyword",arr:e.data}),t.loading=!1})).catch((function(e){console.log(e),t.loading=!1}))},mapSend:function(){var e=this;this.loading=!0,Z()("https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/",{params:{format:"json"}}).then((function(t){console.log(t.data),e.setResults({name:"map",arr:t.data}),e.loading=!1})).catch((function(t){console.log(t),e.loading=!1}))},enterQuery:function(){this.$router.push({name:this.getCompNameFromType(this.type),params:{search:"DataTable"==this.type?this.input:this.keyInput,offsetProp:this.offset}}),this.init=!1,console.log("keywordAuthor",this.keywordAuthor),"DataTable"==this.type?this.send():"Places"==this.type?this.mapSend():"VisComponent"==this.type&&this.keywordAuthor?this.keywordSendWithAuthor():this.keywordSend()},getKeywords:function(){var e=this;console.log("useCaseInput",this.useCaseInput),Z()("https://mmp.acdh-dev.oeaw.ac.at/archiv-ac/usecase-autocomplete/",{params:{q:this.useCaseInput}}).then((function(t){console.log("keyword auto",t.data),e.keywordObj=t.data.results})).catch((function(e){console.log(e)}))}}),computed:Object(Q["a"])(Object(Q["a"])({},Object(Y["b"])(["getResults"])),{},{useCaseInput:function(){var e;return null===(e=this.$refs.useCaseRef)||void 0===e?void 0:e.inputValue},type:function(){return console.log(this.$route),this.$route.name}}),mounted:function(){this.offsetProp&&(this.offset=parseInt(this.offsetProp)),this.$route.params.search&&(this.init=!1,"DataTable"==this.type?(this.input=this.$route.params.search,this.send()):(this.keyInput=this.$route.params.search,this.keywordSend()))}},Le=(n("5fa8"),function(e){e.__i18n=e.__i18n||[],e.__i18n.push({locale:"",resource:{en:{all:e=>{const{normalize:t}=e;return t(["All"])},author:e=>{const{normalize:t}=e;return t(["Author"])},stelle:e=>{const{normalize:t}=e;return t(["Passage"])},keywords:e=>{const{normalize:t}=e;return t(["Keywords"])},Schlagwort:e=>{const{normalize:t}=e;return t(["Keyword"])},Eigenname:e=>{const{normalize:t}=e;return t(["Proper Name"])},advancedSearch:e=>{const{normalize:t}=e;return t(["Advanced Search"])},query:e=>{const{normalize:t}=e;return t(["Please insert search query"])},loading:e=>{const{normalize:t}=e;return t(["loading"])},results:e=>{const{normalize:t}=e;return t(["results found, showing"])},keyResults:e=>{const{normalize:t,interpolate:n,named:a}=e;return t([n(a("nodes"))," nodes and ",n(a("edges"))," edges found!"])},mapResults:e=>{const{normalize:t}=e;return t(["locations found"])},noResults:e=>{const{normalize:t}=e;return t(["No results"])},resultsperPage:e=>{const{normalize:t}=e;return t(["Results per page"])},previous:e=>{const{normalize:t}=e;return t(["Previous"])},next:e=>{const{normalize:t}=e;return t(["Next"])},datatable:e=>{const{normalize:t}=e;return t(["Data Table"])},visualization:e=>{const{normalize:t}=e;return t(["Visualization"])},map:e=>{const{normalize:t}=e;return t(["Map"])}},de:{all:e=>{const{normalize:t}=e;return t(["Alle"])},author:e=>{const{normalize:t}=e;return t(["Autor"])},stelle:e=>{const{normalize:t}=e;return t(["Stelle"])},keywords:e=>{const{normalize:t}=e;return t(["Stichwörter"])},Schlagwort:e=>{const{normalize:t}=e;return t(["Schlagwort"])},Eigenname:e=>{const{normalize:t}=e;return t(["Eigenname"])},advancedSearch:e=>{const{normalize:t}=e;return t(["Erweiterte Suche"])},query:e=>{const{normalize:t}=e;return t(["Bitte Suchbegriff eingeben"])},loading:e=>{const{normalize:t}=e;return t(["lädt"])},results:e=>{const{normalize:t}=e;return t(["Ergebnisse gefunden, zeige"])},keyResults:e=>{const{normalize:t,interpolate:n,named:a}=e;return t([n(a("nodes"))," Knoten und ",n(a("edges"))," Verbindungen gefunden!"])},mapResults:e=>{const{normalize:t}=e;return t(["Orte gefunden"])},noResults:e=>{const{normalize:t}=e;return t(["Keine Suchergebnisse"])},resultsperPage:e=>{const{normalize:t}=e;return t(["Ergebnisse pro Seite"])},previous:e=>{const{normalize:t}=e;return t(["Vorherige"])},next:e=>{const{normalize:t}=e;return t(["Nächste"])},datatable:e=>{const{normalize:t}=e;return t(["Tabelle"])},visualization:e=>{const{normalize:t}=e;return t(["Visualisierung"])},map:e=>{const{normalize:t}=e;return t(["Karte"])}}}})});Me.render=J,"function"===typeof Le&&Le(Me);var Te=Me,ze={name:"App",components:{NavBar:y,Search:Te}};n("775b");ze.render=r;var Ae=ze,Ie=n("6c02"),Ke=(n("b64b"),Object(a["P"])("data-v-ecb57fca"));Object(a["x"])("data-v-ecb57fca");var Re={class:"container"},Fe={class:"table",id:"table"},Se=Object(a["h"])("th",{scope:"col"},"Name",-1),xe={scope:"col"},$e={scope:"row"},Ue={scope:"row"},Be={class:"row"},We={key:0,class:"leaflet col-sm-6"},Ne={class:"visualization col-sm-6"},Ve={class:"buttonContainer"},qe={key:0};Object(a["v"])();var Je=Ke((function(e,t,n,o,r,c){var s=Object(a["D"])("leaflet"),i=Object(a["D"])("visualization");return Object(a["u"])(),Object(a["e"])("div",Re,[Object(a["h"])("table",Fe,[Object(a["h"])("thead",null,[Object(a["h"])("tr",null,[Se,Object(a["h"])("th",xe,Object(a["F"])(e.$t("content")),1)])]),Object(a["h"])("tbody",null,[(Object(a["u"])(!0),Object(a["e"])(a["a"],null,Object(a["B"])(Object.keys(c.filteredObject),(function(e){return Object(a["u"])(),Object(a["e"])("tr",null,[Object(a["h"])("td",$e,Object(a["F"])(e),1),Object(a["h"])("td",Ue,Object(a["F"])(Array.isArray(c.filteredObject[e])?c.filteredObject[e].join(", "):c.filteredObject[e]),1)])})),256))])]),Object(a["h"])("div",Be,[c.geoDataExists?(Object(a["u"])(),Object(a["e"])("div",We,[Object(a["h"])(s,{data:r.geoJson},null,8,["data"])])):Object(a["f"])("",!0),Object(a["h"])("div",Ne,[Object(a["h"])(i,{graph:r.graph,height:"500"},null,8,["graph"])])]),Object(a["h"])("div",Ve,[Object(a["h"])("button",{class:"btn btn-primary",onClick:t[1]||(t[1]=function(e){return r.fullObject=!r.fullObject})},Object(a["F"])(r.fullObject?e.$t("hideJson"):e.$t("showJson")),1)]),r.fullObject?(Object(a["u"])(),Object(a["e"])("pre",qe,"      "+Object(a["F"])(JSON.stringify(r.detailObject,null,"\t"))+"\r\n    ",1)):Object(a["f"])("",!0)])})),Qe=n("d799"),Ge=(n("28c9"),function(e){e.__i18n=e.__i18n||[],e.__i18n.push({locale:"",resource:{en:{content:e=>{const{normalize:t}=e;return t(["Content"])},showJson:e=>{const{normalize:t}=e;return t(["Show full JSON Object"])},hideJson:e=>{const{normalize:t}=e;return t(["Hide full JSON Object"])}},de:{content:e=>{const{normalize:t}=e;return t(["Inhalt"])},showJson:e=>{const{normalize:t}=e;return t(["Ganzes JSON Objekt anzeigen"])},hideJson:e=>{const{normalize:t}=e;return t(["Ganzes JSON Objekt verbergen"])}}}})});Qe["a"].render=Je,Qe["a"].__scopeId="data-v-ecb57fca","function"===typeof Ge&&Ge(Qe["a"]);var Ze=Qe["a"],He=[{path:"/",redirect:"/en/search/stelle"},{path:"/:locale/",name:"Locale",component:{template:"<router-view></router-view>"},redirect:"/:locale/search/stelle",children:[{path:"search",component:Te,name:"Search",children:[{path:"stelle/:search?",name:"DataTable",component:be},{path:"keyword/:search?",name:"VisComponent",component:Pe},{path:"map/:search?",name:"Places",component:Ce["a"]}]},{path:"detail/:id",name:"Detail",component:Ze}]}],Ye=Object(Ie["a"])({history:Object(Ie["b"])(),routes:He}),Xe=Ye,et=n("47e2"),tt=Object(et["a"])({locale:"en",fallbackLocale:"de"}),nt=Object(Y["a"])({state:{lang:"en",results:{passage:[],keyword:{nodes:[],edges:[],types:{nodes:[],edges:[]}},map:{type:"FeatureCollection",features:[]}},details:{passage:{},keyword:{}}},getters:{getLang:function(e){return e.lang},getResults:function(e){return function(t){return e.results[t]}},getDetails:function(e){return function(t){return e.details[t]}}},mutations:{setLang:function(e,t){return e.lang=t},setResults:function(e,t){var n=t.name,a=t.arr;console.log(e,n,a),e.results[n.toLowerCase()]=a},setDetails:function(e,t){var n=t.name,a=t.obj;console.log(e,n,a),e.details[n]=a},addAuthorsToPassages:function(e,t){var n=t.loc,a=t.obj;console.log("addAuthorsToPassages",e,n,a),e.results.passage[n].autorLocale?e.results.passage[n].autorLocale.push(a):e.results.passage[n].autorLocale=[a]}}});Object(a["d"])(Ae).use(tt).use(Xe).use(nt).mount("#app")},5804:function(e,t,n){"use strict";n("f809")},"5fa8":function(e,t,n){"use strict";n("0f22")},"64d2":function(e,t,n){},"6faa":function(e,t,n){},"74fc":function(e,t,n){"use strict";n("64d2")},"775b":function(e,t,n){"use strict";n("fc13")},"8e40":function(e,t){e.exports={attributes:[{name:{en:"Quote",de:"Zitat"},attr:"zitat"},{name:{en:"Title",de:"Titel"},attr:"text.title"},{name:{en:"Cited",de:"Zitatstelle"},attr:"zitat_stelle"},{name:{en:"Summary",de:"Zusammenfassung"},attr:"summary"},{name:{en:"Author",de:"Autor"},attr:"text.autor"},{name:{en:"Place",de:"Ort"},attr:"text.ort"},{name:{en:"Edition",de:"Auflage"},attr:"text.edition"},{name:{en:"Start date",de:"Beginndatum"},attr:"text.start_date"},{name:{en:"End date",de:"Enddatum"},attr:"text.end_date"},{name:{en:"Translation",de:"Übersetzung"},attr:"translation"},{name:{en:"Keywords",de:"Stichwörter"},attr:"key_word"},{name:{en:"Comment",de:"Kommentar"},attr:"kommentar"}]}},"91ee":function(e,t,n){"use strict";n("0197")},d799:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("b0c0"),core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("7db0"),core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("b64b"),core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("d81d"),core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("caad"),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("2532"),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__),axios__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("bc3a"),axios__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__),_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("8e40"),_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7__),_Visualization2D__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("3fbb"),_Leaflet__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("54d9");__webpack_exports__["a"]={name:"PasssageDetails",data:function(){return{detailObject:{},fullObject:!1,graph:{nodes:[],edges:[],types:{nodes:[],edges:[]}},geoJson:{type:"FeatureCollection",features:[]}}},components:{Visualization:_Visualization2D__WEBPACK_IMPORTED_MODULE_8__["a"],Leaflet:_Leaflet__WEBPACK_IMPORTED_MODULE_9__["a"]},methods:{getLocaleKeyFromEn:function(e){return _passsageDetails_config__WEBPACK_IMPORTED_MODULE_7___default.a.attributes.find((function(t){return t.name.en==e})).name[this.$i18n.locale]},getDetails:function(e){var t=this;axios__WEBPACK_IMPORTED_MODULE_6___default()("https://mmp.acdh-dev.oeaw.ac.at/api/stelle/".concat(e),{params:{format:"json"}}).then((function(e){console.log("Stelle",e.data),t.detailObject=e.data})).catch((function(e){console.log(e)}))},getKeywordGraph:function(e){var t=this;axios__WEBPACK_IMPORTED_MODULE_6___default()("https://mmp.acdh-dev.oeaw.ac.at/archiv/keyword-data/",{params:{rvn_stelle_key_word_keyword:e}}).then((function(e){t.graph=e.data})).catch((function(e){console.log(e)}))},getLocaleName:function(e){return"de"!=this.$i18n.locale&&e["name_".concat(this.$i18n.locale)]?e["name_".concat(this.$i18n.locale)]:e.name_antik||e.name},getGeoJson:function(e){var t=this;axios__WEBPACK_IMPORTED_MODULE_6___default()("https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/",{params:{format:"json",stelle:e}}).then((function(e){console.log("geojson",e.data),t.geoJson=e.data})).catch((function(e){console.log(e)}))}},computed:{graphWidth:function(){var e;return null===(e=this.$refs.table)||void 0===e?void 0:e.width},geoDataExists:function(){return this.geoJson.count&&this.geoJson.features[0].geometry},filteredObject:function filteredObject(){var _this4=this,retObj={},obj=this.detailObject;if(!Object.keys(obj).length)return retObj;for(var i=0;i<_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7___default.a.attributes.length;i+=1)retObj[_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7___default.a.attributes[i].name[this.$i18n.locale]]=eval("obj.".concat(_passsageDetails_config__WEBPACK_IMPORTED_MODULE_7___default.a.attributes[i].attr));for(var authorLocale=this.getLocaleKeyFromEn("Author"),_loop=function(e){retObj[authorLocale][e].includes("https://")&&axios__WEBPACK_IMPORTED_MODULE_6___default()(retObj[authorLocale][e]).then((function(t){retObj[authorLocale][e]=_this4.getLocaleName(t.data)})).catch((function(e){console.log(e)}))},_i=0;_i<retObj[authorLocale].length;_i+=1)_loop(_i);for(var placeLocale=this.getLocaleKeyFromEn("Place"),_loop2=function(e){retObj[placeLocale][e].includes("https://")&&axios__WEBPACK_IMPORTED_MODULE_6___default()(retObj[placeLocale][e]).then((function(t){retObj[placeLocale][e]=_this4.getLocaleName(t.data)})).catch((function(e){console.log(e)}))},_i2=0;_i2<retObj[placeLocale].length;_i2+=1)_loop2(_i2);var keywordsLocale=this.getLocaleKeyFromEn("Keywords");return retObj[keywordsLocale]=retObj[keywordsLocale].map((function(e){return e.stichwort})),retObj}},mounted:function(){var e=this.$route.params.id;console.log("stelle",e),this.getDetails(e),this.getKeywordGraph(e),this.getGeoJson(e)}}},e486:function(e,t,n){},eadc:function(e,t,n){e.exports=n.p+"img/fundament_logo.6e8c6e01.svg"},f809:function(e,t,n){},fc13:function(e,t,n){}});
//# sourceMappingURL=app.12635afd.js.map