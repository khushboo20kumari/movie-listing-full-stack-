const express = require('express');
const router = express.Router();
const Movie = require('./Movie');

router.get('/', (req, res) => {
  Movie.findAll()
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch movies' });
    });
});

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

router.patch('/:id/like', (req, res) => {
  Movie.findByPk(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      movie.likeCount += 1;
      return movie.save();
    })
    .then((updatedMovie) => {
      if (updatedMovie) res.json(updatedMovie);
    })
    .catch(() => {
      res.status(500).json({ error: 'Failed to like movie' });
    });
});


module.exports = router;
