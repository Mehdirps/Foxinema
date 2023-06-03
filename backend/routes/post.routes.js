const router = require('express').Router();
const postController = require('../controllers/post.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Find post
router.get("/:id", requireAuth, postController.findOnePost);

// Find user posts
router.get("/user/:id", requireAuth, postController.findUserPosts);

// Update Post
router.patch("/:id", requireAuth, postController.updatePost);

// Movie Posts
router.post("/movie", requireAuth, postController.createMoviePost);
router.get("/movie/:id", requireAuth, postController.findMoviePosts);
router.delete("/movie/:id", requireAuth, postController.deleteMoviePost);

// Serie Posts
router.post("/serie", requireAuth, postController.createSeriePost);
router.get("/serie/:id", requireAuth, postController.findSeriePosts);
router.delete("/serie/:id", requireAuth, postController.deleteSeriePost);

// Season Posts
router.post("/season", requireAuth, postController.createSeasonPost);
router.get("/season/:id", requireAuth, postController.findSeasonPosts);
router.delete("/season/:id", requireAuth, postController.deleteSeasonPost);

module.exports = router;