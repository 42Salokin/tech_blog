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

  router.delete('/:postId', async (req, res) => {
    const deleteId = req.params.postId;
    console.log(deleteId);

    // try {
    //     // Find the team with the specified name or containing the specified Pokemon
    //     const team = await Team.findOne({
    //         where: {
    //             [Op.or]: [
    //                 { name: deleteName },
    //                 { pokemon1: deleteName },
    //                 { pokemon2: deleteName },
    //                 { pokemon3: deleteName },
    //                 { pokemon4: deleteName },
    //                 { pokemon5: deleteName },
    //                 { pokemon6: deleteName }
    //             ]
    //         }
    //     });

    //     if (!team) {
    //         console.log(`No team or Pokemon found with name ${deleteName}.`);
    //         return res.status(404).json({ message: `No team or Pokemon found with name ${deleteName}.` });
    //     }
    //     // console.log(team);
    //     // Remove the Pokemon from the team
    //     if (team.name === deleteName) {
    //         // Remove the entire team if the name matches
    //         await team.destroy();
    //         console.log(`Team ${deleteName} deleted successfully.`);
    //         res.status(200).json({ message: `Team ${deleteName} deleted successfully.` });
    //         // return res.redirect('/api/team');
    //         // res.render('team');
    //     } else {
    //         // Otherwise, remove the Pokemon from the team
    //         const columns = ['pokemon1', 'pokemon2', 'pokemon3', 'pokemon4', 'pokemon5', 'pokemon6'];
    //         for (const column of columns) {
    //             if (team[column] === deleteName) {
    //                 team[column] = '';
    //             }
    //         }
    //         await team.save();
    //         console.log(`Pokemon ${deleteName} removed from team.`);
    //         res.status(200).json({ message: `Pokemon ${deleteName} removed from team.` });
    //         // res.redirect('/api/team');
    //         // res.render('team');
    //     }
    // } catch (error) {
    //     console.error('Error deleting Pokemon from team:', error);
    //     return res.status(500).json({ message: 'Failed to delete Pokemon from team.' });
    // }
});
  module.exports = router;