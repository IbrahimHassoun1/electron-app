import React, { useState } from 'react';
import ImageCard from '../ImageCard';
import './styles.css';

const HomeComponent = () => {
  const [images, setImages] = useState([
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images (1).jpg',
      title: 'Image 2',
      description: 'This is a description of Image 2',
    },
    {
      imageUrl: 'https://via.placeholder.com/250',
      title: 'Image 3',
      description: 'This is a description of Image 3',
    },
    {
      imageUrl: 'https://via.placeholder.com/250',
      title: 'Image 3',
      description: 'This is a description of Image 3',
    },
    {
      imageUrl: 'https://via.placeholder.com/250',
      title: 'Image 3',
      description: 'This is a description of Image 3',
    },
  ]);

  const [newImage, setNewImage] = useState({
    imageUrl: '',
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImage.imageUrl && newImage.title && newImage.description) {
      setImages((prevImages) => [...prevImages, newImage]);
      setNewImage({ imageUrl: '', title: '', description: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <button className="add-button" onClick={() => document.getElementById('add-image-form').style.display = 'block'}>
        Add New Image
      </button>
      <div className="gallery">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            imageUrl={image.imageUrl}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>

      

      <div id="add-image-form" className="add-image-form">
        <form onSubmit={handleAddImage}>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newImage.imageUrl}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newImage.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newImage.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Image</button>
        </form>
        <button  onClick={() => document.getElementById('add-image-form').style.display = 'none'}>Cancel</button>
      </div>
    </div>
  );
};

export default HomeComponent;
