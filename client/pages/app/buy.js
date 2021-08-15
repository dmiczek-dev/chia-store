import React, { useContext } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';

export default function BuyPlots () {
    const { setTitle } = useContext(TitleContext);
    setTitle('Kup ploty');

    return (
        <>
            Wybór firma czy osoba prywatna<br/>
            Wybór rodzaju zamówienia<br/>
            Formularz
        </>
    );

}
