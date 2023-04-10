import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomersComp from './components/customers/Customers'
import EditCustomerComp from './components/customers/EditCustomer'
import HomepageComp from './components/Homepage'
import ResponsiveAppBar from './components/Menu'
import EditProductComp from './components/products/EditProduct'
import ProductCustomersListComp from './components/products/ProductCustomersList'
import ProductsComp from './components/products/Products'
import PurchasedComp from './components/purchases/Purchased'

const App = () => {
  return (
    <div>
      <ResponsiveAppBar />

      <Routes>
        <Route path='/' element={<HomepageComp />} />

        <Route path='/products' element={<ProductsComp />} >
          <Route path=':id/customers' element={<ProductCustomersListComp />} />
        </Route>
        <Route path='/edit_product/:id' element={<EditProductComp />} />

        <Route path='/customers' element={<CustomersComp />} />
        <Route path='/edit_customer/:id' element={<EditCustomerComp />} />

        <Route path='/purchased' element={<PurchasedComp />} />
      </Routes>
    </div>
  )
}

export default App