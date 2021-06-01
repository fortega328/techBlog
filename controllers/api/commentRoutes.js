const { Comment } = require("../../models");
const router = require("express").Router();

router.post("/", async (req, res) => {
    try {

        const comment = await Comment.create({
            comment_text: req.body.commentText,
            user_id: req.session.user_id,
            posts_id: req.body.postID
        });

        res.status(201).json(comment);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(201).json(commentDelete);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router