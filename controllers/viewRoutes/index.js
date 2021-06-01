const router = require("express").Router();
const { User, Posts, Comment } = require("../../models");
const { authCheck } = require("../../utils/auth");


// Get home page with blog posts
router.get("/", async (req, res) => {
    try {
        const blogData = await Posts.findAll({
            include: { model: User }
        });

        const posts = blogData.map(blog => blog.get({ plain: true }));

        res.status(200).render("home", {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get login page
router.get("/login", (req, res) => {
    res.render("login", {
        loggedIn: req.session.loggedIn,
    });
});

// Sign up page
router.get("/signup", (req, res) => {
    res.render("signup", {
        loggedIn: req.session.loggedIn,
    });
});

router.get("/dashboard", authCheck, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { id: req.session.user_id },
            include: { model: Posts },
        });

        const user = userData.get({ plain: true });

        res.render("dashboard", {
            user,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })

    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/createPost", authCheck, async (req, res) => {
    try {
        res.render("createPost", {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/updatePost/:id", authCheck, async (req, res) => {
    try {

        const postData = await Posts.findOne({
            where: { id: req.params.id },
            include: { model: User }
        });

        const post = postData.get({ plain: true });

        res.render("updatePost", {
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });

    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/posts/:id", async (req, res) => {
    try {
        const postData = await Posts.findOne({
            where: { id: req.params.id },
            include: [{ model: User },
            { model: Comment, include: { model: User } }]
        });

        if (!postData) {
            res.status(404).send("Could not find post");
            return;
        }

        const post = postData.get({ plain: true });

        res.render("postID", {
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/public/:id", async (req, res) => {
    try {
        const postData = await Posts.findOne({
            where: { id: req.params.id },
            include: [{ model: User },
            { model: Comment, include: { model: User } }]
        });

        if (!postData) {
            res.status(404).send("Could not find post");
            return;
        }

        const post = postData.get({ plain: true });

        res.render("publicID", {
            post,
            loggedIn: req.session.loggedIn,
        })
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router