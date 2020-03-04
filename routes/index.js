const express = require('express'),
  router = express.Router();
  reviewModel = require('../models/reviewmodel');


/* GET home page. */
router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  let restaurantData = [], reviewData = [], avgStarsString = "", partial = "";

  if (!!id) {
    restaurantData = await reviewModel.getOneRestaurant(id);
    reviewData = await reviewModel.getOne(id);
    avgStarsString = await reviewModel.getOneAvgStars(id);
    partial = 'partial-id';
  } else {
    restaurantData = await reviewModel.getAllRestaurant();
    partial = 'partial-index';
  }

  res.render('template', {
    locals: {
      title: 'Yellicious',
      restaurantData: restaurantData,
      reviewData: reviewData,
      avgStarsString: avgStarsString
    },
    partials: {
      partial: partial
    }
  });
});

router.post('/', async (req, res) => {
  const { reviewer_id, restaurant_id, review_title, review_stars, review_review } = req.body;
  let postData = await reviewModel.newReview(reviewer_id, restaurant_id, review_title, review_stars, review_review);
  console.log(postData);
  res.sendStatus(200);
});

module.exports = router;
