const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { requireUser, requireAdmin, requireAuth } = require('../middlewares/auth.middleware');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const upload = multer({
    storage:
        multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads/profil/")
            },
            filename: function (req, file, cb) {
                const extention = file.originalname.split('.')[1];
                cb(null, uuidv4() + '.' + extention)
            }
        }), fileFilter: uploadController.fileFilter
});

// Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", requireAuth, authController.logout);

// user crud
router.get("/:id", requireAuth, userController.getUserInfos);
router.patch("/:id", requireAuth, userController.updateProfil);
router.delete("/:id", requireAuth, userController.deleteUser);
router.patch("/follow/:id", requireAuth, userController.follow);
router.patch("/unfollow/:id", requireAuth, userController.unfollow);
router.patch("/followMovie/:id", requireAuth, userController.followMovie);
router.patch("/unfollowMovie/:id", requireAuth, userController.unfollowMovie);
router.patch("/followSerie/:id", requireAuth, userController.followSerie);
router.patch("/unfollowSerie/:id", requireAuth, userController.unfollowSerie);
router.patch("/followSeason/:id", requireAuth, userController.followSeason);
router.patch("/unfollowSeason/:id", requireAuth, userController.unfollowSeason);

// Admin route
router.get("/admin", requireAuth, requireAdmin, userController.getAllUsers);
router.patch("/admin/:id", requireAuth, requireAdmin, userController.updateUser);

// Upload
router.post("/upload", upload.single('file'), requireAuth, uploadController.uploadProfil);

module.exports = router;