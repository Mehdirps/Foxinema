const router = require('express').Router();
const opinionController = require('../controllers/opinion.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Route
router.post("/movie", requireAuth, opinionController.createMovieOpinion);
router.post("/serie", requireAuth, opinionController.createSerieOpinion);
router.post("/season", requireAuth, opinionController.createSeasonOpinion);
router.get("/:id", requireAuth, opinionController.getOpinionInfos);
router.patch("/:id", requireAuth, opinionController.updatOpinion);
router.delete("/movieOpinion/:id", requireAuth, opinionController.deleteMovieOpinion);
router.delete("/serieOpinion/:id", requireAuth, opinionController.deleteSerieOpinion);
router.delete("/seasonOpinion/:id", requireAuth, opinionController.deleteSeasonOpinion);

module.exports = router;