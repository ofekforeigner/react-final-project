import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


const ProductComp = ({ data, img }) => {
    return (
        <Card sx={{ maxWidth: 400 }} style={{ marginBottom: '10px' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={img.link}
                title={data.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={`/edit_product/${data.id}`} state={data} style={{ textDecoration: 'none', color: '#4e4949' }}>{data.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                    Price: {data.price}$
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                    Quantity: {data.qty}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`${data.id}/customers`} style={{ textDecoration: 'none' }}><Button size="small">Customers</Button></Link>
            </CardActions>
        </Card>
    );
}

export default ProductComp