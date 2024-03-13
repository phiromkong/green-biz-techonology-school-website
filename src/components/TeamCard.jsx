import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({ member, onEdit, onDelete, setDeleteMemberId }) {
 return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={member.name}
        height="140"
        image={member.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {member.enFirstName} {member.enLastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.enPosition}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(member.id)}>Edit</Button>
        <Button size="small" onClick={() => setDeleteMemberId(member.id)}>Delete</Button>
      </CardActions>
    </Card>
 );
}
