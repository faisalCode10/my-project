import { useEffect, useState } from 'react';
import '../App.css';

const ImageGen = () => {
  const [inputData, setInputData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const accessKey = '5HZq1ywJGL3B1JJXKV5gvYv8mEEQj8ZbDdQJqk2cumI';

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setImages(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchImages();
  };

  const showMore = () => {
    setPage(page + 1);
  };

  const toggleColors = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (isActive) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isActive]);

  return (
    <div className='wrapper'>
      <button className='btn' onClick={toggleColors}>
        {isActive ? 'Light' : 'Dark'}
      </button>

      <h1>Unsplash <span className='span'>Images</span></h1>

      <div className="search-bar">
        <input
          type="text"
          name="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Search for images..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="display-img">
        {isLoading ? (
          <p>Fetching images...</p>
        ) : images && images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-container">
              <img
                src={image.urls.small}
                alt={image.description || image.alt_description}
                className='img'
              />
              <div className="image-details">
                <h2> {image.alt_description || 'No title available'}</h2>
                <p>{image.description || 'No description available'}</p>
                <p>Click Date: {image.created_at || 'N/A'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div>
      {
        images.length>0   ?<button onClick={showMore}>Show more</button> : ""
      }
    </div>
  );
};

export default ImageGen;
