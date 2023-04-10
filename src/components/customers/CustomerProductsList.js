import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import BuyProductComp from '../products/BuyProduct';
import { getCustomersDataProductsAndPurchaseDates } from '../../utils';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const CustomerProductsListComp = () => {
    const [customerProducts, setCustomerProducts] = useState([])


    const params = useParams();
    const storeData = useSelector(state => state)


    useEffect(() => {
        const data = getCustomersDataProductsAndPurchaseDates(storeData.customers, storeData.products, storeData.purchases).filter(d => +d.customerId === +params.id)
        setCustomerProducts(data)

    }, [params.id, storeData])


    return (
        <div style={{ height: '339.162px', overflow: 'auto' }}>
            <div style={{ textAlign: 'center' }}>
                <strong>Purchased Products</strong>
            </div>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Purchased Dates</TableCell>
                            <TableCell align="right">{' '}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerProducts?.map((customer, index) => (
                            customer?.products.map((product) => (
                                <TableRow
                                    key={index++}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">
                                        <Link to={`/edit_product/${product.product.id}`}>{product.product.name}</Link>
                                    </TableCell>

                                    <TableCell align="right">
                                        {product.purchaseDate}
                                    </TableCell>

                                    <TableCell align="right">
                                        <BuyProductComp customerId={customer.customerId} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CustomerProductsListComp