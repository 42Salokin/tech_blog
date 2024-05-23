const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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
          // console.log(postData);
          // console.log(postData.dataValues.user.dataValues.username);
          const post = {
            id: postData.dataValues.id,
            title: postData.dataValues.title,
            username: postData.dataValues.user.dataValues.username,
            date: formatDate(postData.dataValues.date),
            body: postData.dataValues.body,
          }
          console.log(req.session);
         res.render('post', {
            post,
            logged_in: req.session.logged_in,
            // user_id: req.session.user_id,
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
  });

  router.post('/comment', async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.session.user_id);
        // const { commentText, username, date } = req.body;

        // Save the comment to the database
        const newComment = await Comment.create({
            body: req.body.commentText,
            date: req.body.date,
            userId: req.session.user_id,
            postId: req.body.postId
        });
        console.log(newComment);

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;

// comment {
//   dataValues: {
//     id: 1,
//     body: 'great game, thanks for the recommend',
//     date: 2024-05-23T22:18:02.350Z,
//     userId: 4,
//     postId: 3
//   },
