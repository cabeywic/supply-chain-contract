import * as React from 'react';
import { Typography, Grid, Box, Paper, InputBase, CardContent, Button, TextField } from '@mui/material';
import Layout from '../src/Components/Layout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';

class CreateProduct extends React.Component {

  render() {
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
                                fullWidth
                                variant="outlined"
                            />

                            <Button sx={{ marginTop: 3, marginRight: 1 }} variant="contained" endIcon={<AddBoxIcon />}>
                                Create
                            </Button>
                            <Button sx={{ marginTop: 3 }} variant="outlined" endIcon={<ClearIcon />}>
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