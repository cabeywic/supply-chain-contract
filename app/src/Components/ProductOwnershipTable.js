import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { convertUnixTStoStr } from '../config/helper'


function ProductOwnershipTable(props){
    const { rows } = props;
    
    return (
    <Paper>
        <CardContent>
            <Typography variant="h5" component="div" sx={{color: "text.primary"}}>
                Ownership History
            </Typography>
            <TableContainer >
                <Table aria-label="Ownership table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Updated At</TableCell>
                        <TableCell align="right">Owner</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.updatedAt}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.owner}
                        </TableCell>
                        <TableCell align="right">{convertUnixTStoStr(row.updatedAt)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Paper>)
}

export default ProductOwnershipTable;