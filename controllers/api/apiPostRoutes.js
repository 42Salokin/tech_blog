const router = require('express').Router();
const { Post } = require('../../models');

// Receives data from dashboard for a new post and adds it to db
router.post('/newPost', async (req, res) => {
    console.log(req.body)
    console.log(req.session.user_id);

    try {
        const newPost = await Post.create({
            title: req.body.title,
            date: req.body.date,
            userId: req.session.user_id,
            body: req.body.content
        });
      console.log(newPost)
        res.status(200).json(newPost)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  });

  // Receives data from post edit, finds post by ID, updates post in db 
  router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findOne({ where: { id: postId } });
  
      if (!post) {
        return res.status(404).json({ message: `No post found with ID ${postId}.` });
      }
  
      post.title = title;
      post.body = content;
      await post.save();
  
      res.status(200).json({ message: `Post ${postId} updated successfully.` });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
  });  

  module.exports = router;
