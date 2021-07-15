import { Controller } from 'react-hook-form';
import StepperCard from '../StepperCard/StepperCard';
import BusinessIcon from '@material-ui/icons/Business';
import FaceIcon from '@material-ui/icons/Face';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { getAccessToken } from '../../utils/accessToken';
import { ConnectForm } from '../../utils/connectForm';

const SelectPurchaseForm = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
`;

function getStepContent (step) {

    switch (step) {
        case 0:
            return (
                <ConnectForm>
                    {({control, getValues}) =>
                        <Controller
                            name="buyerType"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <SelectPurchaseForm>
                                    {console.log(getValues("buyerType"))}
                                    <StepperCard Icon={BusinessIcon} title="Firma" value="company" onChange={() => {console.log(getValues("company"))}} name="orderType"
                                                  selectedValue={getValues("company")} />
                                    <StepperCard Icon={FaceIcon} title="Osob prywatna" value="individual" onChange={onChange} name="orderType" />
                                                 {/*// selectedValue={buyerType} setSelectedValue={setBuyerType}/>*/}
                                </SelectPurchaseForm>
                            )}
                        />}
                </ConnectForm>
            );

        case 1:
            // const { data, error } = useSWR(['http://localhost:3001/products', getAccessToken()]);
            return "sa";
            // return (
            //     <Controller
            //         name="product"
            //         control={control}
            //         render={({ field: { onChange } }) => (
            //             <SelectPurchaseForm>
            //                 {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
            //                 {data && data.map(product => (
            //                     <StepperCard key={product.product_id} Icon={SaveIcon} title={product.name} value={product.product_id}
            //                                  onChange={onChange} name="orderType"
            //                                  selectedValue={buyerType} setSelectedValue={setBuyerType} isActive={product.active}
            //                                  price={product.price}/>
            //
            //                 ))}
            //             </SelectPurchaseForm>
            //         )}
            //     />
            // );
        case 2:
            return 'asd';
        default:
            return 'Unknown step';
    }
}

export default getStepContent;
