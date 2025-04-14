import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from '../components/ImageCard';
import { hidePopup, displayPopup } from '../../../../lib/redux/Gallery/slice.js';
import './styles.css';

const HomeComponent = () => {
  
  const dispatch = useDispatch();
  const galleryState = useSelector((global) => global.gallery);
  const [images, setImages] = useState([
    {
      imageUrl: 'crew-22235-977c1e39433a4d25854cb58924179eb1.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    // ... rest of your static images
  ]);

  const [newImage, setNewImage] = useState({
    imageUrl: '',
    title: '',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedFile || !newImage.title || !newImage.description) {
      console.log('Please fill in all fields and select an image');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const filename = Date.now() + '-' + selectedFile.name;
      console.log('before try')
      try {
        const savedPath = window.api.saveImage(arrayBuffer, filename);
        console.log('Image saved to', savedPath);
  
        setImages((prevImages) => [
          ...prevImages,
          {
            imageUrl: savedPath,
            title: newImage.title,
            description: newImage.description,
          },
        ]);
  
        setNewImage({ imageUrl: '', title: '', description: '' });
        setSelectedFile(null);
        dispatch(hidePopup({}));
      } catch (err) {
        console.error('Error saving image:', err);
        alert('Failed to save image.');
      }
    };
  
    reader.readAsArrayBuffer(selectedFile);
  };
  

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className='limiter'>
      <div className="top-buttons">
        <div className="top-left-buttons">
          <button className="add-button" onClick={() => navigate('/chats')}>
            Chat
          </button>
        </div>
        <div className="top-right-buttons">
          <button className="add-button" onClick={() => dispatch(displayPopup({}))}>
            Add New Image
          </button>
          <button className="add-button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>

      <div className="gallery">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image.imageUrl}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>

      <div id="add-image-form" className={`add-image-form ${galleryState.AddImagePopup ? 'block' : 'hidden'}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
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
          <button type="submit" >Add Image</button>
        </form>
        <button onClick={() => dispatch(hidePopup({}))}>Cancel</button>
      </div>
    </div>
  );
};

export default HomeComponent;
