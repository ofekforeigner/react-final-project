import React, { useState } from 'react'
import { useSelector } from 'react-redux';


import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Divider } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchPurchasedComp from './SearchPurchased';


const PurchasedComp = () => {
    const [product, setProduct] = useState('')
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');

    const [productForSearch, setProductForSearch] = useState('')
    const [customerForSearch, setCustomerForSearch] = useState('');
    const [dateForSearch, setDateForSearch] = useState('');


    const [showSearched, setShowSearched] = useState(false);



    const storeData = useSelector(state => state)

    const handleProductChange = (event) => {
        setProduct(event.target.value);
    };

    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    };


    const handleSearch = () => {
        setProductForSearch(product)
        setCustomerForSearch(customer)
        setDateForSearch(date)
        setShowSearched(true);
    }

    const handleDateChange = (newValue) => {
        newValue = new Date(newValue)
        let datefs = newValue.toLocaleDateString()
        setDate(datefs);
    };

    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <h1 >Purchased</h1><br />
            <div>
                <Box sx={{ maxWidth: 600 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Products</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={product ? product : ''}
                            label="Product"
                            onChange={handleProductChange}
                        >
                            <MenuItem value=''>All Products</MenuItem>
                            {
                                storeData.products.map(prod => {
                                    return (
                                        <MenuItem key={prod.id} value={prod.id}>{prod.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div> <br /> <br />

            <div>
                <Box sx={{ maxWidth: 600 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Customers</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={customer ? customer : ''}
                            label="Customers"
                            onChange={handleCustomerChange}
                        >
                            <MenuItem value=''>All Customers</MenuItem>
                            {
                                storeData.customers.map(customer => {
                                    return (
                                        <MenuItem key={customer.id} value={customer.id} onChange={() => setShowSearched(false)}>{`${customer.firstName} ${customer.lastName}`}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box><br /><br />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker onChange={handleDateChange} />
                </LocalizationProvider><br /><br />
                <Button variant="contained" size="small" style={{ backgroundColor: '#a11a1a' }} onClick={handleSearch}>Search</Button><br /><br />
            </div>
            <Divider variant="middle" /><br />
            {
                showSearched && <SearchPurchasedComp product={productForSearch} customer={customerForSearch} date={dateForSearch} />

            }

        </div>
    )
}

export default PurchasedComp