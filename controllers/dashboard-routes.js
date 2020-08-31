const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const authorize = require('../utils/auth');

router.get('/', authorize, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { 
            posts,
            loggedIn: true 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

module.exports = router;