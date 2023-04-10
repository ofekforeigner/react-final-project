import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerProductsListComp from './CustomerProductsList';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import AlertComp from '../../Alert';
import { getCustomerById } from '../../utils';

const EditCustomerComp = () => {
    const [customer, setCustomer] = useState({ firstName: '', lastName: '', city: '' })
    const [alert, setAlert] = useState({ status: 'success', msg: '', isOpen: false });

    const navigate = useNavigate();

    const params = useParams();

    const storeData = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const cust = storeData.customers.find(c => c.id === +params.id);
        setCustomer(cust);
    }, [params.id, storeData.customers])


    const handleUpdateCustomer = () => {
        let customerObj = getCustomerById(customer.id, storeData.customers);

        let obj = {
            ...customerObj, firstName: customer.firstName, lastName: customer.lastName, city: customer.city
        }

        dispatch({ type: "UPDATE_CUSTOMER", payload: obj });
        setAlert({ status: 'success', msg: 'Customer succesfully updated!', isOpen: true })
    }


    const handleDeleteCustomer = () => {
        dispatch({ type: "DELETE_CUSTOMER", payload: customer.id });
        setCustomer({ firstName: '', lastName: '', city: '' })
        setAlert({ status: 'success', msg: 'Customer succesfully deleted!', isOpen: true })

        setTimeout(() => {
            navigate('/customers');
        }, 2000);
    }



    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <h1 style={{ textAlign: 'center' }}>Edit Customer</h1> <br />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={customer?.firstName ? customer.firstName : ''} onChange={e => setCustomer({ ...customer, firstName: e.target.value })} /><br />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={customer?.lastName ? customer.lastName : ''} onChange={e => setCustomer({ ...customer, lastName: e.target.value })} /><br />
                <TextField id="outlined-basic" label="City" variant="outlined" value={customer?.city ? customer.city : ''} onChange={e => setCustomer({ ...customer, city: e.target.value })} /><br />

                <Button variant="contained" style={{ width: '13ch', backgroundColor: '#a11a1a' }} onClick={handleUpdateCustomer}>Update</Button>
                <Button variant="contained" style={{ width: '13ch', backgroundColor: '#a11a1a' }} onClick={handleDeleteCustomer}>Delete</Button>
            </Box><br />
            <Divider variant="middle" /><br />
            <div style={{ width: '70%' }}>
                <CustomerProductsListComp />
            </div>

            <AlertComp alertObj={alert} />
        </div>
    )






}

export default EditCustomerComp