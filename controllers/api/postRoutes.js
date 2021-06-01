const router = require("express").Router();
const { User, Posts } = require("../../models");


router.get("/", async (req, res) => {
    const blogData = await Posts.findAll({
        include: {
            model: User
        }
    });
    console.log(blogData);

    const posts = blogData.map(post => post.get({ plain: true }))
    res.json(posts);
});

router.post('/', async (req, res) => {
    try {
        const blogData = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,

        });

        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const posts = await Posts.update(
            {
                title: req.body.title,
                description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            });

        res.status(200).json(posts);
    } catch (err) {
        res.status().json(err);
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const postDelete = await Posts.destroy(
            {
                where: {
                    id: req.params.id
                },
            });
        res.status(200).json(postDelete)
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;