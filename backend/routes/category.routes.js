const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const { requireAdmin, requireAuth } = require('../middlewares/auth.middleware');

// Route
router.get("/", requireAuth, categoryController.getAllCategories);
router.get("/:id", requireAuth, categoryController.getCategoryInfos);

//Admin route
router.post("/", categoryController.createCategory);
router.patch("/:id", requireAdmin, categoryController.updateCategory);
router.delete("/serie/:id", requireAdmin, categoryController.deleteSerieCategory);
router.delete("/movie/:id", requireAdmin, categoryController.deleteMovieCategory);

module.exports = router;