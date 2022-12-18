import * as React from 'react';
import Layout from '../src/Components/Layout';
import { Typography, Grid, Box, TextField, Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

class Index extends React.Component {
  renderProductSearchBox(){
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by Product ID"
          inputProps={{ 'aria-label': 'search for product id' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }

  render() {
    return (
      <Layout maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Find a Product
          </Typography>
          {this.renderProductSearchBox()}
          <Grid container spacing={2}>
          
          </Grid>
        </Box>
      </Layout>
    );
  }
}

export default Index;