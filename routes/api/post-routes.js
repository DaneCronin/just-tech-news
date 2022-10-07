const router = require('express').Router();
const {Post, User} = require('../../models');

//get all users
router.get('/', (req, res) => {
    console.log('==========================');
    Post.findAll({
        //Query Configuration:
        attributes: ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
        }
    ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//get one by ID
router.get('/', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [ 'id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attribtues: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

//Create a post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a Post title
router.put('/', (req, res) => {
    Post.update(
        {
        title: req.body.title
    },
    {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE a Post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'Post not found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;