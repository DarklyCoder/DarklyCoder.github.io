import Vue from 'vue'
import VueAsyncData from 'vue-async-data'
import App from './App'

Vue.use(VueAsyncData)


new Vue({
  el: 'body',
  components: {App}
})
