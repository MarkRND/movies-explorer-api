const Movie = require("../models/movie");
const NotFoundError = require("../messageError/NotFoundError");
const ForbiddenError = require("../messageError/ForbiddenError");
const BadRequestError = require("../messageError/BadRequestError");

const getMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const movies = await Movie.find({ owner: ownerId });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const ownerId = req.user._id;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: ownerId,
      movieId,
      nameRU,
      nameEN,
    });
    res.send(movie);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Неудалось добавить фильм"));
      return;
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findById(_id);
    if (!movie) {
      throw new NotFoundError("Фильм не найден");
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError("У вас нет прав на удаление этого фильма");
    }
    const deletedMovie = await Movie.findByIdAndRemove(_id);
    res.send(deletedMovie);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovie,
  addMovie,
  deleteMovie,
};
