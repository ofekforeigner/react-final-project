const initialValue = {
    products: [
        { id: 1, name: 'Sigur Rós - Takk...', price: 20, qty: 10 },
        { id: 2, name: 'Big Thief - Dragon New Warm Mountain I Believe in You', price: 17, qty: 15 }
    ],
    customers: [
        { id: 1, firstName: 'Ofek', lastName: 'Fi', city: 'Ramat-Yishai' },
        { id: 2, firstName: 'Johnny', lastName: 'Foreigner', city: 'Birmingham' }
    ],
    purchases: [
        { id: 1, customerId: 1, productId: 1, date: '20/03/2023' },
        { id: 2, customerId: 2, productId: 1, date: '24/03/2023' },
        { id: 3, customerId: 2, productId: 2, date: '21/03/2023' }
    ]
};


const appReducer = (state = initialValue, action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO_USER":
            return { ...state, purchases: [...state.purchases, action.payload], }


        case "UPDATE_PRODUCT":
            let productsArr = [...state.products];
            let index = productsArr.findIndex(x => x.id === action.payload.id);
            if (index >= 0) {
                productsArr[index] = action.payload
            }

            return { ...state, products: productsArr }


        case "DELETE_PRODUCT":
            let productsArr2 = [...state.products];
            let indexInProducts = productsArr2.findIndex(x => x.id === action.payload);
            if (indexInProducts >= 0) {
                productsArr2.splice(indexInProducts, 1)
            }


            let purchasesArr = [...state.purchases];
            for (let i = 0; i < purchasesArr.length; i++) {
                if (purchasesArr[i].productId === action.payload) {
                    purchasesArr.splice(i, 1)
                    i--;
                }
            }

            return { ...state, products: productsArr2, purchases: purchasesArr }


        case "UPDATE_CUSTOMER":
            let customersArr = [...state.customers];
            let index3 = customersArr.findIndex(x => x.id === action.payload.id);
            if (index3 >= 0) {
                customersArr[index3] = action.payload
            }

            return { ...state, customers: customersArr }


        case "DELETE_CUSTOMER":
            let purchasesArr2 = [...state.purchases];
            for (let i = 0; i < purchasesArr2.length; i++) {
                if (purchasesArr2[i].customerId === action.payload) {
                    purchasesArr2.splice(i, 1)
                    i--;
                }
            }


            let customersArr2 = [...state.customers];
            let index4 = customersArr2.findIndex(x => x.id === action.payload);
            if (index4 >= 0) {
                customersArr2.splice(index4, 1)
            }

            return { ...state, customers: customersArr2, purchases: purchasesArr2 }



        default:
            return state
    };
}

export default appReducer;
