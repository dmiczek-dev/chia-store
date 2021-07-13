import React, { useState } from 'react';
import {} from './StepperCard.styles';
import { Button } from '@material-ui/core';

import styles, { css } from 'styled-components';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const StepperCardWrapper = styled.div`
  margin-top: 50px;
  padding: 70px 40px 40px;
  background: rgba(40, 167, 69, 0.25);
  border-radius: 10px;
  position: relative;
  min-width: 280px;

  opacity: 0.8;
  filter: grayscale(.8);

  &:hover {
    cursor: pointer;
  }

  ${props => props.isSelected && css`
    opacity: 1;
    filter: none;
    `};
`;


const CardIconWrapper = styled(Icon)`
  position: absolute;
  top: 0;
  left: 50%;
  margin: 0 auto;
  width: 100px;
  height: auto;
  background-color: rgba(28, 116, 48, 1);
  padding: 15px;
  border-radius: 80px;
  display: block;
  transform: translate(-50%, -50%);
  

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: white;
    display: block;
  }
`;

const CardIconTitle = styled.h2`
  text-transform: uppercase;
  color: #2D3142;
  font-weight: 400;
  font-size: 22px;
  text-align: center;
`;

const StyledInput = styled.input`
    display: none;
`

const StepperCard = ( {Icon, title, onChange, value, name,setSelectedValue, selectedValue, price}) => {
    const handleChange = () => {
        setSelectedValue(value);
        onChange(value)
    }

    return (
        <StepperCardWrapper onClick={handleChange} isSelected={selectedValue === value}>
            <CardIconWrapper color="primary">
                <Icon/>
            </CardIconWrapper>
            <CardIconTitle>
                {title}
            </CardIconTitle>
            {price ? <p>{price} PLN</p> : null}
            <StyledInput type="radio" value={value} name={name} />
        </StepperCardWrapper>
    );
};

export default StepperCard;
