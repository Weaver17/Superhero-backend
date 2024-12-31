const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateUserId } = require("../middlewares/validation");

const {
  getUserFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favorites");

router.use(auth);

// POST /api/favorites – Adds a game to favorites.
router.post("/", async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const favorite = await addFavorite(req);
    console.log(favorite);
    res.status(201);
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// DELETE /api/favorites/:id – Removes a game from favorites
router.delete("/:id", async (req, res) => {
  try {
    await deleteFavorite(req.user._id, req.body._id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

// GET /api/favorites – Fetches all favorite games.
router.get("/", async (req, res) => {
  try {
    const favorites = await getUserFavorites(req.user._id);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

module.exports = router;