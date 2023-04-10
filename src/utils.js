
const getCustomerById = (id, customersList) => {
    return customersList.find(customer => +customer.id === +id);
}

const getProductById = (id, productsList) => {
    return productsList.find(product => +product.id === +id);
}

const getPurchaseById = (id, purchasesList) => {
    return purchasesList.find(purchase => +purchase.id === +id);
}



const getCustomersDataProductsAndPurchaseDates = (customersList, productsList, purchasesList) => {
    let customersObj = [];

    for (let i = 0; i < customersList.length; i++) {
        let obj = {
            customerId: '',
            customerName: '',
            products: [],
            purchaseDate: []
        };
        for (let j = 0; j < purchasesList.length; j++) {
            for (let k = 0; k < productsList.length; k++) {
                if (+customersList[i].id === +purchasesList[j].customerId && +purchasesList[j].productId === +productsList[k].id) {
                    obj = {
                        customerId: customersList[i].id,
                        customerName: customersList[i].firstName + ' ' + customersList[i].lastName,
                        products: [...obj.products, { product: productsList[k], purchaseDate: purchasesList[j].date }]
                    }
                } else {
                    obj = {
                        customerId: customersList[i].id,
                        customerName: customersList[i].firstName + ' ' + customersList[i].lastName,
                        products: [...obj.products]
                    }
                }
            }

        }
        customersObj.push(obj);
    }

    return customersObj;
}

export { getCustomerById, getProductById, getPurchaseById, getCustomersDataProductsAndPurchaseDates }