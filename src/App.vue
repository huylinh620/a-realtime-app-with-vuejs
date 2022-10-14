<template>
  <div id="app">
    <div class="container">
      <div class="heading">
        <h2>Search Movie App using <a :href="'https://www.tvmaze.com/api'">TVMAZE API</a></h2>
        <h6 class="subheader">Realtime movie reviews with Vue.js and Pusher.</h6>
      </div>
      <div class="row">
        <div class="columns small-7">
          <Movie/>
        </div>
        <div class="columns small-5">
          <Reviews/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Movie from './components/Movie'
import Reviews from './components/Reviews'

export default {
  name: 'App',
  components: {
    Movie,
    Reviews
  }
}
</script>

<style>
#app .heading {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}
</style>
