import React,{useState} from 'react'
import getCroppedImg from '../../../../../core/utils/cropImage.js';
import { Crop, Layers, Filter, RotateCcw } from 'lucide-react';
import Cropper from 'react-easy-crop';

const ImageCardLogic = () => {
   const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropDone = async () => {
    try {
      const result = await getCroppedImg(currentImage, croppedAreaPixels);
      setCurrentImage(result.url);
      setShowCropper(false);
    } catch (err) {
      console.error('Crop failed:', err);
    }
  };

  const handleAddWatermark = async () => {
    const img = new Image();
    img.src = currentImage;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const watermarkText = '© YourBrand';
      const fontSize = Math.floor(canvas.width / 20);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(174, 174, 174, 0.6)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';

      ctx.fillText(watermarkText, canvas.width - 300, canvas.height - 300);

      canvas.toBlob((blob) => {
        const newUrl = URL.createObjectURL(blob);
        setCurrentImage(newUrl);
      }, 'image/jpeg');
    };

    img.onerror = () => {
      console.error('Failed to load image for watermarking.');
    };
  };

  const handleApplyFilter = () => {
    const img = new Image();
    img.src = currentImage;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
        // alpha stays the same
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        const newUrl = URL.createObjectURL(blob);
        setCurrentImage(newUrl);
      }, 'image/jpeg');
    };

    img.onerror = () => {
      console.error('Failed to load image for filtering.');
    };
  };
  const handleRotateLeft = () => {
    const img = new Image();
    img.src = currentImage;
    img.crossOrigin = 'anonymous';
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      // Swap width and height for 90° rotation
      canvas.width = img.height;
      canvas.height = img.width;
  
      ctx.translate(0, canvas.height);
      ctx.rotate(-Math.PI / 2); // 90° counter-clockwise
  
      ctx.drawImage(img, 0, 0);
  
      canvas.toBlob((blob) => {
        const newUrl = URL.createObjectURL(blob);
        setCurrentImage(newUrl);
      }, 'image/jpeg');
    };
  
    img.onerror = () => {
      console.error('Failed to load image for rotation.');
    };
  };
  
  return (
    {showCropper,
      setShowCropper,
      crop,
      setCrop,
      zoom,
      setZoom,
      croppedAreaPixels,
      setCroppedAreaPixels,
      currentImage, setCurrentImage,
      onCropComplete,
      handleCropDone,
      handleAddWatermark,
      handleApplyFilter,
      handleRotateLeft
    }
  )
}

export default ImageCardLogic