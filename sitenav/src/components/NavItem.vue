<template>
  <div class="nav-item">
    <h1>{{ data.class_name}}</h1>

    <div v-for="tag in data.tags">
      <a href="tag.link">{{tag.sub_name}}</a>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    }
  }
</script>

