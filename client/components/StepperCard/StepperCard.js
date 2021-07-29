import React  from 'react';
import { CardIconTitle, CardIconWrapper, StepperCardWrapper, StyledInput } from './StepperCard.styles';

const StepperCard = ( {Icon, title, onChange, value, name, price, getValues}) => {
    const handleChange = () => {
        onChange(value)
    }
    return (
        <StepperCardWrapper as="label" htmlFor={title} onClick={handleChange} isSelected={getValues(name) === value}>
            <CardIconWrapper color="primary">
                <Icon/>
            </CardIconWrapper>
            <CardIconTitle>
                {title}
            </CardIconTitle>
            {price ? <p>{price} PLN</p> : null}
            <StyledInput id={title} type="radio" value={value} name={name} />
        </StepperCardWrapper>
    );
};

export default StepperCard;
