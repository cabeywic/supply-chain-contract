import * as React from 'react';
import {AppBar, Toolbar, Typography, Button, Box, Stack} from '@mui/material';
import Link from 'next/link'

const styles = {
    root: {
      flexGrow: 1,
      marginBottom: '10px',
    },
    menuButton: {
      marginRight: '10px',
    },
    title: {
      flexGrow: 1
    },
};

export default function Header() {
  return (
    <Box sx={styles.root}>
        <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography variant="h5" component="h1" sx={styles.title}>
                  Supply Chain Audit App
              </Typography>
                <Stack spacing={2} direction="row">
                    <Link href="/" style={{textDecoration: 'none'}}><Button color="primary" variant="contained">Find Products</Button></Link>
                    <Link href="/new" style={{textDecoration: 'none'}}><Button color="primary" variant="contained">Create Product</Button></Link>
                </Stack>
            </Toolbar>
        </AppBar>
    </Box>
  );
}
