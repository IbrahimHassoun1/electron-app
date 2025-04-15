import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Crop, Layers, Filter, RotateCcw } from 'lucide-react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';

import ImageCardLogic from './ImageCardLogic';

export default function ImageCard({ image, title, description }) {
 const {showCropper,
  setShowCropper,
  crop,
  setCrop,
  zoom,
  setZoom,
  currentImage,
  setCurrentImage,
  onCropComplete,
  handleCropDone,
  handleAddWatermark,
  handleApplyFilter,
  handleRotateLeft}= ImageCardLogic();

  useEffect(()=>{
    setCurrentImage(image);
  },[])
  
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia component="img" alt={title} height="240" image={currentImage} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<Crop size={20} />}
          sx={{ '&:hover': { color: 'white' } }}
          onClick={() => setShowCropper(true)}
        >
          Crop
        </Button>
        <Button
          size="small"
          startIcon={<Layers size={20} />}
          sx={{ '&:hover': { color: 'white' } }}
          onClick={handleAddWatermark}
        >
          Mark
        </Button>
        <Button
          size="small"
          startIcon={<Filter size={20} />}
          sx={{ '&:hover': { color: 'white' } }}
          onClick={handleApplyFilter}
        >
          Filter
        </Button>
        <Button
          size="small"
          startIcon={<RotateCcw size={20} />}
          sx={{ '&:hover': { color: 'white' } }}
          onClick={handleRotateLeft}
        >
          Rotate
        </Button>
      </CardActions>

      {/* Cropper Overlay */}
      {showCropper && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 300, height: 200 }}>
            <Cropper
              image={currentImage}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={{ marginTop: 20, width: 200 }}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, val) => setZoom(val)}
              style={{ color: 'white' }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button onClick={handleCropDone} variant="contained" sx={{ mr: 1 }}>
              Done
            </Button>
            <Button onClick={() => setShowCropper(false)} variant="outlined" color="inherit">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
