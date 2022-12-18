import * as React from 'react';
import { Typography, Grid, Box, Paper, IconButton, InputBase, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../src/Components/Layout';
import ProductCard from '../src/Components/ProductCard';
import ProductOwnershipTable from '../src/Components/ProductOwnershipTable';

const rows = [
  {
      owner: "Charaka",
      updatedAt: 1671383826
  },
  {
      owner: "Chris",
      updatedAt: 1571383826
  },
  {
      owner: "John",
      updatedAt: 1471383826
  },
  {
      owner: "Charaka",
      updatedAt: 1371383826
  },
]

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
    const isActive = true
    return (
      <Layout maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Find a Product
          </Typography>
          {this.renderProductSearchBox()}
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs={4}>
              <ProductCard 
              productName={"100ml Water Bottle"} 
              createdAt={1671383826}
              updatedAt={1671383826}
              owner={"Charaka"}
              isActive={isActive.toString()}
              />
            </Grid>
            <Grid item xs={8}>
              <ProductOwnershipTable rows={rows}/>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    );
  }
}

export default Index;