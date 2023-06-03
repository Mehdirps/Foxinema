const router = require('express').Router();
const serieController = require('../controllers/serie.controller');
const { requireAdmin, requireAuth } = require('../middlewares/auth.middleware');

// Route
router.get("/choiceSerie", serieController.getAllSeries);
router.get("/", requireAuth, serieController.getAllSeries);
router.get("/:id", requireAuth, serieController.getSerieInfos);

// Admin route
router.post("/", requireAuth, serieController.createSerie);
router.patch("/:id", requireAuth, serieController.updateSerie);
router.delete("/:id", requireAuth, serieController.deleteSerie);
router.patch("/category/:id", requireAuth, serieController.addCategory);
router.patch("/removeCategory/:id", requireAuth, serieController.removeCategory);

module.exports = router;