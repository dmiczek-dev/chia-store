import React, { useContext, useEffect } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';

export default function Settings () {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('Ustawienia');
    }, []);


    return (
        <h2>
            Formularz do zmiany hasła oraz email
        </h2>
    );
}
