const express = require("express");
const router = express.Router();
const favoritesCtrl = require("../../controllers/favorites");

router.post("/posts/:id/favorites", favoritesCtrl.create);
router.delete("/favorites/:id", favoritesCtrl.deleteFavorite);

module.exports = router;
