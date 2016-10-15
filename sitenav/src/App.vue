<template>
  <div id="app">

    <h2 class="title">个人收藏夹网站导航</h2>

    <div v-for="item in items">

      <h3 class="class-name">{{ item.class_name}}</h3>

      <div class="nav-item">
        <a v-for="tag in item.tags" @click="openLink(tag.link)">{{tag.sub_name}}</a>
      </div>

    </div>

  </div>
</template>


<style>

  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

  html {
    height: 100%;
  }

  body {
    padding: 1.5rem;
  }

  .title {
    text-align: center;
  }

  .class-name {
    font-size: 3rem;
  }

  .nav-item {
  }

  .nav-item a {
    margin-right: 1rem;
    cursor: pointer;
    font-size: 2rem;
    line-height: 2.4rem;
  }

</style>

<script>

  import $jq from '../node_modules/jquery/dist/jquery.min';

  export default {

    data(){
      return {
        items: [],
        isLoading: true,
        checked: true
      }
    },
    asyncData: function () {
      var self = this;
      return $jq.get('/static/sitenav.json')
        .then(
          function (data) {
            self.isLoading = false;
            return {
              items: data
            }
          },
          function (error) {
            self.isLoading = false;
          });
    },
    methods: {
      openLink(link){
        window.location.href = link;
      }
    }
  }
</script>

