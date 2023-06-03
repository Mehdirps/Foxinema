const router = require('express').Router();
const seasonController = require('../controllers/season.controller');
const { requireUser, requireAdmin } = require('../middlewares/auth.middleware');

// Route
router.get("/", requireUser, seasonController.getAllSeason);
router.get("/:id", requireUser, seasonController.getSeasonInfos);

// Admin route
router.post("/", requireUser, requireAdmin, seasonController.createSeason);
router.patch("/:id", requireUser, requireAdmin, seasonController.updateSeason);
router.delete("/:id", requireUser, requireAdmin, seasonController.deleteSeason);

module.exports = router;