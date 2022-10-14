<template>
  <div class="container">
    <h4 class="uppercase">Reviews</h4>
    <div class="review" v-for="(review, index) in reviews" :key="index">
      <p>{{ review.content }}</p>
      <div class="row">
        <div class="columns medium-7">
          <h5>{{ review.reviewer }}</h5>
        </div>
        <div class="columns medium-5">
          <h5 class="pull-right">{{ review.time }}</h5>
        </div>
      </div>
    </div>

    <div class="review-form" v-if="movie">
      <h5>Add new review</h5>
      <form @submit.prevent="addReview">
        <label>
          Review
          <textarea v-model="review.content" cols="30" rows="10"></textarea>
        </label>
        <label>
          Name
          <input v-model="review.reviewer" type="text">
        </label>
        <button :disabled="!review.reviewer || !review.content" type="submit" class="button expanded">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js'
import bus from '../bus'

const MOCK_REVIEWS = [
  {
    movie_id: 975,
    content: 'Great show! I loved every single scene. Defintiely a must watch!',
    reviewer: 'Huy Linh',
    time: new Date().toLocaleDateString()
  }
]

export default {
  name: 'reviews',
  data () {
    return {
      mockReviews: MOCK_REVIEWS,
      movie: null,
      review: {
        content: '',
        reviewer: ''
      }
    }
  },
  created () {
    bus.$on('new_movie', movieId => {
      this.movie = movieId
    })
    this.subscribe()
  },
  methods: {
    addReview () {
      if (!this.movie || !this.review.reviewer || !this.review.content) {
        return
      }
      let review = {
        movie_id: this.movie,
        content: this.review.content,
        reviewer: this.review.reviewer,
        time: new Date().toLocaleDateString()
      }
      fetch('api/review', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      }).then(() => {
        this.review.content = this.review.reviewer = ''
      })
    },

    subscribe () {
      let pusher = new Pusher('ab459c6560b738a5ddc5', { cluster: 'ap1' })
      pusher.subscribe('reviews')
      pusher.bind('review_added', data => {
        this.mockReviews.unshift(data.review)
        console.log(this.mockReviews)
      })
    }
  },
  computed: {
    reviews () {
      return this.mockReviews.filter(review => {
        return review.movie_id === this.movie
      })
    }
  }
}
</script>

<style  scoped>
  .container {
    padding: 0 20px;
  }
  .review {
    border:1px solid #ddd;
    font-size: 0.95em;
    padding: 10px;
    margin: 15px 0 5px 0;
  }
  .review h5 {
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 0.7em
  }
  .pull-right {
    float: right;
  }
  .review-form {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding: 15px 0 0 0;
  }
</style>
