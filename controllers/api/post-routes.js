const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// route to get all posts 
router.get('/', (req, res) => {
    Post.findAll({

    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to get one post
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'There is no post with this id!' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to create a new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_contents: req.body.post_contents,
        user_id:req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;