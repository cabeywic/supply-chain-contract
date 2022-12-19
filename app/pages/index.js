import * as React from 'react';
import { Typography, Grid, Box, Paper, IconButton, InputBase, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import swal from 'sweetalert2';
import { web3, supplyChainContract } from '../src/config/web3';
import Layout from '../src/Components/Layout';
import ProductCard from '../src/Components/ProductCard';
import ProductOwnershipTable from '../src/Components/ProductOwnershipTable';

class Index extends React.Component {
  state = {
    productId: "",
    productNewOwner: "",
    productOwnershipHistory: [],
    product: {
      id : "",
      name: "",
      createdAt: 1671383826,
      updatedAt: 1671383826,
      owner: "",
      isActive: false
    },
    isLoading: false,
    isOwner: false
  }

  getProduct = async () => {
    const { productId } = this.state;
    this.setState({ isLoading: true });

    try{
        let product = await supplyChainContract().methods.products(productId).call();
        const { id, name, createdAt, updatedAt, owner, isActive } = product;
        const accounts = await web3.eth.getAccounts();
        const isOwner = owner == accounts[0]

        let res = await supplyChainContract().getPastEvents(
          'ProductOwnershipTransfered',
          {
              fromBlock: 0
          }
        )

        res.sort((a, b) => (a.blockNumber < b.blockNumber) ? 1 : -1);
        res = res.filter(row => row.returnValues.id == productId);

        let productOwnershipHistory = []
        for(let row of res){
          const { newOwner, updatedAt } = row.returnValues;
          productOwnershipHistory.push({owner: newOwner, updatedAt: parseInt(updatedAt)})
        }

        this.setState({ product: {
          id: productId, name, createdAt: parseInt(createdAt), updatedAt: parseInt(updatedAt), owner, isActive
        }, isLoading: false, isOwner, productOwnershipHistory});
    } catch(err) {
        console.log(err)
        swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
  }

  transferProductOwnership = async () => {
    const { id } = this.state.product;
    const { productNewOwner } = this.state;
    this.setState({ isLoading: true });

    try{
        const accounts = await web3.eth.getAccounts();
        console.log(id, productNewOwner)

        await supplyChainContract().methods.transferOwnership(
            id, productNewOwner
        ).send({ from: accounts[0] });
        console.log("transfered")

        this.setState({ isLoading: false });

        swal.fire({
            title: 'Success!',
            text: `Successfully transfered product ownership!`,
            icon: 'success',
            confirmButtonText: 'OK'
        })

    } catch(err) {
        console.log(err)
        swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

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
          value={this.state.productId}
          onChange={event => this.setState({productId: event.target.value})}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={this.getProduct}>
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
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs={4}>
            <ProductCard 
              product={this.state.product}
            />
            </Grid>
            <Grid item xs={8}>
              <ProductOwnershipTable rows={this.state.productOwnershipHistory}/>
              {/* TODO: Transfer Ownership Button */}
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', my: 2 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="New Product Owner Address"
                  inputProps={{ 'aria-label': 'Transfer product ownership' }}
                  onChange={event => this.setState({productNewOwner: event.target.value})}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled={!this.state.isOwner} onClick={this.transferProductOwnership}>
                  <SwapHorizIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    );
  }
}

export default Index;