import React from 'react';
import { Typography, Paper, CardContent } from '@mui/material';
import { convertUnixTStoStr } from '../config/helper'


function ProductCard(props) {
    const {productName, createdAt, updatedAt, owner, isActive} = props;

    return(
        <Paper>
            <CardContent>
                <Typography variant="h5" component="div" sx={{color: "text.primary"}}>
                Product Details
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Product Name: {productName}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Created At: {convertUnixTStoStr(createdAt)}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Updated At: {convertUnixTStoStr(updatedAt)}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Owner: {owner}
                </Typography>
                <Typography variant="body" component="h4" sx={{color: "text.secondary"}}>
                Active: {isActive} 
                </Typography>
            </CardContent>
        </Paper>
    )
}

export default ProductCard;