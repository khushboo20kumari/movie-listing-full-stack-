
import { useEffect, useState } from 'react';
import './App.css';

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
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px' }}>
          <p>{item.title}</p>
          <p>{item.duration}</p>
          <p>{item.description}</p>
          <img src={item.image_url} alt={item.title} width="200" /><br />
          <button onClick={() => handleLike(item.id)}>Like</button>
          <span style={{ margin: '0 10px' }}>{item.likeCount}</span>
          <button onClick={() => handleDislike(item.id)}>Dislike</button>
        </div>
      ))}
    </div>
  );
}

export default App;
