import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from '../components/ImageCard';
import { hidePopup, displayPopup } from '../../../../lib/redux/Gallery/slice.js';
import './styles.css';

const HomeComponent = () => {
  const dispatch = useDispatch();
  const galleryState = useSelector((global) => global.gallery);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    imageUrl: '',
    title: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Load images from public folder automatically
  useEffect(() => {
    const loadPublicImages = async () => {
      try {
        // Get all image files from public/images folder
        const imageModules = import.meta.glob('/public/*.{png,jpg,jpeg,gif,svg}', { 
          eager: true, 
          as: 'url' 
        });
       
        const loadedImages = Object.entries(imageModules).map(([path, url]) => {
          const filename = path.split('/').pop();
          return {
            imageUrl: url.replace('/public', ''),
            title: filename,
            description: ''
          };
        });

        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
   
    loadPublicImages();
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = async () => {
    try {
      const imageData = await window.electronAPI.selectImage();
      
      if (imageData) {
        const blob = new Blob([imageData.buffer]);
        const previewUrl = URL.createObjectURL(blob);
        
        setSelectedFile({
          name: imageData.fileName,
          preview: previewUrl,
          buffer: imageData.buffer
        });
      }
    } catch (err) {
      console.error('Error selecting image:', err);
      alert('Failed to select image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile || !newImage.title || !newImage.description) {
      console.log('Please fill in all fields and select an image');
      return;
    }
  
    try {
      const filename = Date.now() + '-' + selectedFile.name;
      const savedPath = await window.electronAPI.saveImage(filename, selectedFile.buffer);
      
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
          <button 
            type="button" 
            onClick={handleFileSelect}
            style={{marginBottom: '10px'}}
          >
            {selectedFile ? 'Change Image' : 'Select Image'}
          </button>
          
          {selectedFile && (
            <div style={{margin: '10px 0'}}>
              <img 
                src={selectedFile.preview} 
                alt="Preview" 
                style={{maxWidth: '200px', maxHeight: '200px'}} 
              />
              <p>{selectedFile.name}</p>
            </div>
          )}
          
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
        <button onClick={() => dispatch(hidePopup({}))}>Cancel</button>
      </div>
    </div>
  );
};

export default HomeComponent;