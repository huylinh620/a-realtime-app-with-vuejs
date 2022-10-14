<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="fetchMovie()">
        <div class="columns large-8">
          <input type="text" v-model="title">
        </div>
        <div class="columns large-4">
          <button type="submit" :disabled="!title" class="button expanded">
            Search titles
          </button>
        </div>
      </form>
    </div>

    <template v-if="loading" class="align-center">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="loader">
    </template>

    <div v-else-if="error_message">
      <h3>{{ error_message }}</h3>
    </div>

    <div class="row" v-else-if="Object.keys(movie).length !==0" id="movie">
      <div class="columns small-7">
        <h4>{{movie.name}}</h4>
        <img :src="movie.image.original" :alt="movie.name">
      </div>
      <div class="columns small-5">
        <p v-html="movie.summary"></p>
        <small><strong>Premiered:</strong> {{ movie.premiered }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../bus'

const API_URL = 'https://api.tvmaze.com/singlesearch/shows'

function builUrl (title) {
  return `${API_URL}?q=${title}`
}

export default {
  name: 'movie',
  data () {
    return {
      title: '',
      error_message: '',
      loading: false,
      movie: {}
    }
  },
  methods: {
    fetchMovie () {
      let title = this.title
      if (!title) {
        alert('plesea enter a title to search for')
        return
      }
      this.loading = true
      fetch(builUrl(title))
        .then(reponse => reponse.json())
        .then(data => {
          this.loading = false
          this.error_message = ''
          bus.$emit('new_movie', data.id)
          this.movie = data
        }).catch((e) => {
          this.error_message = `Sorry, move with '${title}' no found. Try searching for "Fairy tail" or "The boondocks" instead.`
          return e
        })
    }
  }
}
</script>

<style>
  #movie {
    margin: 30px 0;
  }
</style>
