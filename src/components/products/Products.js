import React from 'react'
import { useSelector } from 'react-redux';
import ProductComp from './Product';
import { category } from "../../imgData";


import TotalPurchasedAmountComp from './TotalPurchasedAmount';
import { Outlet } from 'react-router-dom';
import { Divider } from '@mui/material';




const ProductsComp = () => {
    const storeData = useSelector(state => state)

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Products</h1><br />
            <div style={{ marginLeft: '5px' }}>
                <TotalPurchasedAmountComp /><br />
                <Divider variant="middle" /><br />
                <div style={{ marginRight: '5px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {storeData.products.map(prod => {
                            return (
                                <ProductComp key={prod.id} data={prod} img={category[prod.id - 1]} />
                            )
                        })}
                    </div>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default ProductsComp