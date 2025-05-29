
import { useEffect, useState } from 'react';
import './App.css';
import MovieRow from './Component/MovieRow';
function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3000/api/movies')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching data:', err));
  };

  const handleLike = (id) => {
    fetch(`http://localhost:3000/api/movies/${id}/like`, {
      method: 'PATCH',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to like movie');
        return res.json();
      })
      .then((updatedMovie) => {
        setData((prev) =>
          prev.map((movie) => (movie.id === id ? updatedMovie : movie))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/movies/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete movie');
        setData((prev) => prev.filter((movie) => movie.id !== id));
      })
      .catch((err) => console.error('Failed to delete movie', err));
  };



  const handleDislike = (id) => {
    setData((prev) =>
      prev.map((movie) =>
        movie.id === id && movie.likeCount > 0
          ? { ...movie, likeCount: movie.likeCount - 1 }
          : movie
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">

      <MovieRow
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleDelete={handleDelete}
        data={data} />

    </div>
  );
}

export default App;
