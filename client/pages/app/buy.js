import React, { useContext, useEffect } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';
import OrderForm from '../../components/OrderForm/OrderForm';

export default function BuyPlots () {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('Kup ploty');
    }, []);

    return (
        <OrderForm/>
    );

}
