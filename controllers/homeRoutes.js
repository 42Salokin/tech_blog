const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const { formatDate } = require('../utils/helpers');

// On homepage load, finds all users and their associated posts and sends them to the view
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ['id', 'username'], 
      order: [['username', 'ASC']],
      include: [
        {
          model: Post, 
          attributes: ['id', 'title', 'body', 'date'], 
        }
      ]
    });

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

// If login is selected but user is already signed in, redirects to homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// If signup is selected but user is already signed in, redirects to homepage
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Checks logged in status, then sends user to new post page
router.get('/newPost', withAuth, (req, res) => {

  res.render('newPost', {
  logged_in: req.session.logged_in,
});
});

// Receives post ID from dashboard, finds post in db and sends it to edit post view
router.get('/editPost/:id', withAuth, async (req, res) => {
  try {
    // Retrieve the postId from the request parameters
    const id = req.params.id;
    
    // Query the database to find the post by its ID using the Post model
    const postData = await Post.findByPk(id, {
      include: [
        {
        model: User,
        attributes: ['username'],
      }]
    });
    
    if (postData) {
      const post = {
        id: postData.dataValues.id,
        title: postData.dataValues.title,
        username: postData.dataValues.user.dataValues.username,
        date: formatDate(postData.dataValues.date),
        body: postData.dataValues.body,
      }
      console.log(post);
     res.render('editPost', {
        post,
        logged_in: req.session.logged_in,
    }) 
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;