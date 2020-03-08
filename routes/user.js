const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  userModel = require('../models/usermodel');


// get login page
router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Yellicious'
    },
    partials: {
      partial: 'partial-login'
    }
  });

});


// post to login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = new userModel(null, null, email, password);
  const loginResponse = await user.loginUser();

  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.userId = loginResponse.userId;
    req.session.name = loginResponse.name;
    res.status(200).redirect('/');
  } else {
    res.status(403).redirect('/login');
  }
});


// get signup page
router.get('/signup', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Yellicious'
    },
    partials: {
      partial: 'partial-signup'
    }
  });

});


// post to signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new userModel(null, name, email, hash);
  user.addUser();

  res.status(200).redirect('/');
});


module.exports = router;
