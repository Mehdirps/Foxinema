const router = require('express').Router();
const movieController = require('../controllers/movie.controller');
const { requireAdmin, requireAuth } = require('../middlewares/auth.middleware');

// Route
router.get("/choiceMovie", movieController.getAllMovies);
router.get("/", requireAuth, movieController.getAllMovies);
router.get("/:id", requireAuth, movieController.getMovieInfos);

// Admin route
router.post("/", requireAuth, movieController.createMovie);
router.patch("/:id", requireAuth, movieController.updateMovie);
router.delete("/:id", requireAuth, movieController.deleteMovie);
router.patch("/category/:id", requireAuth, movieController.addCategory);
router.patch("/removeCategory/:id", requireAuth, movieController.removeCategory);

module.exports = router;