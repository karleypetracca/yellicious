const express = require('express'),
  router = express.Router();
  reviewModel = require('../models/reviewmodel');


/* GET home page. */
router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  if (!!id) {
    restaurantData = await reviewModel.getOneRestaurant(id);
    reviewData = await reviewModel.getOne(id);
  } else {
    restaurantData = await reviewModel.getAllRestaurant();
    reviewData = await reviewModel.getAll();
  }

  res.render('template', {
    locals: {
      title: 'Yellicious',
      restaurantData: restaurantData,
      reviewData: reviewData
    },
    partials: {
      partial: 'partial-index'
    }
  });
});


module.exports = router;
