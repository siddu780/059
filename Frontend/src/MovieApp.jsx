import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MovieApp.css"

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ movie: '' });
  const [editMovie, setEditMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:3000/api/movies');
    setMovies(res.data);
  };

  const handleAddMovie = async () => {
    if (!newMovie.movie) return alert("Movie name required");
    await axios.post('http://localhost:3000/api/movies/', newMovie);
    setNewMovie({ movie: '' });
    fetchMovies();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/movies/${id}`);
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
  };

  const handleUpdate = async () => {
    if (!editMovie.movie) return alert("Movie name required");
    await axios.put(`http://localhost:3000/api/movies/${editMovie.id}`, editMovie);
    setEditMovie(null);
    fetchMovies();
  };

  const handlePatch = async (id, newName) => {
    await axios.patch(`http://localhost:3000/api/movies/${id}`, { movie: newName });
    fetchMovies();
  };

  return (
    <div className="container">
      <h1 className="Title">Movies List(CRUD)</h1>

      <div className="AddMovie">
        <input
          type="text"
          className="input-add"
          placeholder="Enter movie name"
          value={newMovie.movie}
          onChange={(e) => setNewMovie({ movie: e.target.value })}
        />
        <button onClick={handleAddMovie} className="add-btn">
          Add Movie
        </button>
      </div>

      {editMovie && (
        <div className="EditMovie">
          <input
            type="text"
            className="edit-input"
            value={editMovie.movie}
            onChange={(e) => setEditMovie({ ...editMovie, movie: e.target.value })}
          />
          <button onClick={handleUpdate} className="on-update">
            Update Movie
          </button>
        </div>
      )}

      <ul>
        {movies.map((m) => (
          <li key={m.id} className="MoviesContainer">
            <span>{m.movie}</span>
            <div className="MovieList">
              <button
                className="Edit-btn"
                onClick={() => handleEdit(m)}
              >
                Edit
              </button>
              <button
                className="Patch-btn"
                onClick={() => {
                  const newName = prompt('New movie name:', m.movie);
                  if (newName) handlePatch(m.id, newName);
                }}
              >
                Patch
              </button>
              <button
                className="Delete-btn"
                onClick={() => handleDelete(m.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
