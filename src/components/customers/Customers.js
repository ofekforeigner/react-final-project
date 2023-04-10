import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCustomersDataProductsAndPurchaseDates } from '../../utils'
import BuyProductComp from '../products/BuyProduct';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const CustomersComp = () => {
    const [customers, setCustomers] = useState([]);

    const storeData = useSelector(state => state)

    useEffect(() => {
        const data = getCustomersDataProductsAndPurchaseDates(storeData.customers, storeData.products, storeData.purchases)
        setCustomers(data)
    }, [storeData])


    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <div style={{ textAlign: '-webkit-center' }}>
                <h1>Customers</h1>
                <TableContainer component={Paper} style={{ width: '70%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell ><strong>List of Products</strong></TableCell>
                                <TableCell ><strong>Purchased Dates</strong></TableCell>
                                <TableCell >{' '}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers?.map((customer, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link to={`/edit_customer/${customer.customerId}`}> {customer.customerName} </Link>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            customer.products.map((product, index) => {
                                                return (
                                                    <li key={index}><Link to={`/edit_product/${product.product.id}`} >{product.product.name}</Link></li>
                                                )
                                            })
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            customer.products.map((product, index) => {
                                                return (
                                                    <li key={index++}>{product.purchaseDate}</li>
                                                )
                                            })
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <BuyProductComp customerId={customer.customerId} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> <br />
        </div>
    )
}

export default CustomersComp