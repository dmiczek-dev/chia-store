import { ConnectForm } from './connectForm';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { schemaCompany, schemaOrder } from './orderSchema';

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 30px;
`;

const AdditionalInputs = () =>
    (
        <ConnectForm>
            {({ control, getValues, formState: { errors } }) => {
                const buyerType = getValues('buyerType');

                return (
                    <InputsWrapper>
                        {
                            schemaOrder.map(({ title, name, type }) => (
                                <Controller
                                    key={name}
                                    name={name}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField error={!!errors[name]} type={type} label={title} name={name} {...field}/>
                                    )}
                                />
                            ))
                        }
                        {
                            (buyerType === 'company') && schemaCompany.map(({ title, name, type }) => {
                                return (
                                    <Controller
                                        key={name}
                                        name={name}
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField error={!!errors[name]} type={type} label={title} name={name} {...field}/>
                                        )}
                                    />
                                );
                            })
                        }
                    </InputsWrapper>
                );
            }}
        </ConnectForm>
    );

export default AdditionalInputs;

