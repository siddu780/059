const express = require ('express')
const movies = require('../database/movies.js');
const {patchMovieById,putMovieById,deleteMovies,getMovies,getMoviesById,addMovies} = require('../controller/movies.controller.js')
const router = express.Router();
router.route('/').get(getMovies).post(addMovies)
router.route('/:slug').get(getMoviesById).delete(deleteMovies).put(putMovieById).patch(patchMovieById)
module.exports=router;