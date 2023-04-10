import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BuyProductComp from './BuyProduct';


const ProductCustomersListComp = () => {
    const [productName, setProductName] = useState('')
    const [customers, setCustomers] = useState([])


    const params = useParams();
    const storeData = useSelector(state => state)


    useEffect(() => {
        let customersData = [];

        storeData.purchases.filter(pur => +pur.productId === +params.id).forEach(ci => {
            let obj = {
                customerId: ci.customerId,
                customerName: '',
                purchaseDate: ci.date
            }
            storeData.customers.forEach(customer => {
                if (+customer.id === +ci.customerId) {
                    obj = { ...obj, customerName: customer.firstName + ' ' + customer.lastName }
                }
            })

            customersData.push(obj);
        });

        setCustomers(customersData);

        const getProductName = storeData.products.find(product => +product.id === +params.id);
        setProductName(getProductName?.name);


    }, [params.id, storeData.customers, storeData.products, storeData.purchases])



    return (
        <div style={{ height: '339.162px', overflow: 'auto' }}>
            <div style={{ textAlign: 'center' }}>
                <strong>Customers Who Bought</strong>
                <p>{productName ? productName : ''}</p>
            </div>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Purchased Dates</TableCell>
                            <TableCell align="right">{' '}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers?.map((customer, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/edit_customer/${customer.customerId}`}>{customer.customerName}</Link>
                                </TableCell>

                                <TableCell align='center'>
                                    {customer.purchaseDate}
                                </TableCell>

                                <TableCell align="right">
                                    <BuyProductComp customerId={customer.customerId} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductCustomersListComp