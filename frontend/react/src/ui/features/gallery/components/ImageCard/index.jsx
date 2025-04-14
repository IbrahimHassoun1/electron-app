import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Crop ,Layers, Filter, RotateCcw,} from 'lucide-react';

export default function ImageCard({image,title,description}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="240"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<Crop size={20} />}  sx={{'&:hover': {color: 'white'}}}>
          Crop
        </Button>
        <Button size="small" startIcon={<Layers size={20} />} sx={{'&:hover': {color: 'white'}}}>
         Mark
        </Button>
        <Button size="small" startIcon={<Filter size={20} />} sx={{'&:hover': {color: 'white'}}}>
          Filter
        </Button>
        <Button size="small" startIcon={<RotateCcw size={20} />} sx={{'&:hover': {color: 'white'}}}>
          Rotate
        </Button>
        
      </CardActions>
    </Card>
  );
}
