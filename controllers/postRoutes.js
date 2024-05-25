const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { formatDate } = require('../utils/helpers');
const withAuth = require('../utils/auth');

// Receives request from homepage for one post, finds post in db by ID, sends that post's data to post page
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Queries the database to find the post by its ID using the Post model
        const postData = await Post.findByPk(id, {
          include: [
            {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
                    include: [{
                        model: User,
                        attributes: ['username'],
                    }]
          }]
        });
        
        // If the post is found, sends it as a JSON response
        if (postData) {
          const post = {
            id: postData.dataValues.id,
            title: postData.dataValues.title,
            username: postData.dataValues.user.dataValues.username,
            date: formatDate(postData.dataValues.date),
            body: postData.dataValues.body,
            comments: postData.comments.map(comment => ({
              id: comment.dataValues.id,
              body: comment.dataValues.body,
              date: formatDate(comment.dataValues.date),
              username: comment.dataValues.user.dataValues.username
          }))
          }
         res.render('post', {
            post,
            logged_in: req.session.logged_in,
        }) 
        } else {
          // If the post is not found, sends a 404 Not Found status
          res.status(404).json({ message: 'Post not found' });
        }
      } catch (error) {
        // If an error occurs during the database query, sends a 500 Internal Server Error status
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });

  // Receives data for new comment, stores it in db, connected to a specific user and post
  router.post('/comment', withAuth, async (req, res) => {
    try {
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