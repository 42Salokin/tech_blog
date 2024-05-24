const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const { formatDate } = require('../utils/helpers');

  router.get('/', withAuth, async (req, res) => {
    try {
      // Fetch user data along with their associated posts
      const id = req.session.user_id;
      const userData = await User.findByPk(id, {
        include: [
          {
            model: Post, // Include the Post model
            attributes: ['id', 'title', 'body', 'date'], // Only select necessary attributes
            // where: { userId: Sequelize.col('user.id') } // Filter posts by user ID
          }
        ]
      });

      const user = {
        id: userData.dataValues.id,
        username: userData.dataValues.username,
        posts: userData.dataValues.posts.map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          date: formatDate(post.date),
      }))
      }
  
    console.log(user, user.username);
    
      // res.status(200).json(user)
      res.render('dashboard', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;