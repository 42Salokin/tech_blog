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

router.get('/newPost', withAuth, (req, res) => {

  res.render('newPost', {
  logged_in: req.session.logged_in,
});
});

router.get('/editPost/:id', async (req, res) => {
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
    
    // If the post is found, send it as a JSON response
    if (postData) {
      // console.log(postData);
      // console.log(postData.dataValues.comments[0].dataValues);
      const post = {
        id: postData.dataValues.id,
        title: postData.dataValues.title,
        username: postData.dataValues.user.dataValues.username,
        date: formatDate(postData.dataValues.date),
        body: postData.dataValues.body,
      }
      console.log(post);
      // res.status(200).json(post);
     res.render('editPost', {
        post,
        logged_in: req.session.logged_in,
    }) 
    } else {
      // If the post is not found, send a 404 Not Found status
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    // If an error occurs during the database query, send a 500 Internal Server Error status
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;