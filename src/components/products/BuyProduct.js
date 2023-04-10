import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../utils';


import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Modal } from '@mui/material';
import AlertComp from '../../Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BuyProductComp = (props) => {
  const [product, setProduct] = useState('')
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ status: 'success', msg: '', isOpen: false });


  const storeData = useSelector(state => state)
  const dispatch = useDispatch()


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setProduct('')
  };

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  const handleBuyProduct = () => {
    let productObj = getProductById(product.id, storeData.products);

    if (productObj.qty > 0) {
      productObj.qty -= 1;

      let id = 0;
      if (storeData.purchases.length > 0) {
        id = storeData.purchases[storeData.purchases.length - 1].id;
        id = +id + 1;
      }

      const purchaseObj = {
        id,
        customerId: props.customerId,
        productId: product.id,
        date: new Date().toLocaleString().split(',')[0]
      }

      dispatch({ type: "UPDATE_PRODUCT", payload: productObj });
      dispatch({ type: "ADD_PRODUCT_TO_USER", payload: purchaseObj });
      setAlert({ status: 'success', msg: 'Product succesfully added!', isOpen: true })
    } else {
      setAlert({ status: 'error', msg: 'Product is out of stock!', isOpen: true })
    }
    setOpen(false)
    setProduct('')
  }


  return (
    <div>
      <Button style={{ backgroundColor: '#a11a1a', color: 'white' }} onClick={handleOpen}>Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Products</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product ? product : ''}
              label="Product"
              onChange={handleChange}
            >
              {
                storeData.products.map(prod => {
                  return (
                    <MenuItem key={prod.id} value={prod} >{prod.name}</MenuItem>
                  )
                })
              }
            </Select>
            {
              product.name && <Button variant="contained" size="small" style={{ backgroundColor: '#a11a1a' }} onClick={handleBuyProduct}>Save</Button>
            }
          </FormControl>
        </Box>
      </Modal>

      <AlertComp alertObj={alert} />
    </div>


  );
}

export default BuyProductComp