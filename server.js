/*
 * Initialise Express
 */
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

/*
 * Initialise Pusher
 */
const Pusher = require('pusher');
const pusher = new Pusher({
  appId:'1491469',
  key:'ab459c6560b738a5ddc5',
  secret:'80e0de70469b1098da3a',
  cluster:'ap1'
});

/*
 * Define post route for creating new reviews
 */
app.post('/review', (req, res) => {
  pusher.trigger('reviews', 'review_added', {review: req.body});
  console.log(res.body)
  res.status(200).send();
});

/*
 * Run app
 */
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});
