const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Create Comment
router.post("/", requireAuth, commentController.createComment);
// Create Response
router.post("/response", requireAuth, commentController.createResponse);
// Get comment
router.get("/:id", requireAuth, commentController.findComment);
// Get Comment Responses
router.get("/response/:id", requireAuth, commentController.findCommentResponse);
// Find Post Comments
router.get("/postComments/:id", requireAuth, commentController.findPostComments);
// Update Comment
router.patch("/:id", requireAuth, commentController.updateComment);
// Update Comment Response
router.patch("/response/:id", requireAuth, commentController.updateResponse);
// Delete Comment
router.delete("/:id", requireAuth, commentController.deleteComment);
// Delete Response
router.delete("/response/:id", requireAuth, commentController.deleteResponse);

module.exports = router;