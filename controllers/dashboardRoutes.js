const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {  
    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  });

  module.exports = router;