import React from 'react';
import { Typography, Paper, CardContent } from '@mui/material';
import { convertUnixTStoStr } from '../config/helper'


function ProductCard(props) {
    const { sx } = props;
    const { name, createdAt, updatedAt, owner, isActive } = props.product


    return(
        <Paper sx={sx}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{color: "text.primary"}}>
                Product Details
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Product Name: {name}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Created At: {convertUnixTStoStr(createdAt)}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Updated At: {convertUnixTStoStr(updatedAt)}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Owner: 
                </Typography>
                <Typography variant="body" component="h5" sx={{color: "text.secondary"}}>
                {owner} 
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Active: {isActive.toString()} 
                </Typography>
            </CardContent>
        </Paper>
    )
}

export default ProductCard;