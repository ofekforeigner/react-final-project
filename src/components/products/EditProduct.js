import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCustomersListComp from './ProductCustomersList';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { getProductById } from '../../utils';
import AlertComp from '../../Alert';


const EditProductComp = () => {
  const [product, setProduct] = useState({ name: '', price: '', qty: '' })
  const [alert, setAlert] = useState({ status: 'success', msg: '', isOpen: false });

  const navigate = useNavigate();

  const params = useParams();

  const storeData = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const prod = storeData.products.find(p => p.id === +params.id);
    setProduct(prod);
  }, [params.id, storeData.products])



  const handleUpdateProduct = () => {
    let productObj = getProductById(product.id, storeData.products);

    if (product.qty > 0) {
      productObj.qty -= 1;

      let obj = {
        ...productObj, name: product.name, price: product.price, qty: product.qty
      }

      dispatch({ type: "UPDATE_PRODUCT", payload: obj });
      setAlert({ status: 'success', msg: 'Product succesfully updated!', isOpen: true })
    } else {
      setAlert({ status: 'error', msg: 'Quantity must be greater than 0', isOpen: true })
    }

  }



  const handleDeleteProduct = () => {
    dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    setProduct({ name: '', price: '', qty: '' })
    setAlert({ status: 'success', msg: 'Product succesfully deleted!', isOpen: true })

    setTimeout(() => {
      navigate('/products');
    }, 2000);
  }

  return (
    <div style={{ textAlign: '-webkit-center' }}>
      <h1 style={{ textAlign: 'center' }}>Edit Product</h1> <br />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" value={product?.name ? product.name : ''} onChange={e => setProduct({ ...product, name: e.target.value })} /><br />
        <TextField id="outlined-basic" type="number" InputProps={{
          inputProps: { min: 0, step: 0.1 }
        }} label="Price" variant="outlined" value={product?.price ? product.price : ''} onChange={e => setProduct({ ...product, price: e.target.value })} /><br />
        <TextField id="outlined-basic" type="number" InputProps={{
          inputProps: { min: 0 }
        }} label="Quantity" variant="outlined" value={product?.qty ? product.qty : ''} onChange={e => setProduct({ ...product, qty: e.target.value })} /><br />
        <Button variant="contained" style={{ width: '13ch', backgroundColor: '#a11a1a' }} onClick={handleUpdateProduct}>Update</Button>
        <Button variant="contained" style={{ width: '13ch', backgroundColor: '#a11a1a' }} onClick={handleDeleteProduct}>Delete</Button>
      </Box><br />
      <Divider variant="middle" /><br />
      <div style={{ width: '70%' }}>
        <ProductCustomersListComp />
      </div>

      <AlertComp alertObj={alert} />
    </div>
  )






}

export default EditProductComp