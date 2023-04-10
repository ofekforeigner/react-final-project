import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCustomerById, getProductById } from '../../utils';


const SearchPurchasedComp = ({ product, customer, date }) => {
    const [results, setResults] = useState([])


    const storeData = useSelector(state => state)


    useEffect(() => {
        let filter = [];

        if (product && customer && date && date !== '01/01/1970') {
            filter = storeData.purchases.filter(pur => +pur.productId === +product && +pur.customerId === +customer && pur.date === date)

        } else if (product && customer && (!date || date === '01/01/1970')) {
            filter = storeData.purchases.filter(pur => +pur.productId === +product && +pur.customerId === +customer)

        } else if (product && !customer && date && date !== '01/01/1970') {
            filter = storeData.purchases.filter(pur => +pur.productId === +product && pur.date === date)

        } else if (product && !customer && (!date || date === '01/01/1970')) {
            filter = storeData.purchases.filter(pur => +pur.productId === +product)

        } else if (!product && customer && date && date !== '01/01/1970') {
            filter = storeData.purchases.filter(pur => +pur.customerId === +customer && pur.date === date)

        } else if (!product && customer && (!date || date === '01/01/1970')) {
            filter = storeData.purchases.filter(pur => +pur.customerId === +customer)

        } else if (!product && !customer && date && date !== '01/01/1970') {
            filter = storeData.purchases.filter(pur => pur.date === date)

        } else if (!product && !customer && (!date || date === '01/01/1970')) {
            filter = storeData.purchases.map(pur => pur)

        }


        let resultsData = [];

        filter.forEach(ci => {
            let customerName = getCustomerById(ci.customerId, storeData.customers);
            let productName = getProductById(ci.productId, storeData.products);

            let obj = {
                customerName: customerName.firstName + ' ' + customerName.lastName,
                productName: productName.name,
                purchaseDate: ci.date
            }

            resultsData.push(obj);
        });

        if (resultsData.length > 0) {
            setResults(resultsData);
        } else {
            setResults([])
        }
    }, [product, customer, storeData.customers, storeData.products, storeData.purchases, date])


    return (
        <div style={{ height: '339.162px', overflow: 'auto', margin: '5px' }}>
            {
                results.length > 0 ?
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Results</h2>
                        </div><br />
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customer Name</TableCell>
                                        <TableCell align="center">Product Name</TableCell>
                                        <TableCell align="right">Purchased Dates</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {results?.map((result, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{result.customerName}</TableCell>
                                            <TableCell component="th" scope="row" align='center'>{result.productName}</TableCell>

                                            <TableCell align="right">
                                                {result.purchaseDate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <h2>No Results</h2>
                    </div>
            }
        </div>
    )
}

export default SearchPurchasedComp