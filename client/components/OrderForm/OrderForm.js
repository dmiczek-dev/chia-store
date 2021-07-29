import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, FormProvider } from 'react-hook-form';
import { stepsContent } from './OrderFormContent';
import { validationSchema } from '../../utils/orderValidation';
import { ActionContainer, OrderFormWrapper, SingleStep, StepWrapper, StyledAlert, StyledButton } from './OrderForm.styles';

const OrderForm = () => {

    const methods = useForm({ mode: 'onChange', resolver: joiResolver(validationSchema) });

    let error = false;
    const [err, setErr] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { isValid } = methods.formState;

    //TODO: On submit
    const onSubmit = data => console.log(data);

    //TODO: Replace const and state with single state ==========//
    const handleNext = async (index) => {
        stepsContent[index]?.required.forEach(field => {
            if (!methods.getValues(field)) {
                error = true;
            }
        });

        if (!isValid && index === stepsContent.length - 1) {
            await methods.trigger();
            error = true;
        }

        if (error) {
            setErr(true);

        } else {
            error = false;
            setErr(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        error = false;
        setErr(false);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <OrderFormWrapper>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {stepsContent.map(({ title, form }, index) => (
                            <Step key={title}>
                                <StepLabel>{title}</StepLabel>
                                <StepContent>
                                    <StepWrapper>{form}</StepWrapper>
                                    <ActionContainer>
                                        {err && <StyledAlert severity="error">Uzupełnij wymagane informacje</StyledAlert>}
                                        <SingleStep>
                                            <StyledButton disabled={activeStep === 0} onClick={handleBack}>Wróć</StyledButton>
                                            <StyledButton
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleNext(index)}
                                                type={activeStep === stepsContent.length ? 'submit' : 'button'}
                                            >
                                                {activeStep === stepsContent.length - 1 ? 'Wyślij' : 'Dalej'}
                                            </StyledButton>
                                        </SingleStep>
                                    </ActionContainer>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </form>
            </FormProvider>
            {activeStep === stepsContent.length && (
                <Paper square elevation={0}>
                    <Typography>Dziękujemu, Twoje zamówienie zostało złożone</Typography>
                </Paper>
            )}
        </OrderFormWrapper>
    );
};

export default OrderForm;
