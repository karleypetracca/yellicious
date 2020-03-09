const express = require('express'),
  router = express.Router();
  reviewModel = require('../models/reviewmodel');


// get home/restaurant page
router.get('/', async (req, res) => {
  let restaurantData = [], avgStars = "";
  restaurantData = await reviewModel.getAllRestaurant();

  res.render('template', {
    locals: {
      title: 'Yellicious',
      sessionData: req.session,
      restaurantData: restaurantData,
      avgStars: avgStars
    },
    partials: {
      partial: 'partial-index'
    }
  });
});


// get restaurant/individual restaurant page
router.get('/restaurant/:id?', async (req, res) => {
  const { id } = req.params;
  let restaurantData = [], reviewData = [], avgStars = "", partial = "";

  if (!!id) {
    restaurantData = await reviewModel.getOneRestaurant(id);
    reviewData = await reviewModel.getOne(id);
    avgStars = await reviewModel.getOneAvgStars(id);
    partial = 'partial-id';
  } else {
    restaurantData = await reviewModel.getAllRestaurant();
    partial = 'partial-index';
  }

  res.render('template', {
    locals: {
      title: 'Yellicious',
      sessionData: req.session,
      restaurantData: restaurantData,
      reviewData: reviewData,
      avgStars: avgStars
    },
    partials: {
      partial: partial
    }
  });
});


// add review to individual restaurant
router.post('/restaurant/review', async (req, res) => {
  const { reviewer_id, restaurant_id, review_title, review_stars, review_review } = req.body;
  
  let postData = await reviewModel.newReview(reviewer_id, restaurant_id, review_title, review_stars, review_review);
  
  res.redirect(`/restaurant/${restaurant_id}`);
});


module.exports = router;
