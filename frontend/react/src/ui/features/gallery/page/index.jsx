import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import ImageCard from '../components/ImageCard';
import {hidePopup,displayPopup} from '../../../../lib/redux/Gallery/slice.js'
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
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    {
      imageUrl: '/public/images.jpg',
      title: 'Image 1',
      description: 'This is a description of Image 1',
    },
    
   
  ]);
  useEffect(()=>{
    console.log(galleryState)
  },[galleryState])
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
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/')
  }
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
            imageUrl={image.imageUrl}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>

      

      <div id="add-image-form" className={`add-image-form ${galleryState.AddImagePopup ? 'block' : 'hidden'}`}>
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
        <button  onClick={() => dispatch(hidePopup({}))}>Cancel</button>
      </div>
    </div>
  );
};

export default HomeComponent;
