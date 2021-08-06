import StepperCard from '../StepperCard/StepperCard';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { ConnectForm } from '../../utils/ConnectForm';
import { Controller } from 'react-hook-form';
import { getAccessToken } from '../../utils/accessToken';

const SelectPurchaseForm = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
`;

const ProductSelect = () => {
    const { data, error } = useSWR([process.env.NEXT_PUBLIC_URL + 'products', getAccessToken()]);

    return (

        <ConnectForm>
            {({ control, setValue, getValues }) => {
                return (<Controller
                        name="productId"
                        control={control}
                        render={({ field: { onChange } }) => (

                            <SelectPurchaseForm>
                                {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                                {data && data?.map(product => (
                                    <StepperCard key={product.product_id} Icon={SaveIcon} title={product.name} value={product.product_id}
                                                 onChange={e => { onChange(e);}} getValues={getValues} name="productId"
                                                 isActive={product.active}
                                                 price={product.price}/>

                                ))}
                            </SelectPurchaseForm>
                        )}
                    />

                );
            }}
        </ConnectForm>
    );
};

export default ProductSelect;
