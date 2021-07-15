import React, { useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import getStepContent from './OrderFormContent';
import useSWR from 'swr';

const StepWrapper = styled.div``;

const OrderFormWrapper = styled.div``;

const SingleStep = styled.div``;

const StyledButton = styled(Button)`
  margin-top: 8px;
  margin-right: 8px;
  //margin-top: .8rem;
  //margin-right: .8rem;
`;

const ActionContainer = styled.div`
  margin-bottom: 16px;
  //margin-bottom: {(theme)= > theme . spacing(2)};

`;

const OrderForm = () => {
    const methods = useForm();

    const onSubmit = data => console.log(data);

    const buyerTypes = {
        company: 'firmy',
        individual: 'osoby prywatnej',
        default: '',
    };

    const [buyerType, setBuyerType] = useState('default');
    const [activeStep, setActiveStep] = useState(0);

    const steps = [`Kupuję dla ${buyerTypes[buyerType]}`, 'Rozdzaj zlecenia', 'Dane do zamówienia'];

    // const steps = {
    //     0: {
    //         name: `Kupuję dla ${buyerTypes[buyerType]}`,
    //         fields: [
    //             {
    //             type: 'radio',
    //             required: true,
    //             }]
    //     }
    // }
    //
    //
    // const stepsValidation = (index) => {
    //     const fields = steps[index].fields
    //     fields.forEach(field => {
    //         if(field.required) {
    //
    //         }
    //     })
    // }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <OrderFormWrapper>
            <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <StepWrapper>{getStepContent(index)}</StepWrapper>
                                <ActionContainer>
                                    <SingleStep>
                                        <StyledButton disabled={activeStep === 0} onClick={handleBack}>Back</StyledButton>
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleNext(index)}
                                            type={activeStep === steps.length ? 'submit' : 'button'}
                                        >
                                            {activeStep === steps.length - 1 ? 'Wyślij' : 'Next'}
                                        </StyledButton>
                                    </SingleStep>
                                </ActionContainer>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </form>
            </FormProvider>
            {activeStep === steps.length && (
                <Paper square elevation={0}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                </Paper>
            )}
        </OrderFormWrapper>
    );
};

export default OrderForm;
