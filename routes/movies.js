const router = require("express").Router();
const { getMovie, addMovie, deleteMovie } = require("../controllers/movies");
const {
  validationAddMovie,
  validationDeleteMovie,
} = require("../middlwares/celebrateJoi");

router.get("/", getMovie);
router.post("/", validationAddMovie, addMovie);
router.delete("/:_id", validationDeleteMovie, deleteMovie);

module.exports = router;
