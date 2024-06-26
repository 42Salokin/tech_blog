const router = require('express').Router();
const { User } = require('../../models');

// Receives new user data from signup page and stores it in db,
// logs user in
router.post('/signup', async (req, res) => {
  console.log(req.body)
  try {
    const signupuser = await User.create(req.body)
    console.log(signupuser)
    req.session.save(() => {
      req.session.user_id = signupuser.id;
      req.session.logged_in = true;
      res.status(200).json(signupuser)
    });
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

// Receives user data from login page, checks to make sure data matches user in db,
// logs user in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(userData);
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Receives logout request from logout button, deletes current login session
router.post('/logout', (req, res) => {
console.log(req.session.logged_in);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
