const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const { formatDate } = require('../utils/helpers');


router.get('/', async (req, res) => {
  try {
    // Fetch user data along with their associated posts
    const userData = await User.findAll({
      attributes: ['id', 'username'], // Only select necessary attributes
      order: [['username', 'ASC']],
      include: [
        {
          model: Post, // Include the Post model
          attributes: ['id', 'title', 'body', 'date'], // Only select necessary attributes
          // where: { userId: Sequelize.col('user.id') } // Filter posts by user ID
        }
      ]
    });

    // Convert Sequelize instances to plain objects and format dates
    const users = userData.map((user) => {
      const userDataPlain = user.get({ plain: true });
      const posts = user.posts.map((post) => {
        const postPlain = post.get({ plain: true });
        postPlain.date = formatDate(new Date(postPlain.date));
        return postPlain;
      });
      return {
        ...userDataPlain,
        posts,
      };
    });
  
  console.log(JSON.stringify(users, null, 2));
  

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
module.exports = router;