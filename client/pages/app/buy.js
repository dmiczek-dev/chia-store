import React, { useContext, useEffect } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';

export default function BuyPlots () {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('Kup ploty');
    }, []);

    return (
        <>
            Wybór firma czy osoba prywatna<br/>
            Wybór rodzaju zamówienia<br/>
            Formularz
        </>
    );

}
