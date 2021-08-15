import React from 'react';
import OrderForm from '../../components/OrderForm/OrderForm';

const Orders = ({setPageTitle}) => {
    setPageTitle("Zamówienia")
    return (
        <OrderForm/>
    );
};

export default Orders;
