import React, { useContext, useEffect } from 'react';
import OrderForm from '../../components/OrderForm/OrderForm';
import { TitleContext } from '../../layout/Dashboard/Dashboard';

const Orders = () => {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('Zamówienia');
    }, []);

    return (
        <OrderForm/>
    );
};

export default Orders;
