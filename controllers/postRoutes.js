const router = require('express').Router();
const { Post, User } = require('../models');
const { formatDate } = require('../utils/helpers');

// const withAuth = require('../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        // Retrieve the postId from the request parameters
        const id = req.params.id;
        
        // Query the database to find the post by its ID using the Post model
        const postData = await Post.findByPk(id, {
          include: [{
            model: User,
            attributes: ['username'],
          }]
        });
        
        // If the post is found, send it as a JSON response
        if (postData) {
          console.log(postData);
          console.log(postData.dataValues.user.dataValues.username);
          const post = {
            id: postData.dataValues.id,
            title: postData.dataValues.title,
            username: postData.dataValues.user.dataValues.username,
            date: formatDate(postData.dataValues.date),
            body: postData.dataValues.body,
          }
          console.log(post);
          res.render('post', {
            post,
            logged_in: req.session.logged_in,
        })
      //   res.status(200).json({
      //     id: post.id,
      //     title: post.title,
      //     username: post.user.username,
      //     date: post.date,
      //     body: post.body
      // });
        } else {
          // If the post is not found, send a 404 Not Found status
          res.status(404).json({ message: 'Post not found' });
        }
      } catch (error) {
        // If an error occurs during the database query, send a 500 Internal Server Error status
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });

module.exports = router;
