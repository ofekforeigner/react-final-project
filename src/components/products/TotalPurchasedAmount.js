import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TotalPurchasedAmountComp = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountData, setTotalAmountData] = useState([]);

    const storeData = useSelector(state => state)


    useEffect(() => {
        let tAmount = 0;
        let tData = [];
        storeData.products.forEach(prod => {
            let prodData = storeData.purchases.filter(pur => +pur.productId === +prod.id)
            let obj = {
                len: prodData.length,
                name: prod.name
            }
            tData = [...tData, obj];
            tAmount += obj.len;
        })

        setTotalAmountData(tData)
        setTotalAmount(tAmount);
    }, [storeData.products, storeData.purchases])



    return (
        <div style={{ textAlign: '-webkit-center', marginRight: '5px' }}>
            <strong>Total Amount of Purchased Products: {totalAmount}</strong>
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Total Purchases</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {totalAmountData?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.len}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TotalPurchasedAmountComp