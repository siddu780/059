const fs = require('fs');
const movies = require('../database/movies.js');

function getMovies(req, res) {
    res.send(movies);
}

function getMoviesById(req, res) {
    const id = req.params.slug * 1;
    const movie = movies[id - 1];
    res.send(movie);
}

function putMovieById(req, res) {
    const id = Number(req.params.slug);
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
        return res.status(404).send({ error: 'Movie not found' });
    }

    movies[index] = { id, ...req.body };

    
    fs.writeFileSync(
        './database/movies.js',
        `module.exports = ${JSON.stringify(movies, null, 2)};\n`,
        'utf-8'
    );

    res.send(movies[index]);
}

function patchMovieById(req, res) {
    const id = Number(req.params.slug);
    const movieID = movies.find((m) => m.id === id);

    if (!movieID) {
        return res.status(404).send({ error: 'Movie not found' });
    }

    if (req.body.movie !== undefined) {
        movieID.movie = req.body.movie;
    }

    fs.writeFileSync(
        './database/movies.js',
        `module.exports = ${JSON.stringify(movies, null, 2)};\n`,
        'utf-8'
    );

    res.send(movieID);
}

function addMovies(req, res) {
    const userInput = req.body;
    const newMovie = { ...userInput, id: movies.length + 1 };
    movies.push(newMovie);

    fs.writeFileSync(
        './database/movies.js',
        `module.exports = ${JSON.stringify(movies, null, 2)};\n`,
        'utf-8'
    );

    res.send(newMovie);
}

function deleteMovies(req, res) {
    const id = req.params.slug * 1;
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
        return res.status(404).send({ error: 'Movie not found' });
    }

    const deletedMovie = movies.splice(index, 1);

  
    fs.writeFileSync(
        './database/movies.js',
        `module.exports = ${JSON.stringify(movies, null, 2)};\n`,
        'utf-8'
    );

    res.send(deletedMovie);
}

module.exports = {
    getMovies,
    getMoviesById,
    addMovies,
    deleteMovies,
    putMovieById,
    patchMovieById
};
