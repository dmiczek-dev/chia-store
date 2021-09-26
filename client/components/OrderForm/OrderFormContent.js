import React  from 'react';
import { Controller } from 'react-hook-form';
import StepperCard from '../StepperCard/StepperCard';
import BusinessIcon from '@material-ui/icons/Business';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';
import { ConnectForm } from '../../utils/ConnectForm';
import ProductSelect from '../ProductSelect/ProductSelect';
import AdditionalInputs from '../../components/OrderForm/AdditionalInputs';

const SelectPurchaseForm = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
`;

export const stepsContent = [
    {
        name: 'first',
        required: ['buyerType'],
        title: 'Kupuję dla:',
        form: (
            <ConnectForm>
                {({ control, getValues, unregister }) => {
                    return (<Controller
                            name="buyerType"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <SelectPurchaseForm>
                                    <StepperCard Icon={BusinessIcon} title="Firma" value="company"
                                                 name="buyerType" onChange={e => { onChange(e);}} getValues={getValues}/>
                                    <StepperCard Icon={FaceIcon} title="Osob prywatna" value="individual" name="buyerType"
                                                 onChange={e => {
                                                     //todo: test unregister company fields
                                                     unregister('NIP')
                                                     unregister('company')
                                                     onChange(e);}} getValues={getValues}/>
                                </SelectPurchaseForm>
                            )}
                        />
                    );
                }}
            </ConnectForm>
        ),
    },
    {
        name: 'product',
        title: `Produkt`,
        required: ['productId'],
        form: (<ProductSelect/>),
    },
    {
        name: 'orderDetails',
        title: `Szeczególy zamówinia`,
        required: [],
        form: (<AdditionalInputs/>),
    },
];
