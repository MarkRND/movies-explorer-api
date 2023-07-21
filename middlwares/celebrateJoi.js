const { celebrate, Joi } = require("celebrate");

const Regex = require("../settings/settingsRegex");

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationEditUser = celebrate({
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
});

const validationAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(Regex).required(),
    trailerLink: Joi.string().regex(Regex).required(),
    thumbnail: Joi.string().regex(Regex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationSignin,
  validationSignup,
  validationEditUser,
  validationAddMovie,
  validationDeleteMovie,
};
