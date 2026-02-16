import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"; 

export default function InfoBox({ info }) {
  const init_image_url = "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="info-box">
      <h2>Weather Info - {info.weather}</h2>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={init_image_url}
          title={info.weather}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            🌡 Temp: {info.temp}°C <br />
            🔼 Max: {info.temp_max}°C | 🔽 Min: {info.temp_min}°C <br />
            💧 Humidity: {info.humidity}% <br />
            🤔 Feels Like: {info.feelsLike}°C
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
