import React from 'react';
import './styles.css'

const ImageCard = ({ imageUrl, title, description, onDelete }) => {
    const Delete = () => {
        
    }
    return (
      <div className="image-card">
        <img src={imageUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <button className="delete-button" onClick={Delete}>
          Delete
        </button>
      </div>
    );
  };

export default ImageCard;
