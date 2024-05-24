const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/newPost', async (req, res) => {
    console.log(req.body)
    console.log(req.session.user_id);

    try {
        const newComment = await Post.create({
            title: req.body.title,
            date: req.body.date,
            userId: req.session.user_id,
            body: req.body.content
        });
      console.log(newComment)
    //   req.session.save(() => {
    //     req.session.user_id = signupuser.id;
    //     req.session.logged_in = true;
    //     res.status(200).json(signupuser)
    //   });
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  });

  module.exports = router;
