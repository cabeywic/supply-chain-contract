import * as React from 'react';
import { Typography, Grid, Box, Paper, InputBase, CardContent, Button, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import swal from 'sweetalert2';
import { web3, supplyChainContract } from '../src/config/web3';
import Layout from '../src/Components/Layout';


class CreateProduct extends React.Component {

    state = {
        productId: "",
        productName: "",
        isLoading: false
    }

    createProduct = async () => {
        const { productName } = this.state;
        this.setState({ isLoading: true });

        try{
            const accounts = await web3.eth.getAccounts();
            let trx = await supplyChainContract().methods.createProduct(
                productName
            ).send({ from: accounts[0] });

            let eventValues = trx.events.ProductUpdated.returnValues;
            this.setState({ productId: eventValues.id, isLoading: false });
            console.log(eventValues)

            swal.fire({
                title: 'Success!',
                text: `Product ID: ${eventValues.id}`,
                icon: 'success',
                confirmButtonText: 'OK'
            })

        } catch(err) {
            swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    render() {
        const { isLoading, productName } = this.state;

        return (
        <Layout maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Grid container spacing={2} sx={{ my: 4 }}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{ p: '2px 4px', alignItems: 'center', marginBottom: 5 }}
                            >
                            <CardContent>
                                <Typography variant="h6" component="h1" gutterBottom>
                                    Create a New Product
                                </Typography>
                                
                                <TextField
                                    sx={{ height: 50, fontSize: "1.5em" }}
                                    size="large"
                                    placeholder="Product Name"
                                    value={productName}
                                    fullWidth
                                    variant="outlined"
                                    onChange={event => this.setState({productName: event.target.value})}
                                />

                                <Button sx={{ marginTop: 3, marginRight: 1 }} variant="contained" endIcon={<AddBoxIcon />}
                                 onClick={this.createProduct} 
                                >
                                    Create
                                </Button>
                                <Button sx={{ marginTop: 3 }} variant="outlined" endIcon={<ClearIcon />}
                                 onClick={() => this.setState({productName: ""})}
                                >
                                    Clear
                                </Button>
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
        );
    }
}

export default CreateProduct;